import Vue from 'vue'
import App from './App'

import $ from 'jquery'
window.$ = $;

//es6 promise兼容
// import 'es6-promise/auto'


import router from './router'
import store from './store/index'


//css样式
import './assets/font/reset.css'
import './assets/font/iconfont.css'


//服务端请求
import Request from './assets/request/axiosServer'
// Vue.use(Request);

//引用工具函数
import localforage from './assets/common/localforage'
Vue.use(localforage);

//引用功能函数
import TooL from './assets/common/methods'
Vue.use(TooL);

//数据
import axios from 'axios'
Vue.prototype.$http = axios

//底部导航--全局组件
/*import TabBar from '@/components/TabBar';
Vue.use(TabBar);

//头部导航--全局组件
import NavBar from '@/components/NavBar';
Vue.use(NavBar);

//滚动全局组件
import scroll from '@/components/scroll';
Vue.use(scroll);



//Toast插件
import Toast from '@/plugins/Toast'
Vue.use(Toast);






//让图片居中显示
import resizeImg from '@/components/resizeImg';
Vue.use(resizeImg);

*/
//Loading插件
import Loading from '@/plugins/loading'
Vue.use(Loading);

//Confirm插件
import Confirm from '@/plugins/confirm'
Vue.use(Confirm);

//BottomPopup插件
import BottomPopup from '@/plugins/BottomPopup'
Vue.use(BottomPopup);


//Swiper组件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css';
Vue.use(VueAwesomeSwiper);

//vux
import{Cell,Group} from 'vux';
Vue.component('group', Group);
Vue.component('cell', Cell);


import FastClick from 'fastclick'
FastClick.attach(document.body);



Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  created() {
  	window.GoTruth = this;
  	// this.initSystem();
  },
/*  methods: {
  	//判断系统
  	initSystem(){
        let System = {
          isWechat:navigator.userAgent.indexOf('MicroMessenger') > -1,
          isIOS:!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
          isAndroid:navigator.userAgent.indexOf('Android') > -1,
          isNative:location.protocol.toLowerCase().indexOf('file') > -1,
          isIP:!!location.href.match('192'),
          iPhoneX:/iphone/gi.test(navigator.userAgent) && (screen.height === 812 && screen.width === 375)
        };
        this.$store.commit('setStateData',{name:'System',value:System})
      },
  },*/
  render: h => h(App),
}).$mount('#app');
