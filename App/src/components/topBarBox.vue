<template>
	<div class="top-bar-box">
		<div class="top-bar-head">
			<i class="iconfont" @click="goback()">&#xe68c;</i>
		</div>
		<div class="top-bar-body">
			<div class="top-mychannel clearfix">
				<h2>我的频道</h2>
				<span>点击进入频道</span>
				<a href="javascript:void(0)">编辑</a>
			</div>
			<div class="top-mychannel-content">
				<ul class="top-mychannel-list clearfix">
					<li class="top-mychannel-item" v-for="(item,index) in newList">{{item.title}}</li>
				</ul>
			</div>
			<div class="top-channel-tuijian">
				<h2>频道推荐</h2>
				<span>点击添加频道</span>
			</div>
			<div class="top-channel-content">
				<ul class="top-channel-list clearfix">
					<li v-for="(item,index) in newList"><span>+</span>{{item.title}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return{
				newList:[
					{title: '推荐', id: 0},
				    {title: '视频', id: 1},
				    {title: '热点', id: 2},
				    {title: '社会', id: 3},
				    {title: '娱乐', id: 4},
				    {title: '军事', id: 5},
				    {title: '科技', id: 6},
				    {title: '汽车', id: 7},
				    {title: '体育', id: 8},
				    {title: '财经', id: 9},
				    {title: '国际', id: 10},
				    {title: '时尚', id: 11},
				    {title: '游戏', id: 12},
				    {title: '旅游', id: 13},
				    {title: '历史', id: 14},
				    {title: '探索', id: 15},
				    {title: '美食', id: 16},
				    {title: '育儿', id: 17},
				    {title: '养生', id: 18},
				    {title: '故事', id: 19},
				    {title: '美文', id: 20}
				]
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
	[data-dpr="1"] .iconfont {
		font-size: 24px;
	}
	[data-dpr="2"] .iconfont {
		font-size: 48px;
	}
	[data-dpr="3"] .iconfont {
		font-size: 72px;
	}
	.top-bar-box {
		height: auto;
		border-radius: .36em .36em 0 0;
		background-color: #fff;
		
	}
	.top-bar-head {
		width: 100%;
		height: 3em;
		line-height: 3em;
		font-weight: 600;
		padding: 0 .7em;
		border-bottom: .04em solid #e8e8e8;
	}
	.top-bar-body {
		padding: 0 .7em;
	}

	.top-mychannel {
		width: 100%;
		height: 2em;
		line-height: 2em;
		margin: .5em 0;
	}
	.top-mychannel h2{
		float: left;
		display: inline-block;
	}

	[data-dpr="1"] h2 {
		font-size: 16px;
	}
	[data-dpr="2"] h2 {
		font-size: 32px;
	}
	[data-dpr="3"] h2 {
		font-size: 48px;
	}
	[data-dpr="1"] span {
		font-size: 14px;
	}
	[data-dpr="2"] span {
		font-size: 24px;
	}
	[data-dpr="3"] span {
		font-size: 32px;
	}

	.top-mychannel span {
		float: left;
		color: #999;
		margin-left: .8em;
	}
	.top-mychannel a {
		width: 3.4em;
		height: 100%;
		text-align: center;
		float: right;
		border: .04em solid #f85b5b;
		background-color: #fff;
		color: #f85b5b;
		border-radius: .5em;
	}

	.top-mychannel-content li,
	.top-channel-list li{
		float: left;
		width: 23%;
		height: 2.9em;
		line-height: 2.9em;
		text-align: center;
		background-color: #f4f5f6;
		margin-right: 2.6%;
		margin-bottom: 2.6%;
	}
	.top-mychannel-content li:nth-child(4n+4),
	.top-channel-list li:nth-child(4n+4) {
		margin-right: 0;
	}
	.top-channel-tuijian {
		margin: .5em 0;
		height: 2em;
	}
	.top-channel-tuijian h2 {
		display: inline-block;
	}
	.top-channel-tuijian span {
		color: #999;
	}

	.top-channel-list li{
		text-align: center;
		background-color: #fff;
		 box-shadow:.07em -0.03em .4em .2em #f1f1f1;
		border-radius: .3em;
	}
</style>