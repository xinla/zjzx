<template>
	<div class="search-wrap">
		<div class="search-container">
			<div class="search-box">
				<i class="iconfont search-icon">&#xeafe;</i>
				<input type="text" placeholder="请输入关键字" ref="searchInput">
			</div>
			<span class="cancle">取消</span>
		</div>
		<div class="search-key">
			<a href="javascript:void(0)">池州新闻</a>
			<a href="javascript:void(0)">池州房价</a>
			<a href="javascript:void(0)">皖南古村</a>
		</div>
		<div class="search-history">
			<div class="search-history-head">
				<span>历史记录</span>
				<i class="iconfont icon-like"></i>
			</div>
			<div class="search-history-body">
				<a href="javascript:void(0)">池州新闻</a>
				<a href="javascript:void(0)">池州新闻</a>
				<a href="javascript:void(0)">池州新闻</a>
			</div>
		</div>
		<!-- <div class="search-history">
			<span>搜索历史</span>
			<span>清空</span>
		</div>
		<span class="search-span">内容内容内容</span>
		<div class="hot-search">
			<span>热门搜索</span>
		</div>
		<span class="search-span">内容内容内容</span> -->
	</div>
</template>

<style scoped>
	.search-container {
		height: 3.5em;
		background-color: #fff;
		padding: .5em 1.25em;
	}
	.search-box {
		display: inline-block;
		width: 85%;
		height: 100%;
		position: absolute;
		background-color: #f4f5f6;
		border-radius: 0.25rem;
		border: .04em solid #e8e8e8;
		position: relative;
	}
	.search-icon {
		position: absolute;
		top: .18em;
		text-align: center;
		z-index: 999;
		height: 100%;
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
	
	.search-box input {
		width: 100%;
		height: 100%;
		padding-left: 2.2em;
		padding-right: .5em;
	}

	.cancle {
		display: inline-block;
		width: 13%;
		text-align: center;
		color: #2a90d7;
		vertical-align: middle;
	}
	[data-dpr="1"] .cancle {
		font-size: 16px;
	}
	[data-dpr="2"] .cancle {
		font-size: 32px;
	}
	[data-dpr="3"] .cancle {
		font-size: 48px;
	}


	.search-key {
		height: 3.2em;
		line-height: 3.2em;
		display: flex;
		border-top: .04em solid #e8e8e8;
		border-bottom: .04em solid #e8e8e8;
		text-align: center;
		background-color: #fff;
	}
	.search-key a {
		flex: 1;
		border-right: .04em solid #e8e8e8;
	}
	.search-key a:last-child{
		border: none;
	}


	.search-history {
		margin-top: .4em;
		background-color: #fff;
		border-top: .04em solid #e8e8e8;
		border-bottom: .04em solid #e8e8e8; 
	}
	.search-history-head {
		padding: 0 1.25em;
		height: 3.3em;
		line-height: 3.3em;
		border-bottom: .04em solid #e8e8e8; 
	}
</style>