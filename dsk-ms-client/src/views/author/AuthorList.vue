<template>
  <div>
    <!-- 搜索表单 -->
    <el-form @submit.native.prevent :inline="true" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input
          @keyup.native.enter="search"
          v-model="name"
          placeholder="请输入姓名关键字"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">作者列表</el-divider>

    <!-- 呈现作者列表 -->
    <person
      v-for="item in authors"
      :key="item.id"
      :name="item.author_name"
      :avatar="item.author_avatar"
      @del="deleteAuthor(item.id)"
    >
    </person>
  </div>
</template>

<script>
import Person from "@/components/Person.vue";
import httpApi from "@/http/index.js";
export default {
  components: {
    Person,
  },

  data() {
    return {
      authors: [], // 存储作者列表
      name: "", // 绑定姓名输入框value
    };
  },

  /** 组件挂载完毕后执行 */
  mounted() {
    this.init(); // 初始化数据
  },

  methods: {
    /** 捕获到用户点了叉子 */
    deleteAuthor(id) {
      console.log("在父组件中 捕获到了用户点了叉子:id=" + id);
      // 发送请求，删除该作者

      this.$confirm("此操作将永久删除该作者, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          httpApi.authorAPI.del({ id }).then((res) => {
            console.log("删除作者结果", res);
            if (res.data.code == 200) {
              this.search();
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });

      // let url = "http://localhost:3060/book-author/del";
      // myaxios.post(url, { id }).then((res) => {
      //   console.log("删除作者结果", res);
      //   if (res.data.code == 200) {
      //     this.search();
      //   }
      // });
    },

    /** 通过关键字 模糊查询列表数据 */
    search() {
      if (this.name.trim()) {
        // 如果name有关键字数据
        // let url = "http://localhost:3060/book-authors/name";
        // let params = { name: this.name };
        // myaxios.post(url, params).then((res) => {
        //   console.log("查询到的作者列表如下", res);
        //   // 更新列表
        //   this.authors = res.data.data;
        // });
        let params = { name: this.name };
        httpApi.authorAPI.queryByNameLike(params).then((res) => {
          console.log("查询到的作者列表如下", res);
          this.authors = res.data.data;
        });
      } else {
        // 如果没有关键字数据
        this.init();
      }
    },

    /** 初始化数据 */
    init() {
      // let url = "http://localhost:3060/book-authors";
      // //  url = "https://web.codeboy.com/bmdapi/book-authors"
      // let params = { page: 1, pagesize: 100 };
      // myaxios.get(url, params).then((res) => {
      //   console.log("加载作者列表结果", res);
      //   // 将res.data.data中存储的作者列表存入this.authors
      //   this.authors = res.data.data;
      // });
      httpApi.authorAPI.queryAllAuthor().then((res) => {
        console.log("加载作者列表结果", res);
        this.authors = res.data.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>