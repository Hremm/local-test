<template>
  <div>
    <!-- 添加作者表单 -->
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
      style="width: 600px"
    >
      <el-form-item label="作者姓名" prop="authorName">
        <el-input v-model="form.authorName"></el-input>
      </el-form-item>
      <el-form-item label="选择头像" prop="authorAvatar">
        <el-upload
          class="avatar-uploader"
          :action="`${uploadURL}/upload`"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.authorAvatar" :src="form.authorAvatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">立即新增</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import myaxios from "@/http/MyAxios.js";
import add from "@/http/APIS/AuthorAPI";
import httpApi from "@/http";
export default {
  data() {
    return {
      form: {
        authorName: "", // 封装作者名字
        authorAvatar: "", // 封装作者头像路径
      },
      rules: {
        authorName: [
          { required: true, message: "作者姓名不能为空", trigger: "blur" },
        ],
        authorAvatar: [
          { required: true, message: "请选择一张头像", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    /** 提交表单 */
    submit() {
      // 验证表单，只有验证通过才发请求
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // let url = "http://localhost:3060/movie-author/add";

          httpApi.authorAPI.add(this.form).then((res) => {
            console.log("添加作者结果", res);
            if (res.data.code == 200) {
              // 成功
              this.$message.success("恭喜，添加成功");
            } else {
              // 失败
              this.$message.error("添加失败，稍后重试");
            }
            // 重置表单
            this.$refs["form"].resetFields();
          });
        }
      });
    },

    /** 上传成功后执行 */
    handleAvatarSuccess(res, file) {
      console.log(res);
      // 将res.data中保存的图片访问链接，存入this.form.authorAvatar
      this.form.authorAvatar = res.data;
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