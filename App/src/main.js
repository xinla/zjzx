import Vue from 'vue'
import App from './App'

import $ from 'jquery'
window.$ = $;

//es6 promise兼容
// import 'es6-promise/auto'


import router from './router'
import store from './store/index'

// import 'animate.css/animate.min.css'

import animate from 'animate.css'
//css样式
import './assets/styles/reset.css'
import './assets/styles/iconfont.css'

//服务端请求
import Request from './assets/request/axiosServer'
// Vue.use(Request);

//二维码生成插件
import QRCode from 'qrcode'

//引用工具函数
import localforage from './assets/common/localforage'
Vue.use(localforage);

//引用功能函数
import Tool from './assets/common/methods'
Vue.use(Tool);

//数据
import axios from 'axios'
Vue.prototype.$http = axios

// 预览大图
// import preview from 'vue-photo-preview'
// import 'vue-photo-preview/dist/skin.css'
// Vue.use(preview);

import vuePicturePreview from 'vue-picture-preview'
Vue.use(vuePicturePreview)


//Loading插件
import {Loading,LoadText} from '@/plugins/loading'
Vue.use(Loading);
// Vue.use(LoadText);
//通用top
import Top from '@/components/common/top'
Vue.component('Top',Top);
import LoadingMain from '@/components/common/loadingMain'
Vue.component('LoadingMain',LoadingMain);
//通用空白页提示
import PromptBlank from '@/components/common/promptBlank'
Vue.component('PromptBlank',PromptBlank);
//单文章视图组件
import multIT from '@/components/common/multIT'
Vue.component('multIT',multIT);
//单问答视图组件
import question from '@/components/common/question'
Vue.component('question',question);
//Confirm插件
// import Confirm from '@/plugins/confirm'
// Vue.use(Confirm);

//BottomPopup插件
// import BottomPopup from '@/plugins/BottomPopup'
// Vue.use(BottomPopup);

// 视频插件
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

//Swiper组件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css';
Vue.use(VueAwesomeSwiper);

//vux
import{ Cell,Group,Msg,Datetime,Confirm,Alert,Radio,Tab,TabItem,LoadMore,Badge,InlineLoading } from 'vux';
Vue.component('group', Group);
Vue.component('cell', Cell);
Vue.component('msg', Msg);
Vue.component('datetime',Datetime);
Vue.component('confirm',Confirm);
Vue.component('alert',Alert);
Vue.component('radio', Radio)
Vue.component('tab', Tab)
Vue.component('tab-item', TabItem)
Vue.component('load-more', LoadMore)
Vue.component('badge', Badge)
Vue.component('inline-loading', InlineLoading)
import { DatetimePlugin,AlertPlugin,ConfirmPlugin,LoadingPlugin,ToastPlugin  } from 'vux'
Vue.use(DatetimePlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)

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

// router.beforeEach((to, from, next) => {
//   next()
//   // console.log("bb")

// })
// router.afterEach((to, from) => {
//   // console.log("aa")
// })




