<template>
  <div>
    <el-form
      label-width="120px"
      style="width: 650px"
      ref="form"
      :rules="rules"
      :model="form"
    >
      <el-form-item label="书店名称" prop="cinema_name">
        <el-input type="text" v-model="form.cinema_name"></el-input>
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
      <el-form-item label="选择标签" prop="tags">
        <el-select multiple v-model="form.tags">
          <el-option
            v-for="item in tags"
            :key="item.id"
            :label="item.tagname"
            :value="item.tagname"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">新增书店</el-button>
        <el-button>重置</el-button>
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
      tags: [],
      //此处不声明 map 对象，可以直接使用 this.map赋值或者采用非响应式的普通对象来存储。
      //map:null,
      form: {
        cinema_name: "",
        address: "",
        province: "",
        city: "",
        district: "",
        longitude: "",
        latitude: "",
        tags: [],
      },
      rules: {
        cinema_name: [
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
        tags: [
          { required: true, message: "该字段不能为空", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.form.tags = this.form.tags.join(" / ");
      // 发送请求，添加书店信息
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // 发送请求，添加书店信息
          httpApi.cinemaApi.add(this.form).then((res) => {
            console.log("新增书店", res);
            if (res.data.code == 200) {
              this.$message.success("恭喜，影院开业大吉！");
              this.$router.push("/home/cinema-list");
            }
          });
        }
      });
    },
    initMap() {
      AMapLoader.load({
        key: "7bc653e04678082d08022d65625bad6e", // 申请好的Web端开发者Key，首次调用 load 时必填
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
    //DOM初始化完成进行地图初始化
    this.initMap();
    httpApi.cinemaApi.queryTypes().then((res) => {
      console.log("加载电影标签列表", res);
      this.tags = res.data.data;
    });
  },
};
</script>

<style lang="scss" scoped>
</style>