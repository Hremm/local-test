<template>
  <div>
    <!-- 地图容器 -->
    <div id="main" style="height: 260px; border: 1px solid #666"></div>
    <el-divider content-position="left">书店列表</el-divider>

    <!-- 表格 -->
    <el-table :data="cinemas">
      <el-table-column
        prop="cinema_name"
        width="150px"
        label="书店名称"
      ></el-table-column>
      <el-table-column prop="address" label="书店地址"></el-table-column>
      <el-table-column width="250px" label="书店位置">
        <template slot-scope="scope">
          {{ scope.row.province }}
          {{ scope.row.city }}
          {{ scope.row.district }}
        </template>
      </el-table-column>
      <el-table-column width="180px" label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="success"
            icon="el-icon-map-location"
            circle
            @click="moveTo(scope.row)"
          ></el-button>
          <el-button
            size="small"
            type="info"
            icon="el-icon-video-camera-solid"
            circle
            @click="$router.push('/home/cinema-room-list/' + scope.row.id)"
          ></el-button>
          <el-button
            size="small"
            type="warning"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            @click="del(scope.row.id)"
            size="small"
            type="danger"
            icon="el-icon-delete"
            circle
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
import httpApi from "@/http/index";

export default {
  data() {
    return {
      cinemas: [],
      AMap: null,
    };
  },
  methods: {
    moveTo(cinema) {
      console.log(cinema);
      let lng = cinema.longitude;
      let lat = cinema.latitude;
      this.map.setZoomAndCenter(15, [lng, lat], false, 700);
    },

    //删除书店
    del(id) {
      console.log("点击了删除", id);
      this.$confirm("此操作将永久删除该书店数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          httpApi.cinemaApi.del({ id: id }).then((res) => {
            console.log("删除成功了,删除的结果如下", res);
            if (res.data.code == 200) {
              this.initData();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 初始化地图
    initMap() {
      AMapLoader.load({
        key: "7bc653e04678082d08022d65625bad6e", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.Geocoder"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        this.AMap = AMap;
        this.map = new AMap.Map("main", {
          //设置地图容器id
          viewMode: "3D", //是否为3D地图模式
          zoom: 12, //初始化地图级别
          center: [113.659404, 34.772296], //初始化地图中心点位置
        });
        // 为地图对象绑定点击事件
        this.map.on("click", (e) => {
          let lng = e.lnglat.getLng();
          let lat = e.lnglat.getLat();
          console.log(`经纬度：[${lng}, ${lat}]`);
          // 调用高德地图的web服务接口，查询当前经纬度的坐标
          let geocoder = new AMap.Geocoder();
          geocoder.getAddress([lng, lat], (status, result) => {
            console.log(status, result);
            // 将数据回填到表单
            let info = result.regeocode.addressComponent;
            this.form.address = result.regeocode.formattedAddress;
            this.form.city = info.city;
            this.form.province = info.province;
            this.form.district = info.district;
            this.form.latitude = lat;
            this.form.longitude = lng;
          });
        });
        this.initData();
      });
    },
    /** 初始化数据 */
    initData() {
      httpApi.cinemaApi.queryAll().then((res) => {
        console.log("加载书店列表", res);
        this.cinemas = res.data.data;
        //此处可以为每一家书店都添加一个点标记到地图上
        this.cinemas.forEach((item) => {
          let lng = item.longitude;
          let lat = item.latitude;
          // 创建一个 Marker 实例：

          var marker = new AMap.Marker({
            position: new AMap.LngLat(lng, lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: item.cinema_name,
          });

          // 将创建的点标记添加到已有的地图实例：
          this.map.add(marker);
        });
      });
    },
  },

  mounted() {
    this.initMap();
  },
};
</script>

<style lang="scss" scoped>
</style>