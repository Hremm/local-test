//提供访问具体某接口模块对象
import authorAPI from "./APIS/AuthorAPI";
import directorAPI from "./APIS/directorAPI";
import movieAPI from "./APIS/movieAPI";
import adminApi from "./APIS/AdminApi";
import cinemaApi from "./APIS/CinemaApi";
import cinemaRoomApi from "./APIS/CinemaRoomApi";
import movieThumbApi from "./APIS/MovieThumbApi";
import showingonPlanApi from "./APIS/ShowingonPlanApi";
const httpApi = {
  authorAPI,
  movieAPI,
  directorAPI,
  adminApi,
  cinemaApi,
  cinemaRoomApi,
  movieThumbApi,
  showingonPlanApi,
};
export default httpApi;
