/** 存放所有影院模块相关接口 */
import myaxios from "../MyAxios";

import baseURL from "../baseURL.js";
const bmdURL = baseURL.bmdURL;

const cinemaApi = {
  /** 查询所有电影院 */
  queryAll() {
    let url = bmdURL + "/cinemas";
    return myaxios.get(url);
  },

  /** 添加影院 */
  add(params) {
    let url = bmdURL + "/cinema/add";
    return myaxios.post(url, params);
  },

  /** 查询影院类型 */
  queryTypes() {
    let url = bmdURL + "/cinema/tags";
    return myaxios.get(url);
  },
  //删除
  del(params) {
    let url = bmdURL + "/cinema/del";
    return myaxios.post(url, params);
  },
};
export default cinemaApi;
