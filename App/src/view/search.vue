<template>
	<div class="search-wrap">
		<div class="search-container">
			<i class="iconfont icon-left" @click="this.$Tool.goBack"></i>
			<div class="search-box">
				<!-- <i class="iconfont icon-sousuo1"></i> -->
				<input class="search-input" type="text" v-model="keywords" placeholder="请输入关键字" ref="searchInput">
				<i class="iconfont icon-close-circle-fill" @click="reset()"></i>
			</div>
			<div class="dosearch" @click="search">搜索</div>
		</div>
		<!-- 输入关键词匹配 -->
		<ul class="matchkey-wrap" v-show="ifMatch">
			<li class="match-li" v-for="item in matchKeywords" @click="quickSearch(item)"><i class="iconfont icon-select"></i>{{item.keyword}}</li>
		</ul>
		<!-- 热词 -->
		<ul class="search-key" v-if="!searchResult.length">
			<li class="hotkey-li" v-for="(item,index) in hotKeywords" @click="quickSearch(item)">
				{{item.keyword}}
			</li>
		</ul>
		<div class="search-around" v-if="!searchResult.length && !resultTip">
			<div class="search-history">
				<div class="search-head clearfix">
					<span class="fl">历史记录</span>
					<i class="iconfont fr">&#xe646;</i>
				</div>
				<div class="search-body">
					<ul class="search-list clearfix">
						<li v-for="item in historyKeywords" @click="quickSearch(item)">{{item.keyword}}</li>
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
		<div class="search-result" v-else>
			<div class="main-content" @scroll="loadMore" v-if="searchResult.length">				
				<multIT v-for="(item,index) in searchResult" :article="item" :ifPublisher="true" :key="index"></multIT>
			</div>
			<load-more v-if="ifLoad" tip="正在加载"></load-more>				
			<load-more v-else :show-loading="false" :tip="resultTip"></load-more>	
		</div>
	</div>
</template>

<script>
import searchService from '@/service/searchService'
import articleService from '@/service/articleService'

export default {
	data() {
		return {
			guessList:[],
			hotKeywords:[],
			searchResult:[],
			matchKeywords:[],
			historyKeywords:[],
			keywords:"",
			pageSize:1,
			lock:false,
			ifLoad:true,
			ifMatch:false,
			resultTip:"",
		}
	},
	mounted(){
		this.getHotKeywords();
		this.getHistoryKeywords();
	},
	methods:{
		search(){
			if (!this.keywords) {return;}
			this.ifMatch = false;			
			this.searchResult = [];
			this.pageSize = 1;
			searchService.addSearchRecord(this.keywords);
			this.searchMore();
			console.log(this.ifMatch)

		},
		searchMore(){
			this.ifLoad = true;
			this.lock = true;
			let resSearchArticlePage = articleService.searchArticlePage(this.pageSize,15,this.keywords);
			if (resSearchArticlePage && resSearchArticlePage.status == "success") {
				this.searchResult = this.searchResult.concat(resSearchArticlePage.recordPage.list);
				this.ifLoad = false;
				if (this.searchResult.length == 0) {
					this.resultTip = '暂无相关数据';
					return;
				}
				this.pageSize++;
				this.lock = false;
				this.resultTip = '已加载全部';
			// console.log(this.keywords)
			// console.log(this.searchResult)
			}
		},
		loadMore(e){
			if (!this.lock && ($(e.target).scrollTop() + $(e.target).height()) > e.target.scrollHeight-350) {
				this.$options.methods.searchMore.call(this);
				// console.log(1)
			}
		},
		// 根据输入关键字获取匹配关键字列表
		getMatchkeywords(){
			searchService.getKeywordList(this.keywords,data=>{
				if (data && data.status == "success") {
					this.matchKeywords = data.recordList;	
					this.ifMatch = true;
				}
			})
		},
		getHotKeywords(){
			searchService.getHotKeyword(data=>{
				if (data && data.status == "success") { 
					this.hotKeywords = data.recordList;					
				}
			})
		},
		getHistoryKeywords(){
			searchService.getUserKeywordList(data=>{
				if (data && data.status == "success") { 
					this.historyKeywords = data.recordList;	
					// console.log(data)				
				}
			})
		},
		quickSearch(key){
			this.keywords = key.keyword;
			this.search();
		},
		reset(){
			this.keywords = "";
		},
	},
	watch:{
		keywords(){
			if (this.keywords == "") {
				this.matchKeywords = [];
				this.ifMatch = false;
				this.searchResult = [];
				this.resultTip = '';
				// return;
			}else{
				
			this.getMatchkeywords.call(this);
			}
		}
	},
}
</script>
<style scoped>
	.search-container {
		height: 3.5em;
		background-color: #fff;
		padding: .5em 0;
	    display: flex;
	    align-items: center;
	    justify-content: space-around;
	    text-align:center;
	}
	.search-box {
	    position: relative;
		display: inline-block;
		width: 76%;
		height: 100%;
		background-color: #f4f5f6;
		border-radius: 0.25rem;
		border: 1px solid #e8e8e8;
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

	[data-dpr="1"] .icon-sousuo1 {
		font-size: 24px;
	}
	[data-dpr="2"] .icon-sousuo1 {
		font-size: 48px;
	}
	[data-dpr="3"] .icon-sousuo1 {
		font-size: 72px;
	}
	.search-input {
		width: 100%;
		height: 100%;
		text-indent: .5em;
	}
	.dosearch {
		color: #2a90d7;
		width: 14%;
	}
	.icon-left{
		width: 10%;
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
	.hotkey-li {
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
	.main-content{
		height: calc(100vh - 50px);
		overflow-y: auto;
		padding:0 0.5em;
		background: #fff;
	}
	.matchkey-wrap{
		background: #fff;
		line-height: 28px;
	    position: absolute;
	    width: 100%;
	    height: 90%;
	    z-index: 9;
	    overflow-y: auto;
	}
	i.iconfont.icon-close-circle-fill {
	    position: absolute;
	    top: 50%;
	    right: 6px;
	    transform: translateY(-50%);
	}
	.match-li {
	    padding: 0 20px;
	}
	.icon-select{
		float: right;
	}
</style>