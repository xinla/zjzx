<template>
	<div class="text-wrap bfc-o">
		<router-link :to="{ name:'detail'}">
		<h1>test测试test测试test测试test测试test测试test测试test测试test测试test测试</h1>
		<div class="img-wrap bfc-o">
			<img src="http://img.zcool.cn/community/0195be57cd70d90000012e7eb0dae8.jpg@1280w_1l_2o_100sh.jpg" alt="">
			<img src="http://img.zcool.cn/community/0195be57cd70d90000012e7eb0dae8.jpg@1280w_1l_2o_100sh.jpg" alt="">
			<img src="http://img.zcool.cn/community/0195be57cd70d90000012e7eb0dae8.jpg@1280w_1l_2o_100sh.jpg" alt="">
		</div>
		<p class="pub">
			<span>发布者名称</span>
			<span><var>30</var>评论</span>
			<span>30分钟前</span>
		</p>
		</router-link>
	</div>
</template>
<script>
export default {
	props:["title",],
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
		max-width: 200px;
		margin: 0.5em 1% 0;
	}
</style>