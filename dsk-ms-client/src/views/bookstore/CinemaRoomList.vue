<template>
  <div>
    <el-button @click="dialogFormVisible = true" plain type="primary"
      >新增放映厅</el-button
    >
    <el-divider content-position="left">放映厅列表</el-divider>

    <!-- 放映厅列表数据 -->
    <el-table :data="rooms">
      <el-table-column
        label="放映厅名称"
        align="center"
        prop="room_name"
      ></el-table-column>
      <el-table-column
        label="放映厅类型"
        align="center"
        prop="room_type"
      ></el-table-column>
      <el-table-column label="放映厅座位数" align="center">
        <template slot-scope="scope">
          {{
            scope.row.room_size ? scope.row.room_size : "【暂未配置座位模板】"
          }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="success"
            icon="el-icon-view"
            circle
            @click="$router.push('/home/showingon-plan-list/' + scope.row.id)"
          ></el-button>
          <el-button
            size="small"
            type="info"
            icon="el-icon-plus"
            circle
            @click="$router.push('/home/showingon-plan-add/' + scope.row.id)"
          ></el-button>
          <el-button
            size="small"
            type="warning"
            icon="el-icon-edit"
            circle
            @click="$router.push('/home/seat-template/' + scope.row.id)"
          ></el-button>
          <el-button size="small" type="danger" icon="el-icon-delete" circle>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增放映厅表单 对话框 -->
    <el-dialog title="新增放映厅" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="width: 85%">
        <el-form-item label="放映厅名称" label-width="130px">
          <el-input v-model="form.room_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="放映厅类型" label-width="130px">
          <el-select v-model="form.room_type" placeholder="放映厅类型">
            <el-option
              v-for="item in types"
              :key="item.id"
              :label="item.type_name"
              :value="item.type_name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import httpApi from "@/http";
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        room_name: "",
        room_type: "",
        movie_cinema_id: this.$route.params.cinemaId,
      },
      types: [], //保存所有影院类型
      rooms: [], //放映厅列表
    };
  },

  methods: {
    //新增放映厅
    submit() {
      console.log(this.form);
      httpApi.cinemaRoomApi.add(this.form).then((res) => {
        console.log("新增的放映厅", res);
        if (res.data.code == 200) {
          this.$message.success("添加成功");
          this.dialogFormVisible = false;
          this.initRoom();
        } else {
          this.$message.error("添加失败请检查重试.");
        }
      });
    },

    //获取放映厅列表
    initRoom() {
      httpApi.cinemaRoomApi
        .list({ cinema_id: this.form.movie_cinema_id })
        .then((res) => {
          console.log("根据电影院id查到的放映厅如下", res);
          this.rooms = res.data.data;
        });
    },

    //初始化查询类型
    initRoomTypes() {
      httpApi.cinemaRoomApi.queryAllTypes().then((res) => {
        console.log("查询到的放映厅类型", res);
        this.types = res.data.data;
      });
    },
  },
  mounted() {
    this.initRoomTypes();
    this.initRoom();
  },
};
</script>

<style lang="scss" scoped>
</style>