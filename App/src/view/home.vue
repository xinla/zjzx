<!-- 首页新闻页面 -->
<template>
	<div>
		<z-header></z-header>
		<z-tab></z-tab>
		<div class="main">
			<pureText></pureText>
			<pureText></pureText>
		</div>
		<z-nav></z-nav>
		<!-- <z-swiper></z-swiper> -->
	</div>
</template>
 
<script>
	// import '@/assets/js/rem.js'	
	import zHeader from '@/components/headerBar/index'
	import zTab from '@/components/tabBar/index'
	// import zSwiper from '@/components/Swiper/index'
	import zNav from '@/components/navBar/index'
	import config from '@/lib/config/config'
	import homeService from '@/service/homeService'
	import pureText from '@/components/news/pureText'

	export default {
		components:{
			zHeader,
			zTab,
			// zSwiper
			pureText,
			zNav
		},
		created () {
			// debugger;
			// console.log(homeService);
				homeService.use(this.$http).test(function(data){
					console.log(data);
			})			
		}
	}
</script>
<style scoped>
	.main{
		padding:6em 0.5em 3.5em;
		height: 100%;
	}
</style>