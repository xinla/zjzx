import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


//初始化变量
function State(){
  this.token = null;
  this.id = null;
  this.logid = null;
  this.userName = null;
  this.usetImg = "";
  this.userMobile = null;
  this.newMes = 0;
  this.newVersion = 0; //0 已最新 1有更新
  this.currentVersion = null;
  this.forbidSwiper = true;
}
// let state = {
//   token:window.localStorage.getItem('token'),
//   id:null,
//   logid:null,
//   username:null,
//   usetImg:"",
//   userMobile:null,
// }
let state = new State();
//创建改变状态的方法
const mutations = {
  LOGIN(state,data) {   
    state.token = data;
    window.localStorage.setItem('token', data);
  },
  LOGOUT(state) {
    state = new State();
    window.localStorage.clear();
  },
  ID(state,data) {
    state.id = data;
    window.localStorage.setItem('id', data);
  },
  LOGID(state, data) {
    state.logid=data;
    window.localStorage.setItem('logid', data);
  },
  USERNAME(state,data) {
    state.userName = data;
    window.localStorage.setItem('userName',data);
  },
  USERIMG(state,data){
    state.userImg = data;
    // window.localStorage.setItem('userImg',data);
    localStorage.userImg = data;
  },
  USERMOBILE(state,data){
    state.userMobile = data;
    localStorage.userMobile = data;
  },
  setSwiperThreshold(state,data){
    state.swiperThreshold = data;
  },
  setNewMes(state,data){
    state.newMes = data; 
  },
  setNewVersion(state,data){
    state.newVersion = data; 
  },
  setCurrentVersion(state,data){
    state.currentVersion = data; 
  },
  setForbidSwiper(state,data){
    state.forbidSwiper = data;
  }
}
//创建驱动action可以使得mutations得
const actions = {
  userLogin({commit}, data) {
    commit('LOGIN',data);
  },
  userLogout({commit}) {
    commit('LOGOUT');
  },
  userId({commit}, data) {
    commit('ID', data);
  },
  userLogid({commit},data) {
    commit('LOGID', data);
  },
  userName({commit},data) {
    commit('USERNAME',data);
  },
  userImg({commit},data) {
    commit("USERIMG",data);
  },
  userMobile({commit},data) {
    commit("USERMOBILE",data);
  },
  setNewMes({commit},data) {
    commit("setNewMes",data);
  },
  setNewVersion({commit},data) {
    commit("setNewVersion",data);
  },
  setCurrentVersion({commit},data) {
    commit("setCurrentVersion",data);
  },
  setForbidSwiper({commit},data){
    commit("setForbidSwiper",data);
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

