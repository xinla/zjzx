<template>
	<div class="text-wrap">
		<h1>test测试test测试test测试test测试test测试test测试test测试test测试test测试</h1>
		<p class="pub">
			<span>发布者名称</span>
			<span><var>30</var>评论</span>
			<span>30分钟前</span>
		</p>
		<div class="img-wrap">
			
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return {

		}
	}
}
</script>
<style scoped>
	.text-wrap{
		padding: 1em 0;
	    border-bottom: 1px solid #eee;
	}
	h1{
		font-weight: normal;
		font-size: 18px
	}
	[data-dpr='2'] h1{

	}
	.pub{
		line-height: 1.5em;
	    color: #999;
	}
</style>