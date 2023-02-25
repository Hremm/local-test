<template>
  <div>
 

    <!-- 搜索表单 -->
    <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
      <el-form-item label="电影名称">
        <el-input
          @keyup.native.enter="submit"
          v-model="name"
          placeholder="请输入电影关键字"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">电影列表</el-divider>

    <!-- 电影列表 -->

    <el-table :data="movieData.result">
      <el-table-column label="电影封面">
        <template slot-scope="scope">
          <img :src="scope.row.cover" width="55px" />
        </template>
      </el-table-column>
      <!-- <el-table-column label="电影名称" align="left"
        ><template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template></el-table-column
      >
      <el-table-column label="主演" align="center"></el-table-column>
      <el-table-column label="上映时间"></el-table-column>
      <el-table-column label="时长"></el-table-column>
      <el-table-column label="所属类别"></el-table-column>
      <el-table-column label="操作"></el-table-column> -->
      <el-table-column label="电影名称" prop="title"></el-table-column>
      <el-table-column label="主演" prop="star_actor"></el-table-column>
      <el-table-column
        label="上映时间"
        align="center"
        width="120px"
        prop="showingon"
      ></el-table-column>
      <el-table-column label="时长" align="center" width="80px" prop="duration">
        <template slot-scope="scope">{{ scope.row.duration }} 分钟</template>
      </el-table-column>
      <el-table-column label="所属类别" prop="type"></el-table-column>
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="success"
            icon="el-icon-check"
            circle
          ></el-button>
          <el-button
            size="small"
            type="info"
            icon="el-icon-message"
            circle
          ></el-button>
          <el-button
            @click="$router.push('/home/movie-update/' + scope.row.id)"
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
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      background
      :page-size="movieData.pagesize"
      :current-page="movieData.page"
      layout="->,total,prev, pager, next,jumper"
      :total="movieData.total"
      @current-change="changeCurrentPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import httpApi from "@/http/index";
export default {
  data() {
    return {
      name: "", //查询的关键词
      movieData: {
        //保存电影数据
        page: 1, //页码
        pagesize: 5, //每页多少条
        total: 0, //总条目
        result: [], //电影列表
      },
    };
  },
  methods: {
    //提交表单时把页面重新定位到第一页
    submit() {
      this.movieData.page = 1;
      this.search();
    },
    //模糊查询
    search() {
      if (this.name.trim()) {
        //有关键字
        this.queryMovieByName();
      } else {
        //没有关键字
        this.queryMovie();
      }
    },
    //改变页码时触发
    changeCurrentPage(page) {
      this.movieData.page = page; // 修改当前页
      this.search(); // 重新加载当前页的电影列表
    },

    queryMovie() {
      let params = {
        page: this.movieData.page,
        pagesize: this.movieData.pagesize,
      };
      httpApi.movieAPI.queryAll(params).then((res) => {
        console.log("首页电影数据列表", res);
        this.movieData = res.data.data;
      });
    },
    // 模糊查询电影列表
    queryMovieByName() {
      let params = {
        name: this.name,
        page: this.movieData.page,
        pagesize: this.movieData.pagesize,
      };
      httpApi.movieAPI.queryByNameLike(params).then((res) => {
        console.log("模糊查询电影数据列表", res);
        this.movieData = res.data.data;
      });
    },
    del(movie) {
      console.log("点击了删除", movie);
      this.$confirm("此操作将永久删除该电影, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          httpApi.movieAPI.del({ id: movie }).then((res) => {
            console.log("删除成功了,删除的结果如下", res);
            if (res.data.code == 200) {
              this.search();
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

    //初始显示电影
    init() {
      let params = { page: 1, pagesize: 5 };
      httpApi.movieAPI.queryAll(params).then((res) => {
        console.log("显示部分电影", res);
        this.movieData = res.data.data;
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
</style>