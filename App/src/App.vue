<template>
  <div id="app">
    <loading v-show="ifLoad"></loading>
      <router-view class="routerView"></router-view>
    <<!-- transition :name="transitionName">
    </transition> -->
  </div>
</template>

<script>
import loading from '@/components/common/loadingMain'

export default {
  name: 'App',
  components:{
    loading,
  },
  data() {
  	return {
  		transitionName: '',
      ifLoad:false,
  	}
  },
  mounted(){
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    document.querySelector('html').setAttribute("data-dpr",1);
    document.querySelector('meta[name="viewport"]').setAttribute("content","width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no");
    window.addEventListener(resizeEvt, this.subRecalc, false);
    document.addEventListener('DOMContentLoaded', this.subRecalc, false);
  },
  methods:{
    subRecalc(){
      var docEl=document.documentElement,
      clientWidth = Math.min( window.innerWidth , docEl.clientWidth );
      docEl.style.fontSize= ( clientWidth / 750 * 100)+"px";
    }
  },
  watch: {
  	//监听路由
  	// '$route'(to,from) {
  	// 	//前进后退转场动画
  	// 	const toDepth = to.path.split('/').length;
  	// 	const fromDepth = from.path.split('/').length;

  	// 	if(toDepth == fromDepth) {
  	// 		//同级
  	// 		this.transitionName ='';
  	// 	} else if(toDepth < fromDepth) {
  	// 		//后退
  	// 		this.transitionName = 'slide-right';
  	// 	} else {
  	// 		//前进
  	// 		this.transitionName = 'slide-left';
  	// 	}
  	// }
    localStorage(){
      // console.log(this.ifLoad)
      // parseInt(localStorage.ifLoading)
      this.ifLoad = parseInt(localStorage.ifLoading);
    }
  },
}
</script>
<style>
  html,body{
    width: 100%;
    height: 100%;
    -webkit-text-size-adjust: 100% !important;
  }

  body{
    -webkit-overflow-scrolling:touch;
  }

  body::before {
    width: 100%;
    height: 100%;
    content: '';
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
  }


  #app,.routerView {
    width: 100%;
    height: 100%;
    /*overflow: hidden;*/
  }

</style>
