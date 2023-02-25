<template>
  <div>
    为
    <span style="color: #3f9dff; font-weight: bold">{{
      roomInfo.cinema_name
    }}</span>
    的
    <span style="color: #3f9dff; font-weight: bold"
      >{{ roomInfo.cinema_room_name }}({{ roomInfo.cinema_room_type }})</span
    >
    新增排片计划
    <el-divider content-position="left"></el-divider>
    <el-form label-width="130px" :model="form" ref="form">
      <el-form-item label="电影名称" prop="movie_id">
        <el-select
          ref="selector"
          style="width: 100%"
          v-model="form.movie_id"
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="remoteMethod"
          :loading="loading"
        >
          <el-option
            v-for="item in movies"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="放映时间" prop="showingon_date">
        <el-col :span="11">
          <el-date-picker
            v-model="form.showingon_date"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-select
            v-model="form.showingon_time"
            :picker-options="{
              start: '06:00',
              step: '00:15',
              end: '23:59',
            }"
            placeholder="选择时间"
            style="width: 100%"
          ></el-time-select>
        </el-col>
      </el-form-item>
      <el-form-item label="票价" prop="price">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="立即发布" prop="status">
        <el-switch
          v-model="form.status"
          active-value="1"
          inactive-value="0"
        ></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">确认新增</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import httpApi from "@/http";
export default {
  data() {
    return {
      roomInfo: {}, //保存放映厅的基本信息
      form: {
        cinema_id: "",
        cinema_room_id: "",
        movie_id: "",
        showingon_date: "",
        showingon_time: "",
        status: "1",
        price: "",
      },
      loading: false, //用于说明当前select是否正在异步加载数据
      movies: [],
    };
  },
  methods: {
    //提交排片计划
    submit() {
      this.form.cinema_id = this.roomInfo.cinema_id;
      this.form.cinema_room_id = this.$route.params.roomId;
      console.log(this.form);
      httpApi.showingonPlanApi.add(this.form).then((res) => {
        console.log("添加结果如下", res);
        console.log("下拉列表对象", this.$refs["selector"]);
        if (res.data.code == 200) {
          // 成功
          this.$message.success("恭喜，添加成功");

          this.$notify({
            dangerouslyUseHTMLString: true,
            title: "添加成功",
            message: `<p>影院名称:<b>${this.roomInfo.cinema_name}</b><p>
            <p>放映厅：<b>${this.roomInfo.cinema_room_name}（${this.roomInfo.cinema_room_type}）</b></p>
            <p>电影名称：<b>《${this.$refs["selector"]._data.selectedLabel}》</b></p>
            <p>上映时间：<b>${this.form.showingon_date} ${this.form.showingon_time}</b></p>
            <p>票价：<b>${this.form.price}元</b></p>`,
            type: "success",
          });
          this.$refs["form"].resetFields();
          this.form.showingon_time = "";
        } else {
          // 失败
          this.$message.error("添加失败，稍后重试");
        }
        // 重置表单
      });
    },
    //异步模糊查询电影信息,更新select选择器
    remoteMethod(query) {
      let params = { name: query, page: 1, pagesize: 100 };
      httpApi.movieAPI.queryByNameLike(params).then((res) => {
        console.log("找到的电影", res);
        this.movies = res.data.data.result;
      });
    },
    //初始化放映厅的数据
    initRoomData() {
      let id = this.$route.params.roomId;
      httpApi.cinemaRoomApi.queryById({ id }).then((res) => {
        console.log("加载当前放映厅的数据", res);
        this.roomInfo = res.data.data;
      });
    },
  },
  mounted() {
    this.initRoomData();
  },
};
</script>

<style lang="scss" scoped>
</style>