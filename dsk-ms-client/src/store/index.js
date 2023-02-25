import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  //默认情况下,用户未登录,需要在登录后,修改对象数据
  state: {
    user: JSON.parse(sessionStorage.getItem("user")),
    city: "郑州",
    token: sessionStorage.getItem("token"),
  },
  getters: {},
  mutations: {
    //声明一个方法,用于修改state.user数据;
    //通过$store.commit('updateUser')
    //vuex会接收到该请求,找到updateUser方法,并且执行它
    //vuex会自动传入参数:($store.state,用户传入的参数)
    updateUser(state, payload) {
      state.user = payload;
      //为了数据的持久化保存,还需要向storage中存一份
      sessionStorage.setItem("user", JSON.stringify(payload));
    },
    saveToken(state, token) {
      state.token = token;
      sessionStorage.setItem("token", token);
    },
  },
  actions: {
    //先发请求,获取登录成功的用户信息,更新state
    //当前方法传入两个参数:store对象,自定义参数
    //当前方法将会在调用:$store.dispatch('loginAndSaveUser',{..})
    loginAndSaveUser(store, payload) {
      store.commit("updateUser", { nickname: "测试用户" });
    },
  },
  modules: {},
});
