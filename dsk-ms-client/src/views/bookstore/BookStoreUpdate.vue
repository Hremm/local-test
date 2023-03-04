<template>
  <div>
    <el-form
      label-width="120px"
      style="width: 650px"
      ref="form"
      :rules="rules"
      :model="form"
    >
      <el-form-item label="书店名称" prop="bookstore_name">
        <el-input type="text" v-model="form.bookstore_name"></el-input>
      </el-form-item>
      <el-form-item label="选择位置">
        <div id="container" style="height: 200px; border: 1px solid #666"></div>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input type="text" v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="省份" prop="province">
        <el-input type="text" v-model="form.province"></el-input>
      </el-form-item>
      <el-form-item label="城市" prop="city">
        <el-input type="text" v-model="form.city"></el-input>
      </el-form-item>
      <el-form-item label="地区" prop="district">
        <el-input type="text" v-model="form.district"></el-input>
      </el-form-item>
      <el-form-item label="经度" prop="longitude">
        <el-input type="text" v-model="form.longitude"></el-input>
      </el-form-item>
      <el-form-item label="纬度" prop="latitude">
        <el-input type="text" v-model="form.latitude"></el-input>
      </el-form-item>
      <el-form-item label="选择类型" prop="types">
        <el-select multiple v-model="form.types">
          <el-option
            v-for="item in types"
            :key="item.id"
            :label="item.typename"
            :value="item.typename"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">新增书店</el-button>
        <el-button @click="cancelExpert('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
import httpApi from "@/http";
export default {
  data() {
    return {
      types: [],
      //此处不声明 map 对象，可以直接使用 this.map赋值或者采用非响应式的普通对象来存储。
      //map:null,
      form: {
        id:this.$route.params.id,
        bookstore_name: "",
        address: "",
        province: "",
        city: "",
        district: "",
        longitude: "",
        latitude: "",
        types: [],
      },
      rules: {
        bookstore_name: [
          { required: true, message: "该字段不能为空", trigger: "blur" },
        ],
        address: [
          { required: true, message: "该字段不能为空", trigger: "blur" },
        ],
        province: [
          { required: true, message: "该字段不能为空", trigger: "blur" },
        ],
        city: [{ required: true, message: "该字段不能为空", trigger: "blur" }],
        district: [
          { required: true, message: "该字段不能为空", trigger: "blur" },
        ],
        longitude: [
          { required: true, message: "该字段不能为空", trigger: "blur" },
        ],
        latitude: [
          { required: true, message: "该字段不能为空", trigger: "blur" },
        ],
        types: [
          { required: true, message: "该字段不能为空", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    //清空表单
    cancelExpert(form){
      this.$refs[form].resetFields();
    },
    //提交
    submit() {
      this.form.types = this.form.types.join(" / ");
      // 发送请求，修改书店信息
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // 发送请求，修改书店信息
          httpApi.bookstoreApi.update(this.form).then((res) => {
            console.log("修改书店", res);
            if (res.data.code == 200) {
              this.$message.success("修改成功!");
              this.$router.push("/home/bookstore-list");
            }
          });
        }
      });
    },
    initMap() {
      AMapLoader.load({
        key: "7bc653e04678082d08022d65625bad6e", // Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Geocoder"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        this.map = new AMap.Map("container", {
          //设置地图容器id
          viewMode: "3D", //是否为3D地图模式
          zoom: 12, //初始化地图级别
          center: [113.659404, 34.772296], //初始化地图中心点位置
        });
        this.map.on("click", (e) => {
          let lng = e.lnglat.getLng();
          let lat = e.lnglat.getLat();
          console.log(`经纬度:[${lng},${lat}]`);
          //调用高德地图的web服务接口,查询当前经纬度坐标
          let geocoder = new AMap.Geocoder();
          geocoder.getAddress([lng, lat], (status, result) => {
            console.log(status, result);
            let info = result.regeocode.addressComponent;
            this.form.address = result.regeocode.formattedAddress;

            this.form.city = info.city;
            this.form.province = info.province;
            this.form.district = info.district;
            this.form.latitude = lat;
            this.form.longitude = lng;
          });
        });
      });
    },
  },
  mounted() {
    console.log(this.form.id);
    //获取列表页传过来的参数:书店id,通过id才可以获取详细数据
    httpApi.bookstoreApi.queryByid({ id: this.form.id }).then((res) => {
      console.log("通过id查询的书店详情是", res);
      this.form = res.data.data;
      this.form.types = this.form.types.split("／");
    });
    //DOM初始化完成进行地图初始化
    this.initMap();
    httpApi.bookstoreApi.queryTypes().then((res) => {
      console.log("加载书店类型列表", res);
      this.types = res.data.data;
    });
  },
};
</script>

<style lang="scss" scoped>
</style>