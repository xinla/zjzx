<template>
	<div>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<div class="footer-nav">
			<div class="footer-item">
				<router-link to="/home" exact>
					<i class="iconfont icon-index footer-icon"></i>
					<span class="footer-text">首页</span>
				</router-link>
			</div>
			<div class="footer-item">
				<router-link :to="{path:'/mes'}" exact>
					<i class="iconfont icon-xiaoxi footer-icon"></i>
					<span class="footer-text">消息</span>
				</router-link>
			</div>
			<div class="footer-item">
				<router-link :to="{path:'/vie'}" exact>
					<i class="iconfont icon-video footer-icon"></i>
					<span class="footer-text">视频</span>
				</router-link>
			</div>
			<div class="footer-item">
				<router-link :to="{path:'/member'}" exact>				
					<i class="iconfont icon-wode footer-icon"></i>
					<span class="footer-text">我的</span>
				</router-link>
			</div>
		</div>	
	</div>
</template>
<script>
export default{
}
</script>
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
	.footer-item a.router-link-active{
		color: #f40;
	}
</style>