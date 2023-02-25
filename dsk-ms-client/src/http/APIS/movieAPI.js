//
import myaxios from "../MyAxios.js";
import baseURL from "../baseURL.js";
const bmdURL = baseURL.bmdURL;

const movieAPI = {
  /**
   *页码改变时,查询电影列表
   * @param {obj} params :{page:1,pagesize:10}
   *
   */
  queryAll(params) {
    let url = bmdURL + "/movie-infos";
    return myaxios.get(url, params);
  },
  /**
   * 模糊查询 参数:{name:关键字,page:1,pagesize:2}
   */
  queryByNameLike(params) {
    let url = bmdURL + "/movie-infos/name";
    return myaxios.post(url, params);
  },
  /**
   * 删除电影
   * @param {obj} params {id:1}
   */
  del(params) {
    let url = bmdURL + "/movie-info/del";
    return myaxios.post(url, params);
  },
  /**
   * 查询电影类型
   */
  queryTypes() {
    let url = bmdURL + "/movie-types";
    return myaxios.get(url);
  },
  // 新增电影
  add(params) {
    let url = bmdURL + "/movie-info/add";
    return myaxios.post(url, params);
  },
  /**
   * 通过id查询电影详情
   * @param {obj} params
   */
  queryById(params) {
    let url = bmdURL + "/movie-info/query";
    return myaxios.get(url, params);
  },
  //更新电影信息
  update(params) {
    let url = bmdURL + "/movie-info/update";
    return myaxios.post(url, params);
  },
};

export default movieAPI;
