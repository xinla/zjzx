<template>
	<div class="top bfc-o tf ac">
		<button type="button" class="iconfont fl back" @click="goback()">&#xe7f3;</button>
		<slot>标题</slot>
		<div class="fr"><button class="iconfont nav-icon">&#xe7fd;</button></div>
	</div>
</template>
<script>
export default {
	data(){
		return{

		}
	},
	methods:{
		goback(){
			window.history.go(-1);
		}
	}
}	
</script>
<style scoped>
	.top{
		font-size: 16px;
		background: #fff;
	    line-height: 50px;
	}
	.back,.nav-icon{
		width: 50px;
	    font-size: 20px;
	    line-height: 50px;
	    color: #666;
	    background: transparent;
	}
	.nav-icon{
		font-size: 40px;
	}
</style>