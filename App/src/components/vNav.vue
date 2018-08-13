<template>
	<div class="nav-content">
		<div class="nav">
			<div class="channel">
				<a href="###" v-for="item in navtits">{{item}}</a>
			</div>
			<div class="addChannel">
				<i class="iconfont icon-add"></i>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				navtits:["头条","新闻", "财经", "体育", "娱乐", "军事", "教育", "科技", "NBA", "股票", "星座", "女性", "健康", "育儿"]
			}
		},
	}
</script>

<style lang="css" scoped>
	.nav-content {
		margin-top: 44px;
	}

	.nav {
		width: 100%;
		height: 33px;
		line-height: 33px;
		position: fixed;
		z-index: 99;
		background-color: #fff;
		border-bottom: 1px solid #e8e8e8;
		font-size: 14px;
	}

	.channel {
		display: inline-block;
		overflow-x: scroll;
		-webkit-overflow-scrolling: touch;
		flex: 1;
		display: flex;
		align-items: center;
		-webkit-tap-highlight-color: rgba(0,0,0,0);
	}
	.channel::-webkit-scrollbar {
		height: 0;
	}
	.channel a {
		white-space: nowrap;
		display: inline-block;
		color: #505050;
		text-decoration: none;
		margin-left: 10px;
	 	-webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
	}
	.addChannel {
		display: inline-block;
		width: 10%;
		height: 32px;
		border-left: 1px solid #ccc;
		border-bottom: 1px solid #e8e8e8;
		position: absolute;
		top: 0;
		right: 0;
		background-color: #fff;
		text-align: center;
	}
	.addChannel i {
		font-size: 18px;
		color: #c03;
	}
</style>