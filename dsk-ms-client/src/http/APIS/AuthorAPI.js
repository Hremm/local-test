//封装演员模块相关接口
import myaxios from "../MyAxios.js";
import baseURL from "../baseURL.js";
const dskURL = baseURL.dskURL;
const authorAPI = {
  //查询所有演员，返回Promise对象
  queryAllAuthor() {
    let url = dskURL + "/book_authors";
    return myaxios.get(url, { page: 1, pagesize: 100});
  },
  /**
   *通过姓名模糊查询演员
   * @param {Object} params 请求参数对象。例如：{name：'先辈'}
   * @return Promise
   */
  queryByNameLike(params) {
    let url = dskURL + "/book_authors/name";
    return myaxios.post(url, params);
  },
  /**
   *添加演员
   * @param {Obj} params 参数对象 例如 {authorName:演员名称, authorAvatar:演员头像}
   * @return Promise
   */
  add(params) {
    let url = dskURL + "/book_author/add";
    return myaxios.post(url, params);
  },
  /**
   *删除演员
   * @param {obj} params {id:演员id}
   * @return Promise
   */
  del(params) {
    let url = dskURL + "/book_author/del";
    return myaxios.post(url, params);
  },
};
export default authorAPI;
