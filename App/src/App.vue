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
  mounted(){
    setTimeout(()=>{
      this.ifLoad = false;
    },3000);
    //html font-size 
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    document.querySelector('html').setAttribute("data-dpr",1);
    // document.querySelector('meta[name="viewport"]').setAttribute("content","width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no");
    window.addEventListener(resizeEvt, this.subRecalc, false);
    document.addEventListener('DOMContentLoaded', this.subRecalc, false);
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
                  text: '再按一次退出应用',
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
        //@ifmanual:是否手动更新
        function appUpdate(ifmanual){
          plus.runtime.getProperty(plus.runtime.appid, function (info) {
            let version = info.version;
            versionService.compareVersion(version,data=>{
              if (data && data.status == "success") {
                if (!data.result.version) {
                  _this.$store.state.newVersion = 1;
                  _this.$vux.confirm.show({
                    title:"升级提示",
                    content:`发现新版本${data.versionnum}`,
                    onConfirm () {
                      let dtask = plus.downloader.createDownload(data.newlink, {
                      }, function (down, status) {
                          if (status == 200) {
                              let path = down.filename;//下载apk
                              plus.runtime.install(path); // 自动安装apk文件
                              localStorage.ifNewVersion = false;
                          } else {
                              _this.$vux.alert.show({
                                title:'版本更新失败' + status,
                              });
                          }
                      });
                      dtask.start();
                    }
                  });
                }else if(ifmanual){
                  _this.$vux.alert.show({
                    title:'当前已是最新版本',
                  });
                }                  
              }else if(ifmanual){
                _this.$vux.alert.show({
                  title:'网络异常，请稍候再试',
                });
              }
            });          
         });          
        }
        appUpdate();
      },false);  
    }catch(err){

    }
    //获取是否有最新消息
    if (localStorage.id) {
      messageService.getMessageCount(data=>{
        if (data && data.status == "success") {
          this.$store.state.newMes = data.count;
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
