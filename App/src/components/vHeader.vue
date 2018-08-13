<template>
	<div class="header">
		<div class="headerBox">
			<div class="logo">
				<img src="@/assets/logo.png" alt="">
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

<style lang="css" scoped>
	.header {
		width: 100%;
		height: 4.4rem;
		position: fixed;
		top: 0;
		z-index: 99;
	}
	.headerBox {
		position: relative;
		height: 4.4rem;
		background-color: #ec414d;
	}

	.logo {
		position: absolute;
		top: 0;
		left: 1rem;
		width: 10rem;
		height: 100%;
	}
	.logo img {
		margin-top: .9rem;
	}

	.issue {
		width: 5rem;
		height: 100%;
		position: absolute;
		top: 0;
		right: 0;
		z-index: 999;
		text-align: center;
		font-size: 1.5rem;
		color: #fff;
	}

	.issue .icon-dfabu {
		display: block;
		font-size: 1.8rem;
		padding-top: .5rem;
	} 

	.search {
		width: 100%;
		height: 3rem;
		position: relative;
		top: .7rem;
		padding-left: 12rem;
		padding-right: 6rem;
	}
	.search i {
		position: absolute;
		top: .6rem;
		padding-left: .4rem;
		font-size: 2rem;
		color: #999;
	}
	.search input {
		width: 100%;
		height: 100%;
		border-radius: 16px;
		border: 1px solid #f9f9f9;
		padding-left: 2.2rem;
		padding-right: 1rem;
	}


	/*
	.search {
		width: 100%;
		height: 30px;
		position: relative;
		padding-left: 130px;
		padding-right: 60px;
		top: 7px;
	}
	.search i {
		position: absolute;
		top: 6px;
		padding-left: 8px;
		font-size: 18px;
		color: #999;
	}
	.search input {
		width: 100%;
		height: 100%;
		border-radius: 14px;
		padding-left: 35px;
		padding-right: 15px;
	}*/



</style>