<template>
	<div class="top tf ac">
		<div class="bfc-p back" @click="$emit('hrefTo')"><i class="iconfont hreficon bfc-d">
			<slot name="href">&#xe7f3;</slot></i>
		</div>
		<slot name="title">标题</slot>
		<div class="bfc-p r-nav" v-if="showNav"><slot name="nav"></slot></div>
	</div>
</template>
<script>
export default {
	props:{
		showNav:{
			type:Boolean, //'boolean' 不行
			default:false,
		}
	},
	data(){
		return{

		}
	},
}	
</script>
<style scoped>
	.top{
		font-size: 16px;
		background: #fff;
	    line-height: 50px;
	}
	.back,.r-nav{
	    color: #666;
		top: 0;
		padding: 0 5px;
	}
	.back{
		left: 0;
	}
	.r-nav{
		right: 0;
	}
	.hreficon{
		font-size: 20px;
		vertical-align: top;
	}
</style>