//提供访问具体某接口模块对象
import authorAPI from "./APIS/AuthorAPI";
import bookAPI from "./APIS/bookAPI";
import adminApi from "./APIS/AdminApi";
import bookstoreApi from "./APIS/BookstoreApi";
const httpApi = {
  authorAPI,
  bookAPI,
  adminApi,
  bookstoreApi,
};
export default httpApi;
