import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


//初始化变量
let state = {
	userInfo:{personal:{},token:''},
	showTabBar: false,	//底部导航是否显示
	System:{},
	appConfig:{},
}

const mutations = {
	setStateData(state,info) {
		state[info.name] = info.value;
	},
}

const actions = {
	setStateData(setStateData) {
		setStateData.commit('setStateData');
	},
}

const getters = {
	userInfo(state) {return state.userInfo},
	showTabBar(state){return state.showBar},
	System(state){return state.System},
	appConfig(state){return state.appConfig}
};

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})

