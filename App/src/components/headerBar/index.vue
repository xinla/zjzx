<template>
	<div class="header">
		<div class="headerBox">
			<div class="logo">
				<img src="@/assets/images/logo.png" alt="">
			</div>
			<div class="search">
				<i class="iconfont icon-search"></i>
				<input type="text" placeholder="请输入搜索关键词~">
			</div>
			<div class="issue">
				<i class="iconfont icon-dfabu"></i>
				<span class="fabu">	发布</span>
			</div> 
		</div>
	</div>
</template>
<script>
	export default {

	}
</script>

<style scoped>
	.header {
		width: 100%;
		height: 0.88rem;
		position: fixed;
		top: 0;
		z-index: 99;
	}
	.headerBox {
		position: relative;
		height: 0.88rem;
		background-color: #ec414d;
	}
	.logo {
		position: absolute;
		left: 0.2rem;
		width: 2.0rem;
		height: 100%;
	}
	.logo img {
		margin-top: 0.2rem
		;
	}
	
	.issue {
		width: 1rem;
		height: 100%;
		position: absolute;
		right: 0.2rem;
		top: 0;
		z-index: 999;
		text-align: center;
		font-size: 0.28rem;
		color: #fff;
	}
	.issue .icon-dfabu {
		display: block;
		font-size: 0.32rem;
		padding-top: 0.1rem;
	}
	.search {
		width: 100%;
		height: 0.6rem;
		line-height: .6rem;
		position: relative;
		top: 0.12rem;
		padding-left: 2.4rem;
		padding-right: 1.2rem;
	}
	.search i {
		width: .6rem;
		height: .6rem;
		/*background-color: #ff0;*/
		position: absolute;
		top: 0.02rem;
		padding-left: 0.2rem;
		font-size: .32rem;
		color: #999;
	}
	.search input {
		width: 100%;
		height: 100%;
		padding-left: 0.6rem;
		padding-right: 0.2rem;
		background-color: #fff;
		border-radius: 0.28rem;
		font-size: 0.20rem;
	}

</style>