<template>
	<div class="header">
		<div class="logo">
			<img src="@/assets/images/logo.png" alt="">
		</div>
		<div class="search">
			<input type="text" class="" placeholder="请输入搜索关键词~">
			<i class="iconfont">&#xeafe;</i>
		</div>
		<div class="release">
			<i class="iconfont" @click="showRelease()">&#xe7f9;</i>
			<ul class="quick-nav" v-if="ifRelease">
				<router-link :to="{path:'/memDetail/release',query:{title:'发布图文'}}" tag="li" class="quick-nav-ietm">发布图文</router-link>
				<router-link :to="{path:'/memDetail/release',query:{title:'发布视频'}}" tag="li" class="quick-nav-ietm">发布视频</router-link>
				<router-link :to="{path:'/memDetail/release',query:{title:'发布图文'}}" tag="li" class="quick-nav-ietm">发起讨论</router-link>
			</ul>
		</div> 
	</div>
</template>
<script>
	export default {
		data(){
			return {
				ifRelease:false,
			}
		},
		methods:{
			showRelease(){
				this.ifRelease=!this.ifRelease;
			}
		}

	}
</script>

<style scoped>
	.header {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 9999;
		background-color: #ec414d;
		line-height: 3.5em;
	}
	.header>div{
		float: left;
		height: 100%;
		text-align:center;
		position: relative;
	}
	.logo{
		width: 20%;
	}
	.logo img {
		width: 90%;
	}
	.release {
		width: 10%;
	}
	.iconfont{
		vertical-align: top;
	}
	.release i{
		color: #fff;
	}
	[data-dpr="1"] .iconfont {
		font-size: 24px;
	}
	[data-dpr="2"] .iconfont {
		font-size: 48px;
	}
	[data-dpr="3"] .iconfont {
		font-size: 72px;
	}
	.search {
		width: 70%;
	}
	.search i {
		color: #999;
		position: absolute;
		top: 0;
		right: 0;
	}
	.search input {
	    width: 100%;
	    background: #fff;
	    line-height: 2.3em;
	    border-radius: 0.2rem;
	    vertical-align: baseline;
        text-indent: 2%;
	}
	.quick-nav {
	    position: absolute;
	    width: 200%;
	    right: 0;
	    background: #222;
	    line-height: 2em;
	    border-radius: 0 0 .5em .5em;
	    color: #fff;
	}
</style>