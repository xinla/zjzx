<template>
	<div class="top-bar-box">
		<div class="top-bar-head">
			<i class="iconfont">&#xe68c;</i>
		</div>
		<div class="top-bar-body">
			<div class="top-mychannel top-body-head clearfix">
				<h2>我的频道</h2>
				<span>点击进入频道</span>
				<a href="javascript:void(0)">编辑</a>
			</div>
			<div class="top-mychannel-content">
				<ul class="top-mychannel-list clearfix">
					<li class="top-mychannel-item">关注</li>
					<li class="top-mychannel-item">推荐</li>
					<li class="top-mychannel-item">热点</li>
					<li class="top-mychannel-item">池州</li>
					<li class="top-mychannel-item">视频</li>
					<li class="top-mychannel-item">图片</li>
					<li class="top-mychannel-item">娱乐</li>
					<li class="top-mychannel-item">问答</li>
					<li class="top-mychannel-item">科技</li>
					<li class="top-mychannel-item">懂车帝</li>
					<li class="top-mychannel-item">财经</li>
					<li class="top-mychannel-item">军事</li>
					<li class="top-mychannel-item">体育</li>
					<li class="top-mychannel-item">国际</li>
					<li class="top-mychannel-item">健康</li>
					<li class="top-mychannel-item">房产</li>
					<li class="top-mychannel-item">小视频</li>
					<li class="top-mychannel-item">新时代</li>
					<li class="top-mychannel-item">时尚</li>
				</ul>
			</div>
		</div>
	</div>
</template>


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

	.top-mychannel-content li {
		float: left;
		width: 23%;
		height: 2.9em;
		line-height: 2.9em;
		text-align: center;
		background-color: #f4f5f6;
		margin-right: 2.6%;
		margin-bottom: 2.6%;
	}
	.top-mychannel-content li:nth-child(4n+4) {
		margin-right: 0;
	}
</style>