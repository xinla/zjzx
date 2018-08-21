// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import App from './App'
import store from '@/store/index'
import router from './router'
import '@/assets/css/reset.css'
import '@/assets/font/iconfont.css'
import '@/assets/css/swiper.css'


Vue.config.productionTip = false;





// 数据请求
Vue.use(Vuex)
Vue.prototype.$http = axios
// 轮播图

import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

import TooL from '@/common/methods'
Vue.use(TooL)

//快速点击
import FastClick from 'fastclick'
FastClick.attach(document.body);


/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
