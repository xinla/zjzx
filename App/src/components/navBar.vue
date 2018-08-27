<template>
	<div class="footer-nav">
		<div :class="['footer-item',{current:navIndex==0}]" @click="setCurrent(0)">
			<router-link to="/" exact>
				<i class="iconfont icon-index footer-icon"></i>
				<span class="footer-text">首页</span>
			</router-link>
		</div>
		<div :class="['footer-item',{current:navIndex==1}]" @click="setCurrent(1)">
			<router-link :to="{path:'/mes'}" exact>
				<i class="iconfont icon-xiaoxi footer-icon"></i>
				<span class="footer-text">消息</span>
			</router-link>
		</div>
		<div :class="['footer-item',{current:navIndex==2}]" @click="setCurrent(2)">
			<router-link :to="{path:'/vie'}" exact>
				<i class="iconfont icon-video footer-icon"></i>
				<span class="footer-text">视频</span>
			</router-link>
		</div>
		<div :class="['footer-item',{current:navIndex==3}]" @click="setCurrent(3)">
			<router-link :to="{path:'/member'}" exact>				
				<i class="iconfont icon-wode footer-icon"></i>
				<span class="footer-text">我的</span>
			</router-link>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return{
			navIndex:0,
		}
	},
	mounted(){
		if (localStorage.navIndex) {
			this.navIndex=localStorage.navIndex;
		}
	},
	methods:{
		setCurrent(whi){
			localStorage.navIndex=whi;
			this.navIndex=whi;
		}
	}
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