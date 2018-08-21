import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		user:''
	},
	mutations: {
		user(state,msg) {
			state.user = msg;
			localStorage.setItem('user',msg)
		}
	}
})

export default store