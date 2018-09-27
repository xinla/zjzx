<template>
	<div>
		<downRefresh @refresh="getArtList()">
			<div class="main-content" @scroll="loadMore">				
				<loading-main v-show="ifLoad"></loading-main>
				<multIT v-for="(item,index) in arcList" :article="item" :ifPublisher="true" :key="index"></multIT>
				<!-- <bigIVT :article="item" v-else-if="item.type==2"></bigIVT>	 -->
				<!-- <smaIVT :article="item" v-else="item.type==3"></smaIVT> -->
				<load-more tip="正在加载"></load-more>				
			</div>
		</downRefresh>
	</div>
</template>

<script>
import multIT from '@/components/news/multIT'
import bigIVT from '@/components/news/bigIVT'
import downRefresh from '@/components/common/downRefresh'

import articleService from '@/service/articleService'
export default {
	components:{
		multIT,
		bigIVT,
		downRefresh,
	},
	props:{
		classify:{
			default:0,
		},
	},
	mounted () {	
		this.$options.methods.getArtList.call(this);
		this.ifLoad = false;
		// console.log(this.$el);
		this.bindTouchEvent();
	},
	data(){
		return {
			arcList:[],
			pageSize:1,
			lock:false,
			ifLoad:true,			
		}
	},
	methods:{
		getArtList(){
			this.lock = true;
			let resArticlePage;
			if(this.classify == 0){
				resArticlePage = articleService.articlePage(this.pageSize,15);
			}else{
				resArticlePage = articleService.articlePage(this.pageSize,15,this.classify);	
			}
			if (resArticlePage && resArticlePage.status == "success") {
				this.arcList = this.arcList.concat(resArticlePage.recordPage.list);	
				this.pageSize++;
				this.lock = false;
				// console.log(this.arcList);articlePage
			}
		},
		loadMore(e){
			if (!this.lock && ($(e.target).scrollTop() + $(e.target).height()) > e.target.scrollHeight-350) {
				this.$options.methods.getArtList.call(this);
				// console.log(1)
			}
		},
		//
		bindTouchEvent(){ 
		  this.$el.addEventListener('touchstart', this._touchStart);         
		  this.$el.addEventListener('touchmove', this._touchMove);         
		  this.$el.addEventListener('touchend', this._touchEnd);   
		},
		_touchStart(e){
			this.animate = false;
			let touch = e.changedTouches[0];
	        this.tipText = '下拉刷新';
	        this.startX = touch.clientX;
	        this.startY = touch.clientY;
		},
		_touchMove(e){         
			let touch = e.changedTouches[0]; 
	        // 获取下拉的距离
			let move = touch.clientY - this.startY;
	         //这里主要是让内容区随着下拉操作而往下滚动         //_move>0是指往下滑动(下拉),_move<100是给一个上限,不然一直下拉的话整个内容区就会随着下拉距离一直增大,用户体验不是很好         //这里下拉操作主要是显示出顶上的一层tipText         
			if (move > 0 && move < 100) {           
				this.lineHeight = move;           //记录下下拉的距离
				this.moveDistance = move;           
				if (move > 50) {             
					this.tipText = '松开即可刷新'           
				}         
			}       
		},
		_touchEnd(e){        
			let touch = e.changedTouches[0];        
			this.endX = touch.clientX;        
			this.endY = touch.clientY;        
			if (this.moveDistance > 50) {          
				this.tipText = '数据加载中...';
				this.$options.methods.getArtList.call(this);
				this.tipText = "加载完毕";
				this.lineHeight = 0;
			}
			this.animate = true;
			this.lineHeight = 0;
			// this.tipText = "";
		}

	}
}
</script>

<style rel="stylesheet" scoped>
	.main-content{
		height: calc(100vh - 130px);
		overflow-y: auto;
		padding:0 0.5em;
	}
	.refresh{
		background: #fafafa;
		overflow: hidden;
	}
	.animate{
		transition: all .5s;
	}
</style>