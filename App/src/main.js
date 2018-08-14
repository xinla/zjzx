// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/css/reset.css'
import '@/assets/font/iconfont.css'
import '@/assets/css/swiper.css'
import '@/assets/js/rem.js'
Vue.config.productionTip = false


// 数据请求
import Vuex from 'vuex'
Vue.use(Vuex)

// 轮播图
import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use(VueAwesomeSwiper)

//快速点击
import FastClick from 'fastclick'
FastClick.attach(document.body);


/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
