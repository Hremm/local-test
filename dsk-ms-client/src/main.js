import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入ElementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

Vue.config.productionTip = false;

//为vue对象注入自定义属性（全局变量）
import baseURL from "./http/baseURL";
const uploadURL = baseURL.uploadURL;
Vue.prototype.uploadURL = uploadURL;

//设置高德地图密钥
window._AMapSecurityConfig = {
  securityJsCode: "ce9e830b9cbb20ae4ce751f720164aa5",
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
