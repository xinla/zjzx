<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive v-if="!$route.meta.keepAlive">
        <router-view  class="router-view-app"></router-view> 
      </keep-alive>      
      <router-view v-else class="router-view-app"></router-view> 
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
  	return {
  		transitionName: '',
      ifLoad:true,
  	}
  },
  mounted(){
    setTimeout(()=>{
      this.ifLoad = false;
    },3000);
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    document.querySelector('html').setAttribute("data-dpr",1);
    // document.querySelector('meta[name="viewport"]').setAttribute("content","width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no");
    window.addEventListener(resizeEvt, this.subRecalc, false);
    document.addEventListener('DOMContentLoaded', this.subRecalc, false);
    try{
      var webview = plus.webview.currentWebview();
      plus.key.addEventListener('backbutton', function() {
        if (GoTruth.$route) {}
          webview.canBack(function(e) {
              if(e.canBack) {
                  webview.back();             
              } else {
                  //webview.close(); //hide,quit
                  //plus.runtime.quit();
                  //首页返回键处理
                  //处理逻辑：1秒内，连续两次按返回键，则退出应用；
                  var first = null;
                  plus.key.addEventListener('backbutton', function() {
                      //首次按键，提示‘再按一次退出应用’
                      if (!first) {
                          first = new Date().getTime();
                          console.log('再按一次退出应用');
                          setTimeout(function() {
                              first = null;
                          }, 1000);
                      } else {
                          if (new Date().getTime() - first < 1500) {
                              plus.runtime.quit();
                          }
                      }
                  }, false);
              }
          })
      });     
    }catch(err){

    }
  },
  methods:{
    subRecalc(){
      var docEl=document.documentElement,
      clientWidth = Math.min( window.innerWidth , docEl.clientWidth );
      docEl.style.fontSize = ( clientWidth / 750 * 100)+"px";
    }
  },
  watch: {
  	//监听路由
  	$route(to,from) {
  		// 前进后退转场动画
      if (this.$router['isBack'] == undefined) {
        this.$router['isBack'] = false;return;
      }
      this.transitionName = this.$router['isBack'] ? 'slide-right' : 'slide-left';
      this.$router['isBack'] = false;
  	}
  },
}
</script>
<style>

  html,body{
    background-color: #f4f5f6;
    width: 100%;
    height: 100%;
  }
  html {overflow-x: hidden;height: 100%;font-size: 50px;}
  body{
    font-size: .28em;
    line-height: 1;
    -webkit-overflow-scrolling:touch;
  }
  #app,.router-view-app {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }

.router-view-app {
  position: absolute;
  transition: all .3s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  transform: translate(200px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  transform: translate(-200px, 0);
}
/*添加vux toast 行高*/
.weui-toast_text .weui-toast__content{
  line-height: 22px;
}
</style>
