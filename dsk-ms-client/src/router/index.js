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
        name:"首页",
        component: () => import("../views/index.vue"),
        meta: {
          thumb: ["首页"],
        },
      },
      {
        path: "author-list",
        component: () => import("../views/author/AuthorList.vue"),
        //meta意味着希望为该路由绑定一些自定义数据,这些自定义数据在组件中可以直接访问:通过this.$route.meta.thumb访问该数组
        meta: {
          thumb: ["作者管理", "作者列表"],
        },
      },
      {
        path: "author-add",
        component: () => import("../views/author/AuthorAdd.vue"),
        meta: {
          thumb: ["作者管理", "新增作者"],
        },
      },
      {
        path: "book-list",
        component: () => import("../views/book/BookList.vue"),
        meta: {
          thumb: ["图书管理", "图书列表"],
        },
      },

      {
        path: "book-add",
        component: () => import("../views/book/BookAdd.vue"),
        meta: {
          thumb: ["图书管理", "新增图书"],
        },
      },
      {
        path: "book-update/:id",
        component: () => import("../views/book/BookUpdate.vue"),
        meta: {
          thumb: ["图书管理", "修改图书"],
        },
      },
      {
        path: "bookstore-add",
        component: () => import("../views/bookstore/BookStoreAdd.vue"),
        meta: {
          thumb: ["书店管理", "添加书店"],
        },
      },
      {
        path: "bookstore-list",
        component: () => import("../views/bookstore/BookStoreList.vue"),
        meta: {
          thumb: ["书店管理", "书店列表"],
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
