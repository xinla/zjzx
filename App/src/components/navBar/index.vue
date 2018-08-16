<template>
	<div class="footer-nav">
		<div class="footer-item">
			<i class="iconfont icon-index footer-icon"></i>
			<span class="footer-text">首页</span>
		</div>
		<div class="footer-item">
			<i class="iconfont icon-xiaoxi footer-icon"></i>
			<span class="footer-text">消息</span>
		</div>
		<div class="footer-item">
			<i class="iconfont icon-video footer-icon"></i>
			<span class="footer-text">视频</span>
		</div>
		<div class="footer-item">
			<i class="iconfont icon-wode footer-icon"></i>
			<span class="footer-text">我的</span>
		</div>
	</div>
</template>
<style lang="css" scoped>
	.footer-nav {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		text-align: center;
		overflow: hidden;
		background-color: #fff;
		box-shadow: 0 0 0.4em  #ccc;
	}
	.footer-item {
		float: left;
		width: 25%;
		height: 100%;
		color: #999;
	}
	.footer-icon {
	    display: block;
	    font-size: 1.5em;
	    line-height: 1.5em;
	}
</style>