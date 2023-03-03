import myaxios from "../MyAxios";

import baseURL from "../baseURL.js";
const dskURL = baseURL.dskURL;

const userApi = {
  /**
   * 执行登录业务
   * @param {Object} params {user_name:xx,  password:xxx}
   */
  login(params) {
    return myaxios.post(dskURL + "/user/login", params);
  },
};

export default userApi;
