// MyAxios.js
import axios from "axios";
import qs from "qs";
import store from "@/store";
// 创建axios实例
const instance = axios.create();

//为axios发送的每一个请求,添加请求拦截器,处理token字符串
instance.interceptors.request.use(function (config) {
  config.headers["Authorization"] = store.state.token;
  return config;
});

let myaxios = {
  /**
   * 发送get请求
   * @param {string} url  请求路径
   * @param {object} params  请求参数（对象的形式传递）
   * @returns Promise
   */
  get(url, params) {
    return instance({
      url,
      method: "GET",
      params,
    });
  },

  /**
   * 发送post请求
   * @param {string} url  请求路径
   * @param {object} params  请求参数（对象的形式传递）
   * @returns Promise
   */
  post(url, params) {
    return instance({
      url,
      method: "POST",
      data: qs.stringify(params),
    });
  },
};

export default myaxios;
