<template>
	<div class="prompt-blank ac">
		<i class="iconfont icon-nomsg"></i>
		<p>{{mes}}</p>

	</div>
</template>

<script>
export default{
	props:{
		mes:{
			type:String,
			default:"您想要的真相消失啦~~~"
		}
	}
}
</script>

<style lang="less">
	.prompt-blank{
		color: #999;
		font-size: .24rem;
		padding: .5rem;
		background-color: transparent;
		.iconfont{
			display: block;
			font-size: 1rem;
			margin-bottom: .2rem;
		}
	}
</style>