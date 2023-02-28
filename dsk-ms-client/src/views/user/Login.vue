<template>
  <div>
    <div class="back">
      <el-form
        class="form"
        label-position="left"
        :model="form"
        :rules="rules"
        ref="form"
      >
        <p class="title">欢迎使用读书客后台管理系统</p>
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入管理员账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入管理员密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="onSubmit()"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import httpApi from "@/http";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请填写用户名", trigger: "blur" },
          {
            pattern: /^\w{3,15}$/,
            message: "3~15位字符，可以包含：数字、字母、下划线",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请填写密码", trigger: "blur" },
          {
            pattern: /^\w{6,15}$/,
            message: "6~15位字符，可以包含：数字、字母、下划线",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          httpApi.adminApi.login(this.form).then((res) => {
            console.log("登录结果", res);

            if (res.data.code == 200) {
              //将对象存入vuex
              this.$store.commit("updateUser", res.data.data.user);

              //token存入vuex中
              this.$store.commit("saveToken", res.data.data.token);
              this.$router.push("/");
            } else {
              this.$refs["form"].resetFields;
              this.$message.error(res.data.msg);
            }
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.form {
  display: block;
  width: 20%;
  position: absolute;
  top: 30%;
  left: 40%;
}
.form .title {
  text-align: center;
  font-size: 1.5em;
  color:white;
  margin-bottom: 20px;
}
.back{
  height: 100vh;
  background-image: url(@/assets/bg.jpg);
  background-size: cover;
}
</style>
