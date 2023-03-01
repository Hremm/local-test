//
import myaxios from "../MyAxios.js";
import baseURL from "../baseURL.js";
const dskURL = baseURL.dskURL;

const bookAPI = {
  /**
   *页码改变时,查询图书列表
   * @param {obj} params :{page:1,pagesize:10}
   *
   */
  queryAll(params) {
    let url = dskURL + "/book_details";
    return myaxios.get(url, params);
  },
  /**
   * 模糊查询 参数:{name:关键字,page:1,pagesize:2}
   */
  queryByNameLike(params) {
    let url = dskURL + "/book_details/name";
    return myaxios.post(url, params);
  },
  /**
   * 删除图书
   * @param {obj} params {bid:1}
   */
  del(params) {
    let url = dskURL + "/book_details/del";
    return myaxios.post(url, params);
  },
  /**
   * 查询图书类型
   */
  queryTypes() {
    let url = dskURL + "/book_type";
    return myaxios.get(url);
  },
  // 新增图书
  add(params) {
    let url = dskURL + "/book_details/add";
    return myaxios.post(url, params);
  },
  /**
   * 通过id查询图书详情
   * @param {obj} params
   */
  queryByBid(params) {
    let url = dskURL + "/book_details/query";
    return myaxios.get(url, params);
  },
  //更新图书信息
  update(params) {
    let url = dskURL + "/book_details/update";
    return myaxios.post(url, params);
  },
};

export default bookAPI;
