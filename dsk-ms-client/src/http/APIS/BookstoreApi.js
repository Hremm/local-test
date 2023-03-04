/** 存放所有书店模块相关接口 */
import myaxios from "../MyAxios";

import baseURL from "../baseURL.js";
const dskURL = baseURL.dskURL;

const bookstoreApi = {
  /** 查询所有书店 */
  queryAll() {
    let url = dskURL + "/book_stores";
    return myaxios.get(url);
  },

  /** 添加书店 */
  add(params) {
    let url = dskURL + "/book_store/add";
    return myaxios.post(url, params);
  },

  /** 查询书店类型 */
  queryTypes() {
    let url = dskURL + "/book_store/types";
    return myaxios.get(url);
  },
  //删除
  del(params) {
    let url = dskURL + "/book_store/del";
    return myaxios.post(url, params);
  },
  //编辑书店信息
  update(params) {
    let url = dskURL + "/book_store/update";
    return myaxios.post(url, params);
  },
   /**
   * 通过id查询书店详情
   * @param {obj} params
   */
   queryByid(params) {
    let url = dskURL + "/book_store/query";
    return myaxios.get(url, params);
  },

};
export default bookstoreApi;
