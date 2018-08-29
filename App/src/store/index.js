import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


//初始化变量
let state = {

  token:window.localStorage.getItem('token'),
  id:null,
  logid:null,

}
//创建改变状态的方法
const mutations = {
  LOGIN(state,data) {
    state.token = data;
    window.localStorage.setItem('token', data);
  },
  LOGOUT(state) {
    state.token = null;
    window.localStorage.removeItem('token');
  },
  ID(state,data) {
    state.id = data;
    window.localStorage.setItem('id', data);
  },
  LOGID(state, data) {
    state.logid=data;
    window.localStorage.setItem('logid', data);
  }

}
//创建驱动action可以使得mutations得
const actions = {
  UserLogin({commit}, data) {
    commit('LOGIN',data);
  },
  UserLogout({commit}) {
    commit('LOGOUT');
  },
  UserId({commit}, data) {
    commit('ID', data);
  },
  UserLogid({commit},data) {
    commit('LOGID', data);
  }
}

const getters = {

}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})

