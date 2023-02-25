<template>
  <div>
    <!-- 添加导演表单 -->
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
      style="width: 600px"
    >
      <el-form-item label="导演姓名" prop="directorName">
        <el-input v-model="form.directorName"></el-input>
      </el-form-item>
      <el-form-item label="选择头像" prop="directorAvatar">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:9000/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="form.directorAvatar"
            :src="form.directorAvatar"
            class="avatar"
          />
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
export default {
  data() {
    return {
      form: {
        directorName: "", // 封装导演名字
        directorAvatar: "", // 封装导演头像路径
      },
      rules: {
        directorName: [
          { required: true, message: "导演姓名不能为空", trigger: "blur" },
        ],
        directorAvatar: [
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
          let url = "http://localhost:3010/movie-director/add";
          myaxios.post(url, this.form).then((res) => {
            console.log("添加导演结果", res);
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
      // 将res.data中保存的图片访问链接，存入this.form.directorAvatar
      this.form.directorAvatar = res.data;
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