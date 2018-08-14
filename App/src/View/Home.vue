<!-- 首页新闻页面 -->
<template>
	<div>
		<z-header></z-header>
		<z-nav></z-nav>
	</div>
</template>
 
<script>
	import zHeader from '@/components/HeaderBar/index'
	import zNav from '@/components/NavBar/index'
	export default {
		components:{
			zHeader,
			zNav, 
		}
	}
</script>
