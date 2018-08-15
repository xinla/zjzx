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
		height: 0.44rem;
		position: fixed;
		top: 0;
		z-index: 99;
	}
	.headerBox {
		position: relative;
		height: 0.44rem;
		background-color: #ec414d;
	}
	.logo {
		position: absolute;
		left: 0.1rem;
		width: 1.0rem;
		height: 100%;
	}
	.logo img {
		margin-top: 0.1rem
		;
	}
	
	.issue {
		width: .5rem;
		height: 100%;
		position: absolute;
		right: 0.1rem;
		top: 0;
		z-index: 999;
		text-align: center;
		font-size: 0.14rem;
		color: #fff;
	}
	.issue .icon-dfabu {
		display: block;
		font-size: 0.16rem;
		padding-top: 0.05rem;
	}
	.search {
		width: 100%;
		height: 0.3rem;
		line-height: .3rem;
		position: relative;
		top: 0.06rem;
		padding-left: 1.2rem;
		padding-right: .6rem;
	}
	.search i {
		width: .3rem;
		height: .3rem;
		/*background-color: #ff0;*/
		position: absolute;
		top: 0.01rem;
		padding-left: 0.1rem;
		font-size: .16rem;
		color: #999;
	}
	.search input {
		width: 100%;
		height: 100%;
		padding-left: 0.3rem;
		padding-right: 0.1rem;
		background-color: #fff;
		border-radius: 0.14rem;
		font-size: 0.14rem;
	}

</style>