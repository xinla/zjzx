<template>
	<div class="text-wrap bfc-o">
		<img class="right" src="http://img.zcool.cn/community/0195be57cd70d90000012e7eb0dae8.jpg@1280w_1l_2o_100sh.jpg" alt="">
		<h1>test测试test测试test测试test测试test测试tes</h1>
		<p class="pub">
			<span>发布者名称</span>
			<span><var>30</var>评论</span>
			<span>30分钟前</span>
		</p>
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
		padding: 1em 0 0.5em;
	    border-bottom: 1px solid #eee;
	}
	h1{
		font-weight: normal;
		font-size: 18px
	}
	img.right{
	    float: right;
	    width: 30%;
	    margin-top: 0.5em;
	}
	[data-dpr='2'] h1{
		font-size: 36px;
	}
	[data-dpr='3'] h1{
		font-size: 54px;
	}
	.pub{
		line-height: 2em;
	    color: #999;
	}
	.img-wrap img{
		float: left;
		width: 31%;
		height: 1.4rem;
		margin: 0.5em 1% 0;
	}
</style>