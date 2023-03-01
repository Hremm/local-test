<template>
  <div>

    <!-- 新增图书的表单 -->
    <el-form
      label-width="120px"
      style="width: 600px"
      ref="form"
      :model="form"
      :rules="rules"
    >
      <el-form-item label="封面图片" prop="cover">
        <el-upload
          class="avatar-uploader"
          :action="`${uploadURL}/upload`"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.cover" :src="form.cover" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="图书类别" prop="categoryId">
        <el-radio v-model="form.categoryId" label="1">热映</el-radio>
        <el-radio v-model="form.categoryId" label="2">待映</el-radio>
        <el-radio v-model="form.categoryId" label="3">经典</el-radio>
      </el-form-item>
      <el-form-item label="图书名称" prop="title">
        <el-input v-model="form.title" type="text"></el-input>
      </el-form-item>
      <el-form-item label="图书类型" prop="type">
        <el-select
          style="width: 100%"
          v-model="form.type"
          multiple
          placeholder="请选择图书类型"
        >
          <el-option
            v-for="item in types"
            :key="item.id"
            :label="item.typename"
            :value="item.typename"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图书主演" prop="starActor">
        <el-select
          style="width: 100%"
          v-model="form.starActor"
          multiple
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="remoteMethod"
          :loading="loading"
        >
          <el-option
            v-for="item in actors"
            :key="item.id"
            :label="item.actor_name"
            :value="item.actor_name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上映时间" prop="showingon">
        <el-date-picker
          style="width: 100%"
          v-model="form.showingon"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="图书评分" prop="score">
        <el-input v-model="form.score" type="text"></el-input>
      </el-form-item>
      <el-form-item label="图书时长" prop="duration">
        <el-input v-model="form.duration" type="text"></el-input>
      </el-form-item>
      <el-form-item label="图书简介" prop="description">
        <el-input
          v-model="form.description"
          type="textarea"
          rows="3"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">立即新增</el-button>
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
      types: [], // 保存所有图书类型
      form: {
        // 保存当前表单收集到的数据
        categoryId: "1", // 类别ID  热映=1  待映=2  经典=3
        cover: "",
        title: "",
        type: [],
        starActor: [],
        showingon: "",
        score: "",
        description: "",
        duration: "",
      },
      rules: {
        categoryId: [
          { required: true, message: "该字段不能为空", trigger: "blur" },
        ],
        cover: [{ required: true, message: "该字段不能为空", trigger: "blur" }],
        title: [{ required: true, message: "该字段不能为空", trigger: "blur" }],
        type: [
          { required: true, message: "该字段不能为空", trigger: "change" },
        ],
        starActor: [
          { required: true, message: "该字段不能为空", trigger: "change" },
        ],
        showingon: [
          { required: true, message: "该字段不能为空", trigger: "blur" },
        ],
        score: [{ required: true, message: "该字段不能为空", trigger: "blur" }],
        description: [
          { required: true, message: "该字段不能为空", trigger: "blur" },
        ],
        duration: [
          { required: true, message: "该字段不能为空", trigger: "blur" },
        ],
      },
      actors: [], // 保存模糊查询后的演员列表
      loading: false, // 表示下拉列表是否正在加载
    };
  },

  methods: {
    /** 提交表单 */
    submit() {
      // 处理一下form中的字段，改为服务端需要的格式（字符串）
      this.form.starActor = this.form.starActor.join("／");
      this.form.type = this.form.type.join("／");
      console.log(this.form);
      // // 若表单数据收集完毕，发送新增请求即可
      // httpApi.bookAPI.add(this.form).then((res) => {
      //   if (res.data.code == 200) {
      //     // 跳转到列表
      //     this.$router.push("/home/book-list");
      // 验证表单是否符合rules的要求
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // 表单验证通过
          // 若表单数据收集完毕，发送新增请求即可
          httpApi.bookAPI.add(this.form).then((res) => {
            if (res.data.code == 200) {
              // 跳转到列表
              this.$message.success("恭喜，添加成功");
              this.$router.push("/home/book-list");
            }
          });
        }
      });
    },

    /** 当在el-select中输入内容，需要异步搜索演员时 */
    remoteMethod(query) {
      // 演员名称关键字  query
      httpApi.actorAPI.queryByNameLike({ name: query }).then((res) => {
        console.log("演员列表", res);
        // 将 演员列表 res.data.data 显示在下拉列表中
        this.actors = res.data.data;
      });
    },

    /** 上传成功后执行 */
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.form.cover = res.data;
    },

    /** 上传之前完成图片格式的验证 */
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    /** 组件挂载完毕后执行 */
    initMovieTypes() {
      httpApi.bookAPI.queryTypes().then((res) => {
        console.log("加载所有图书类别", res);
        // 渲染option列表
        this.types = res.data.data;
      });
    },
  },

  /** 组件挂载完毕后执行 */
  mounted() {
    // 初始化图书类型列表  更新下拉列表框
    this.initMovieTypes();
  },
};
</script>

<style lang="scss" scoped>
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  display: block;
}
</style>