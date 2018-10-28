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
import versionService from "@/service/versionService"
import messageService from '@/service/messageService'

export default {
  name: 'App',
  data() {
  	return {
  		transitionName: '',
      ifLoad:true,
      mainRoute:["member","questionAnswer","video"],
      first:"",
  	}
  },
  created(){
    setTimeout(()=>{
      this.ifLoad = false;
    },3000);
    //html font-size 
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    // document.querySelector('html').setAttribute("data-dpr",1);
    // // document.querySelector('meta[name="viewport"]').setAttribute("content","width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no");
    window.addEventListener(resizeEvt, this.subRecalc, false);
    document.addEventListener('DOMContentLoaded', this.subRecalc, false);
    //night
    if (localStorage.dayNight&&localStorage.dayNight=='night') {
        let head = document.getElementsByTagName("head")[0];
        let link = document.createElement('link');
        link.setAttribute('rel','stylesheet');
        link.setAttribute('id','night');
        link.setAttribute('href','./static/night.css');
        head.appendChild(link);
    }

  },
  mounted(){
    //监测物理返回键
    try{
      let _this = this;
      document.addEventListener('plusready', function() {
        plus.key.addEventListener('backbutton', function() {
          if (_this.mainRoute.includes(_this.$route.name)) {
            _this.$Tool.goPage({name:"home",replace:true,});
          }else if(_this.$route.name == "home") {
            //首次按键，提示‘再按一次退出应用’
            if (!_this.first) {
                _this.first = new Date().getTime();
                _this.$vux.toast.show({
                  type:"text",
                  time:1000,                
                  position:"middle",
                  text: '再按一次退出直击真相',
                  width:"auto",
                });
                setTimeout(() => {
                    _this.first = null;
                }, 1000);
            } else if (new Date().getTime() - _this.first < 1500) {
                plus.runtime.quit();
            }
          }else{
            _this.$Tool.goBack();
          }
        },false);

        //版本更新检测
        function appUpdate(){
          plus.runtime.getProperty(plus.runtime.appid, function (info) {
            let version = info.version;
            _this.$store.dispatch("setCurrentVersion", version);
            versionService.compareVersion(version,(data)=>{
              if (data && data.status == "success") {
                if (data.result.isnew == 0) {
                  _this.$store.dispatch("setNewVersion",1);
                  _this.$vux.confirm.show({
                    title:"升级提示",
                    content:`发现新版本${data.result.versionnum}`,
                    confirmText:"立即体验",
                    cancelText:"忍痛放弃",
                    onConfirm () {
                      setTimeout(()=>{
                        _this.$vux.toast.show({
                          type:"text",
                          time:1000,
                          position:"middle",
                          text:"开始拼命为您下载...",
                          width:"auto",
                        },1000);                             
                      })
                      dtask.start();
                      let dtask = plus.downloader.createDownload(data.result.newlink, {
                      }, function (down, status) {
                          if (status == 200) {
                              let path = down.filename;//下载apk
                              plus.runtime.install(path); // 自动安装apk文件
                              // _this.$store.dispatch("setNewVersion",0);
                          } else {
                              _this.$vux.alert.show({
                                title:'版本更新失败' + status,
                              });
                          }
                      });
                    }
                  });
                }                  
              }
            });          
         });          
        }
        appUpdate();
      },false);  
    }catch(e){

    }
    //获取是否有最新消息
    if (localStorage.id) {
      messageService.getMessageCount(data=>{
        if (data && data.status == "success") {
          this.$store.commit("setNewMes",data.count);
        }
      })
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
  .status-bar{
    padding-top: 22px;
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
