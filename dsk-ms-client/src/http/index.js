//提供访问具体某接口模块对象
import authorAPI from "./APIS/AuthorAPI";
import directorAPI from "./APIS/directorAPI";
import bookAPI from "./APIS/bookAPI";
import adminApi from "./APIS/AdminApi";
import cinemaApi from "./APIS/CinemaApi";
import cinemaRoomApi from "./APIS/CinemaRoomApi";
import bookThumbApi from "./APIS/BookThumbApi";
import showingonPlanApi from "./APIS/ShowingonPlanApi";
const httpApi = {
  authorAPI,
  bookAPI,
  directorAPI,
  adminApi,
  cinemaApi,
  cinemaRoomApi,
  bookThumbApi,
  showingonPlanApi,
};
export default httpApi;
