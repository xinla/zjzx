<template>
	<div class="top tf ac">
		<button type="button" class="iconfont back" @click="goback()">&#xe7f3;</button>
		<slot name="title">标题</slot>
		<div class="bfc-p r-nav"><slot name="nav"></slot></div>
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
	.back{
		position: absolute;
		left: 0;
		width: 30px;
	    font-size: 20px;
	    line-height: 50px;
	    color: #666;
	    background: transparent;
	}
	.r-nav{
		right: 0;
		top: 0;
		width: 30px;
	}
</style>