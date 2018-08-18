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
			<a href="javascript:void(0)" v-for="(item,index) in keyList ">{{item}}</a>
		</div>
		<div class="search-history">
			<div class="search-head clearfix">
				<span class="fl">历史记录</span>
				<i class="iconfont fr">&#xe646;</i>
			</div>
			<div class="search-body">
				<ul class="search-list clearfix">
					<li v-for="item in historyList"><a href="javascript:void(0)" >{{item.historytext}}</a></li>
				</ul>
			
			</div>
		</div>

		<div class="search-history">
			<div class="search-head clearfix">
				<span class="fl">猜你想搜的</span>
				<i class="iconfont fr">&#xea2a;</i>
			</div>
			<div class="search-body">
				<ul class="search-list clearfix">
					<li v-for="item in guessList"><a href="javascript:void(0)">{{item.guesstext}}</a></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				keyList: ['关键词1','关键词2','关键词3'],
				historyList:[
					{historytext:'历史记录1'},
					{historytext:'历史记录2'},
					{historytext:'历史记录3'},
					{historytext:'历史记录4'},
				],
				guessList: [
					{guesstext: '搜你想搜的1'},
					{guesstext: '搜你想搜的2'},
					{guesstext: '搜你想搜的3'},
					{guesstext: '搜你想搜的4'},
				]
			}
		}
	}
</script>
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
	.search-wrap .iconfont {
		color: #999;
	}
	[data-dpr="1"] .iconfont {
		font-size: 14px;
	}
	[data-dpr="2"] .iconfont {
		font-size: 28px;
	}
	[data-dpr="3"] .iconfont {
		font-size: 42px;
	}

	[data-dpr="1"] .search-icon {
		font-size: 24px;
	}
	[data-dpr="2"] .search-icon {
		font-size: 48px;
	}
	[data-dpr="3"] .search-icon {
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
		font-size: 18px;
	}
	[data-dpr="2"] .cancle {
		font-size: 36px;
	}
	[data-dpr="3"] .cancle {
		font-size: 54px;
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
	[data-dpr="1"] .search-key a {
		font-size: 16px;
	}
	[data-dpr="2"] .search-key a {
		font-size: 32px;
	}
	[data-dpr="3"] .search-key a {
		font-size: 48px;
	}


	.search-history {
		margin-top: .4em;
		background-color: #fff;
		border-top: .04em solid #e8e8e8;
		border-bottom: .04em solid #e8e8e8; 
	}
	.search-head,
	.search-body {
		padding: 0 1.25em;
		height: 3.3em;
		line-height: 3.3em;
		border-bottom: .04em solid #e8e8e8; 
	}
	.search-head span{
		color: #999;
	}
	[data-dpr="1"] .search-head span{
		font-size: 14px;
	}
	[data-dpr="2"] .search-head span {
		font-size: 28px;
	}
	[data-dpr="3"] .search-head span {
		font-size: 42px;
	}
	.search-body {
		padding: 0;
		height: auto;
		border: 0;
	}
	.search-list li {
		width: 50%;
		min-width: 45%;
		float: left;
		padding-left: 1.25em;
		border-right: .04em solid #e8e8e8; 
		border-bottom: .04em solid #e8e8e8; 
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.search-list li:last-child{
		border-right: none;
	}

	

</style>