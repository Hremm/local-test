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
    <el-divider content-position="left">导演列表</el-divider>

    <!-- 呈现导演列表 -->
    <person
      v-for="item in directors"
      :key="item.id"
      :name="item.director_name"
      :avatar="item.director_avatar"
      @del="deleteDirector(item.id)"
    >
    </person>
  </div>
</template>

<script>
import Person from "@/components/Person.vue";
import myaxios from "@/http/MyAxios.js";
export default {
  components: {
    Person,
  },

  data() {
    return {
      directors: [], // 存储导演列表
      name: "", // 绑定姓名输入框value
    };
  },

  /** 组件挂载完毕后执行 */
  mounted() {
    this.init(); // 初始化数据
  },

  methods: {
    /** 捕获到用户点了叉子 */
    deleteDirector(id) {
      console.log("在父组件中 捕获到了用户点了叉子:id=" + id);
      // 发送请求，删除该导演
      let url = "http://localhost:3010/movie-director/del";
      myaxios.post(url, { id }).then((res) => {
        console.log("删除导演结果", res);
        if (res.data.code == 200) {
          this.search();
        }
      });
    },

    /** 通过关键字 模糊查询列表数据 */
    search() {
      if (this.name.trim()) {
        // 如果name有关键字数据
        let url = "http://localhost:3010/movie-directors/name";
        let params = { name: this.name };
        myaxios.post(url, params).then((res) => {
          console.log("模糊查询导演列表", res);
          // 更新列表
          this.directors = res.data.data;
        });
      } else {
        // 如果没有关键字数据
        this.init();
      }
    },

    /** 初始化数据 */
    init() {
      let url = "http://localhost:3010/movie-directors";
      //  url = "https://web.codeboy.com/bmdapi/movie-directors"
      let params = { page: 1, pagesize: 100 };
      myaxios.get(url, params).then((res) => {
        console.log("加载导演列表结果", res);
        // 将res.data.data中存储的导演列表存入this.directors
        this.directors = res.data.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>