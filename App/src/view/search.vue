<template>
	<div class="search-wrap">
		<div class="search-container">
			<i class="iconfont icon-left" @click="this.$Tool.goBack"></i>
			<div class="search-box">
				<!-- <i class="iconfont icon-sousuo1"></i> -->
				<input class="search-input" type="text" v-model="keywords" placeholder="请输入关键字" ref="searchInput" @keyup="getMatchkeywords">
				<i class="iconfont icon-close-circle" @click="reset()"></i>
			</div>
			<div class="dosearch" @click="search">搜索</div>
		</div>
		<!-- 输入关键词匹配 -->
		<ul class="matchkey-wrap" v-show="ifMatch">
			<li class="match-li" v-for="item in matchKeywords" @click="quickSearch(item.keyword)"><i class="iconfont icon-select"></i>{{item.keyword}}</li>
		</ul>
		<!-- 热词 -->
		<ul class="search-key" v-show="!searchResult.length">
			<li class="hotkey-li" v-for="(item,index) in hotKeywords" @click="quickSearch(item.keyword)">
				{{item.keyword}}
			</li>
		</ul>
		<!-- 历史记录 -->
		<div class="search-around" v-if="!searchResult.length && !resultTip">
			<div class="search-history" v-show="historyKeywords.length">
				<div class="search-head clearfix">
					<span class="fl">历史记录</span>
					<i class="iconfont fr icon-delete" v-if="!ifDeleteAll" @click="ifDeleteAll = true;"></i>
					<div class="fr" v-else>
						<span @click="deleteAll()">删除全部</span>
						<span @click="ifDeleteAll = false;">完成</span>					
					</div>
				</div>
				<div class="search-body">
					<ul class="search-list clearfix">
						<li class="oe history-li" v-for="(item,index) in historyKeywords" @click="quickSearch(item)">
							{{item}}
							<div class="deletehistory" v-if="ifDeleteAll" @click="e=>{historyKeywords.splice(index,1);e.stopPropagation();}">								
								<i class="iconfont fr icon-close-circle"></i>
							</div>
						</li>
					</ul>
				
				</div>
			</div>
			<div class="search-history">
				<div class="search-head clearfix">
					<span class="fl">猜你想搜的</span>
					<i class="iconfont icon-nosee fr"></i>
				</div>
				<div class="search-body">
					<ul class="search-list clearfix">
						<li class="oe" v-for="item in guessList">{{item.guesstext}}</li>
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
			// historyNum:4,
			ifDeleteAll:false,
		}
	},
	mounted(){
		this.getHotKeywords();
		let temp = localStorage.getItem("keywords");
		this.historyKeywords = JSON.parse(temp) || [];
		// console.log(this.historyKeywords)
	},
	activated(){
		this.ifDeleteAll = false;
		// this.historyNum = 4;
	},
	methods:{
		search(){
			if (!this.keywords) {return;}
			if (!this.$Tool.checkInput(this.keywords)) {
				this.keywords = this.$Tool.replaceNo(this.keywords);				
				this.$vux.alert.show({
				  content:'搜索内容不合法，已为您删除，请确认！',
				})
				return;
			}
			this.ifMatch = false;			
			this.searchResult = [];
			this.pageSize = 1;
			searchService.addSearchRecord(this.keywords);
			if (!this.historyKeywords.includes(this.keywords)) {
				this.historyKeywords.unshift(this.keywords);				
			}
			let temp = JSON.stringify(this.historyKeywords);
			localStorage.setItem("keywords",temp);
			this.searchMore();
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
			}
		},
		// 根据输入关键字获取匹配关键字列表
		getMatchkeywords(){
			if (this.keywords == "") {
				this.matchKeywords = [];
				this.ifMatch = false;
				this.searchResult = [];
				this.resultTip = '';
				return;
			}
			searchService.getKeywordList(this.keywords,data=>{
				if (data && data.status == "success") {
					this.matchKeywords = data.recordList;
					if (this.matchKeywords.length) {
						this.ifMatch = true;						
					}else{
						this.ifMatch = false;
					}
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
		quickSearch(key){
			this.keywords = key;
			this.search();
		},
		reset(){
			this.keywords = "";
		},
		deleteAll(){
			let _this = this;
			this.$vux.confirm.show({
				content:"确定要删除么",
				onConfirm () {
					_this.historyKeywords = [];
					_this.ifDeleteAll = false;
				}
			})
		},
	},
	watch:{
		keywords(){
			if (this.keywords == "") {
				this.matchKeywords = [];
				this.ifMatch = false;
				this.searchResult = [];
				this.resultTip = '';
				return;
			}
		},
		historyKeywords(val){
			let temp = JSON.stringify(val);
			localStorage.setItem("keywords",temp);
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
		position: relative;
		width: 50%;
		min-width: 45%;
		float: left;
		padding:0 1.25em;
		border-right: .04em solid #e8e8e8; 
		border-bottom: .04em solid #e8e8e8; 
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
	i.iconfont.icon-close-circle {
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
	.deletehistory{
		position:absolute;
		width: 100%;
		height: 100%;
		top: 0;left: 0;
	}
	.icon-close-circle{
		margin-right: 6px;
	}
</style>