import store from "@/store";
import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home/index",
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
    children: [
      {
        path: "index",
        component: () => import("../views/index.vue"),
        meta: {
          thumb: ["首页"],
        },
      },
      {
        path: "actor-list",
        component: () => import("../views/actor/actorList.vue"),
        //meta意味着希望为该路由绑定一些自定义数据,这些自定义数据在组件中可以直接访问:通过this.$route.meta.thumb访问该数组
        meta: {
          thumb: ["演员管理", "演员列表"],
        },
      },
      {
        path: "actor-add",
        component: () => import("../views/actor/actorAdd.vue"),
        meta: {
          thumb: ["演员管理", "新增演员"],
        },
      },
      {
        path: "director-list",
        component: () => import("../views/director/DirectorList.vue"),
        meta: {
          thumb: ["导演管理", "导演列表"],
        },
      },
      {
        path: "director-add",
        component: () => import("../views/director/DirectorAdd.vue"),
        meta: {
          thumb: ["导演管理", "新增导演"],
        },
      },
      {
        path: "movie-list",
        component: () => import("../views/movie/MovieList.vue"),
        meta: {
          thumb: ["电影管理", "电影列表"],
        },
      },

      {
        path: "movie-add",
        component: () => import("../views/movie/MovieAdd.vue"),
        meta: {
          thumb: ["电影管理", "新增电影"],
        },
      },
      {
        path: "movie-update/:id",
        component: () => import("../views/movie/MovieUpdate.vue"),
        meta: {
          thumb: ["电影管理", "修改电影"],
        },
      },
      {
        path: "cinema-add",
        component: () => import("../views/cinema/CinemaAdd.vue"),
        meta: {
          thumb: ["电影院管理", "添加电影院"],
        },
      },
      {
        path: "cinema-list",
        component: () => import("../views/cinema/CinemaList.vue"),
        meta: {
          thumb: ["电影院管理", "电影院列表"],
        },
      },
      {
        path: "cinema-room-list/:cinemaId",
        component: () => import("../views/cinema/CinemaRoomList.vue"),
        meta: {
          thumb: ["电影院管理", "电影院列表", "放映厅列表"],
        },
      },
      {
        path: "showingon-plan-add/:roomId",
        component: () => import("../views/cinema/ShowingonPlanAdd.vue"),
        meta: {
          thumb: ["电影院管理", "电影院列表", "放映厅列表", "新增排片计划"],
        },
      },
      {
        path: "showingon-plan-list/:roomId",
        component: () => import("../views/cinema/ShowingonPlanList.vue"),
        meta: {
          thumb: ["电影院管理", "电影院列表", "放映厅列表", "排片计划列表"],
        },
      },
     
    ],
  },
  {
    path: "/user/login",
    name: "login",
    component: () => import("../views/user/Login.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//添加全局前置守卫

router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.path == "/user/login") {
    next();
  } else {
    if (store.state.user) {
      next();
    } else {
      router.push("/user.login");
    }
  }
});

export default router;
