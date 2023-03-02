<template>
  <div>

    <!-- 搜索表单 -->
    <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
      <el-form-item label="图书名称">
        <el-input
          @keyup.native.enter="submit"
          v-model="name"
          placeholder="请输入书名关键字"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">图书列表</el-divider>

    <!-- 图书列表 -->

    <el-table :data="bookData.result">
      <el-table-column label="图书封面">
        <template slot-scope="scope">
          <img :src="scope.row.cover" width="55px" />
        </template>
      </el-table-column>
      <!-- <el-table-column label="图书名称" align="left"
        ><template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template></el-table-column
      >
      <el-table-column label="作者" align="center"></el-table-column>
      <el-table-column label="发布日期"></el-table-column>
      <el-table-column label="评分"></el-table-column>
      <el-table-column label="所属类别"></el-table-column>
      <el-table-column label="操作"></el-table-column> -->
      <el-table-column label="图书名称" prop="title" ></el-table-column>
      <el-table-column align="center" label="作者" prop="author_name"></el-table-column>
      <el-table-column
      align="center"
        label="发布日期"
        width="120px"
        prop="publish_date"
      ></el-table-column>
      <el-table-column label="评分" align="center" width="80px" prop="score">
        <template slot-scope="scope">{{ scope.row.score }} 分</template>
      </el-table-column>
      <el-table-column label="所属类别" prop="type" align="center"></el-table-column>
      <el-table-column label="操作" width="180px" align="center">
        <template slot-scope="scope">
        <!--   <el-button
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
          ></el-button> -->
          <el-button
            @click="$router.push('/home/book-update/' + scope.row.bid)"
            size="small"
            type="warning"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            @click="del(scope.row.bid)"
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
      :page-size="bookData.pagesize"
      :current-page="bookData.page"
      layout="->,total,prev, pager, next,jumper"
      :total="bookData.total"
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
      bookData: {
        //保存图书数据
        page: 1, //页码
        pagesize: 10, //每页多少条
        total: 0, //总条目
        result: [], //图书列表
      },
    };
  },
  methods: {
    //提交表单时把页面重新定位到第一页
    submit() {
      this.bookData.page = 1;
      this.search();
    },
    //模糊查询
    search() {
      if (this.name.trim()) {
        //有关键字
        this.queryBookByName();
      } else {
        //没有关键字
        this.queryBook();
      }
    },
    //改变页码时触发
    changeCurrentPage(page) {
      this.bookData.page = page; // 修改当前页
      this.search(); // 重新加载当前页的图书列表
    },

    queryBook() {
      let params = {
        page: this.bookData.page,
        pagesize: this.bookData.pagesize,
      };
      httpApi.bookAPI.queryAll(params).then((res) => {
        console.log("首页图书数据列表", res);
        this.bookData = res.data.data;
      });
    },
    // 模糊查询图书列表
    queryBookByName() {
      let params = {
        name: this.name,
        page: this.bookData.page,
        pagesize: this.bookData.pagesize,
      };
      httpApi.bookAPI.queryByNameLike(params).then((res) => {
        console.log("模糊查询图书数据列表", res);
        this.bookData = res.data.data;
      });
    },
    del(book) {
      console.log("点击了删除", book);
      this.$confirm("此操作将永久删除该图书, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          httpApi.bookAPI.del({ bid: book }).then((res) => {
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

    //初始显示图书
    init() {
      let params = { page: 1, pagesize: 5 };
      httpApi.bookAPI.queryAll(params).then((res) => {
        console.log("显示部分图书", res);
        this.bookData = res.data.data;
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