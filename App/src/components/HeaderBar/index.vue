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
		left: 0.1rem;
		width: 2rem;
		height: 100%;
	}
	.logo img {
		margin-top: 0.15rem;
	}
	
	.issue {
		width: 1rem;
		height: 100%;
		position: absolute;
		right: 0.1rem;
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
		height: 0.56rem;
		line-height: .56rem;
		position: relative;
		top: 0.16rem;
		padding-left: 2.3rem;
		padding-right: 1.1rem;
	}
	.search i {
		position: absolute;
		padding-left: 0.18rem;
		line-height: .62rem;
		font-size: .32rem;
		color: #999;
	}
	.search input {
		width: 100%;
		height: 100%;
		padding-left: 0.6rem;
		padding-right: 0.15rem;
		background-color: #fff;
		border-radius: 0.24rem;
		font-size: 0.28rem;
	}

</style>