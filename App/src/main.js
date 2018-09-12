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
import Tool from './assets/common/methods'
Vue.use(Tool);

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
//通用top
import Top from '@/components/common/top'
Vue.component('Top',Top);
//通用空白页提示
import PromptBlank from '@/components/common/promptBlank'
Vue.component('PromptBlank',PromptBlank);

//Confirm插件
// import Confirm from '@/plugins/confirm'
// Vue.use(Confirm);

//BottomPopup插件
// import BottomPopup from '@/plugins/BottomPopup'
// Vue.use(BottomPopup);


//Swiper组件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css';
Vue.use(VueAwesomeSwiper);

//vux
import{ Cell,Group,Msg,Datetime,Confirm,Alert,Radio } from 'vux';
Vue.component('group', Group);
Vue.component('cell', Cell);
Vue.component('msg', Msg);
Vue.component('datetime',Datetime);
Vue.component('confirm',Confirm);
Vue.component('alert',Alert);
Vue.component('radio', Radio)
import { DatetimePlugin } from 'vux'
Vue.use(DatetimePlugin)
import  { AlertPlugin } from 'vux'
Vue.use(AlertPlugin)
import  { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)

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
