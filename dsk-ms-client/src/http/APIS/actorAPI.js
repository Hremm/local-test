//封装演员模块相关接口
import myaxios from "../MyAxios.js";
import baseURL from "../baseURL.js";
const bmdURL = baseURL.bmdURL;
const actorAPI = {
  //查询所有演员，返回Promise对象
  queryAllActor() {
    let url = bmdURL + "/movie-actors";
    return myaxios.get(url, { page: 1, pagesize: 100 });
  },
  /**
   *通过姓名模糊查询演员
   * @param {Object} params 请求参数对象。例如：{name：'先辈'}
   * @return Promise
   */
  queryByNameLike(params) {
    let url = bmdURL + "/movie-actors/name";
    return myaxios.post(url, params);
  },
  /**
   *添加演员
   * @param {Obj} params 参数对象 例如 {actorName:演员名称, actorAvatar:演员头像}
   * @return Promise
   */
  add(params) {
    let url = bmdURL + "/movie-actor/add";
    return myaxios.post(url, params);
  },
  /**
   *删除演员
   * @param {obj} params {id:演员id}
   * @return Promise
   */
  del(params) {
    let url = bmdURL + "/movie-actor/del";
    return myaxios.post(url, params);
  },
};
export default actorAPI;
