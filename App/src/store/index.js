import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios'
Vue.use(Vuex);

//初始化变量
let state = {
	//存储全局变量
	Variable: {
		url:'http://192.168.2.103:8080/zjzx'
	}
}
export default new Vuex.Store({
	state
})