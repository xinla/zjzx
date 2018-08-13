<template>
  <div id="app">
  	<transition :name="transitionName">
  		<router-view class="routerView" :transitionName="transitionName"></router-view>
  	</transition>

  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
  	return {
  		transitionName: '',
  	}
  },
  watch: {
  	//监听路由
  	'$route'(to,from) {
  		//前进后退转场动画
  		const toDepth = to.path.split('/').length;
  		const fromDepth = from.path.split('/').length;

  		if(toDepth == fromDepth) {
  			//同级
  			this.transitionName ='';
  		} else if(toDepth < fromDepth) {
  			//后退
  			this.transitionName = 'slide-right';
  		} else {
  			//前进
  			this.transitionName = 'slide-left';
  		}
  	}
  }

}
</script>
<style>
  #app {
    width: 100%;
    height: 100%;
  }

</style>
