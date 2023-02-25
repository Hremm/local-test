<template>
  <div>
    当前是
    <span style="color: #3f9dff; font-weight: bold">{{
      roomInfo.cinema_name
    }}</span>
    的
    <span style="color: #3f9dff; font-weight: bold"
      >{{ roomInfo.cinema_room_name }}({{ roomInfo.cinema_room_type }})</span
    >
    排片计划列表
    <el-divider content-position="left"></el-divider>

    <el-table :data="plans">
      <el-table-column
        label="电影名称"
        align="center"
        prop="title"
      ></el-table-column>
      <el-table-column
        label="放映时间"
        align="center"
        prop="showingon_date"
      ></el-table-column>
      <el-table-column
        label="场次"
        align="center"
        prop="showingon_time"
      ></el-table-column>
      <el-table-column label="票价" align="center">
        <template slot-scope="scope">{{ scope.row.price }}元</template>
      </el-table-column>
      <el-table-column label="是否已发布" align="center">
        <template slot-scope="scope"
          ><el-switch
            @change="changeStatus(scope.row.plan_id, $event)"
            :active-value="1"
            :inactive-value="0"
            v-model="scope.row.status"
          ></el-switch
        ></template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="del(scope.row.plan_id)"
          >
          </el-button> </template
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import httpApi from "@/http";
export default {
  data() {
    return {
      roomInfo: {}, //保存放映厅的基本信息
      plans: [], //保存排片列表的信息
    };
  },
  methods: {
    //删除排片计划
    del(plan_id) {
      console.log("点击了删除", plan_id);
      this.$confirm("此操作将永久删除该排片计划, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          httpApi.showingonPlanApi.delete({ id: plan_id }).then((res) => {
            console.log("删除的结果如下", res);
            if (res.data.code == 200) {
              this.initPlans();
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
    //修改发布状态
    changeStatus(num, event) {
      console.log(num, event);
      if (event == 1) {
        httpApi.showingonPlanApi.publish({ id: num }).then((res) => {
          console.log("该计划已发布", res);
        });
      } else {
        httpApi.showingonPlanApi.noPublish({ id: num }).then((res) => {
          console.log("已取消发布", res);
        });
      }
    },
    //初始化放映厅的数据
    initRoomData() {
      let id = this.$route.params.roomId;
      httpApi.cinemaRoomApi.queryById({ id }).then((res) => {
        console.log("加载当前放映厅的数据", res);
        this.roomInfo = res.data.data;
      });
    },
    //加载放映厅的排片计划列表
    initPlans() {
      //room下划线id是接口需要,没有下划线是自己定义的
      let params = { room_id: this.$route.params.roomId };
      httpApi.showingonPlanApi.queryByRoomId(params).then((res) => {
        console.log("查询到排片计划列表如下", res);
        this.plans = res.data.data;
      });
    },
  },

  mounted() {
    this.initRoomData();
    this.initPlans();
  },
};
</script>

<style lang="scss" scoped>
</style>