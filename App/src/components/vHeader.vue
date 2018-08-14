<template>
	<div class="header">
		<div class="headerBox">
			<div class="logo">
				<img src="@/assets/images/logo.png" alt="">
			</div>
			<!-- <div class="search">
				<i class="iconfont icon-search"></i>
				<input type="text" placeholder="请输入搜索关键词~">
			</div>
			<div class="issue">
				<i class="iconfont icon-dfabu"></i>
				<span class="fabu">	发布</span>
			</div>  -->
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
		width: 2rem;
		height: 100%;
	}
	.logo img {
		margin-top: 0.15rem;
	}
	/*.logo {
		position: absolute;
		left: 0.71rem;
		width: 7.14rem;
		height: 100%;
	}
	.logo img {
		margin-top: 0.43rem;
	}
	.issue {
		width: 3.57rem;
		height: 100%;
		position: absolute;
		top: 0;
		right: 0;
		z-index: 999;
		text-align: center;
		font-size: 14px;
		color: #fff;
	}
	.issue .icon-dfabu {
		display: block;
		font-size: 16px;
		padding-top: 0.36rem;
	}
	.search {
		width: 100%;
		height: 2rem;
	}*/
	

/*	

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

*/

</style>