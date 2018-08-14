<!-- 首页新闻页面 -->
<template>
	<div>
		<z-header></z-header>
		<z-tab></z-tab>
		<z-nav></z-nav>
		<!-- <z-swiper></z-swiper> -->
	</div>
</template>
 
<script>
	import zHeader from '@/components/headerBar/index'
	import zTab from '@/components/tabBar/index'
	// import zSwiper from '@/components/Swiper/index'
	import zNav from '@/components/navBar/index'
	export default {
		components:{
			zHeader,
			zTab,
			// zSwiper
			zNav
		}
	}
</script>
