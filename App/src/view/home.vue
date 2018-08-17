<!-- 首页新闻页面 -->
<template>
	<div>
		<z-header></z-header>
		<z-tab></z-tab>
		<div class="main">
			<multIT></multIT>
			<multIT></multIT>
			<smaIVT></smaIVT>
			<bigIVT></bigIVT>
		</div>
		<z-nav></z-nav>
		<!-- <z-swiper></z-swiper> -->
	</div>
</template>
 
<script>
	import '@/assets/js/rem.js'	
	import zHeader from '@/components/headerBar/index'
	import zTab from '@/components/tabBar/index'
	// import zSwiper from '@/components/Swiper/index'
	import zNav from '@/components/navBar/index'
	import config from '@/lib/config/config'
	import homeService from '@/service/homeService'
	import multIT from '@/components/news/multIT'
	import smaIVT from '@/components/news/smaIVT'
	import bigIVT from '@/components/news/bigIVT'

	export default {
		components:{
			zHeader,
			zTab,
			// zSwiper
			multIT,
			smaIVT,
			bigIVT,
			zNav
		},
		created () {
			// debugger;
			// console.log(homeService);
				homeService.use(this.$http).test(function(data){
					console.log(data);
			})			
		},
		// destroy(){
		// 	window.removeEventListener(resizeEvt, recalc, false);
  //         document.removeEventListener('DOMContentLoaded', recalc, false);
		// }
	}
</script>
<style scoped>
	.main{
		padding:6em 0.5em 3.5em;
		height: 100%;
	}
</style>