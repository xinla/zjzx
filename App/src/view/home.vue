<!-- 首页新闻页面 -->
<template>
	<div>
		<div class="index" v-show="1 == showIndex">
			<home-header></home-header>
			<div class="main-wrap">
				<div class="bfc-o">
					<tab :line-width=2 active-color='#fc378c' v-model="classifyIndex">
						<tab-item :selected="currentClassiftyName == item.classifyname" v-for="(item,index) in classifyList" @click="currentClassiftyName = item.classifyname" :key="index">{{item.classifyname}}
						</tab-item>
					</tab>
					<router-link to="/more">
						<div class="nav-add">
							<i class="iconfont">&#xe610;</i>
						</div>
					</router-link>					
				</div>
			<div class="main">
				<loading-main v-show="ifLoad"></loading-main>
				<swiper v-model="classifyIndex" height="500px" :show-dots="false">
			        <swiper-item>
			          	<div class="main-content" @scroll="loadMore">
			          		<multIT v-for="(item,index) in (0 == classifyIndex?arcListA:[])" :article="item" :ifPublisher="true" :key="index"></multIT>
			          	</div>
			        </swiper-item>
			        <swiper-item>
			          	<div class="main-content" @scroll="loadMore">
			          		<multIT v-for="(item,index) in (1 == classifyIndex?arcListB:[])" :article="item" :ifPublisher="true" :key="index"></multIT>
			          	</div>
			        </swiper-item>
			        <swiper-item>
			          	<div class="main-content" @scroll="loadMore">
			          		<multIT v-for="(item,index) in (2 == classifyIndex?arcListA:[])" :article="item" :ifPublisher="true" :key="index"></multIT>
			          	</div>
			        </swiper-item>
			        <swiper-item>
			          	<div class="main-content" @scroll="loadMore">
			          		<multIT v-for="(item,index) in (3 == classifyIndex?arcListB:[])" :article="item" :ifPublisher="true" :key="index"></multIT>
			          	</div>
			        </swiper-item>
		      </swiper>
			</div>
	
			</div>
		</div>
		<member v-show="4 == showIndex"></member>

		<div class="footer-nav">
			<div :class="['footer-item',{'current':1 == showIndex}]" @click="show(1)">
				<i class="iconfont icon-index footer-icon"></i>
				<span class="footer-text">首页</span>
			</div>
			<div :class="['footer-item',{'current':2 == showIndex}]" @click="show(2)">
				<i class="iconfont icon-xiaoxi footer-icon"></i>
				<span class="footer-text">消息</span>
			</div>
			<div :class="['footer-item',{'current':3 == showIndex}]" @click="show(3)">
				<i class="iconfont icon-video footer-icon"></i>
				<span class="footer-text">视频</span>
			</div>
			<div :class="['footer-item',{'current':4 == showIndex}]" @click="show(4)">
				<i class="iconfont icon-wode footer-icon"></i>
				<span class="footer-text">我的</span>
			</div>
		</div>
		<!-- <home-more></home-more> -->
	</div>
</template>

<script>	
// import config from '@/lib/config/config'
import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
import homeHeader from '@/components/headerBar'
import homeMore from'@/components/more'
import homeNav from '@/components/swiperNav'
import bottomNav from '@/components/bottomNav'
import multIT from '@/components/news/multIT'

import member from '@/view/member/index'

import recommend from '@/view/part/recommend'
// import fangPian from '@/view/part/fangPian'


import homeService from '@/service/homeService'
import articleService from '@/service/articleService'
import articleClassifyService from '@/service/article_classifyService'

	export default {
		components:{
			homeHeader,
			homeNav,
			member,
			homeMore,
			Tab,
			TabItem,
			Swiper, 
			SwiperItem,
			multIT,
		},
		created () {
			// debugger;
			// console.log(homeService);
			// homeService.use(this.$http).test(function(data){
			// 	console.log(data);
			// })			
		},
		data(){
			return {
				ifLoad:false,
				showIndex:1,
				classifyList:[],
				arcListA:[],
				arcListB:[],
				classifyIndex:0,
				currentClassiftyName:"推荐",
				pageSize:1,
				lock:false,
			}
		},
		mounted () {
	    	// var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
	    	
	    	// window.addEventListener(resizeEvt, this.recalc, false);
	    	// document.addEventListener('DOMContentLoaded', this.recalc, false);
	    	// this.recalc();
	    	// 
	    	articleClassifyService.getArticleClassifyList(data=>{
				if (data && data.status == "success") {
					this.classifyList = data.result.classfyList;					
					// console.log(this.classifyList)
				}
			});

			this.$options.methods.getArtList.call(this);
			this.ifLoad = false;
	    },
		methods:{
			// recalc(){
			// 	var win=window,
			// 	doc=document,
			// 	docEl = doc.documentElement,
			// 	dpr = win.devicePixelRatio || 1,
			// 	isInt = dpr.toString().match(/^[1-9]\d$/);
			// 	if (!isInt) {
			// 		dpr  = Math.floor(dpr);
			// 	}

			// 	let aa = function(normal, fontscale){
			// 		var _baseFontSize = 100,
			// 		_fontscale = fontscale || 1,
			// 		ua = navigator.userAgent,
			// 		matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i),
			// 		UCversion = ua.match(/U3\/((\d+|\.){5,})/i),
			// 		isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80,
			// 		isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
			// 		if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
		 //                    // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
		 //                    dpr = 1;
		 //                }
		 //                let scales = normal ? 1 : 1 / dpr;
		 //                let metaEl = doc.querySelector('meta[name="viewport"]');
		 //                docEl.setAttribute('data-dpr',dpr);
		 //                if (!metaEl) {
		 //                	metaEl = doc.createElement('meta');
		 //                	metaEl.setAttribute('name', 'viewport');
		 //                	doc.head.appendChild(metaEl);
		 //                }
		 //                metaEl.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${scales},maximum-scale=${scales},minimum-scale=${scales}`);
		 //                var clientWidth = win.innerWidth || docEl.clientWidth || doc.body.clientWidth;
		 //                if (!clientWidth) return;
		 //                if (dpr == 1) {
		 //                	if (clientWidth >= 750) {
		 //                		_baseFontSize = 100;
		 //                	} else {
		 //                		_baseFontSize = 100 * (clientWidth / 750);
		 //                	}                 
		 //                } else if (dpr == 2) {
		 //                	if (clientWidth >= 1500) {
		 //                		_baseFontSize = 100;
		 //                	} else {
		 //                		_baseFontSize = 100 * (clientWidth / 1500);
		 //                	}
		 //                } else if (dpr == 3) {
		 //                	if (clientWidth >= 2250) {
		 //                		_baseFontSize = 100;
		 //                	} else {
		 //                		_baseFontSize = 100 * (clientWidth / 2250);
		 //                	}
		 //                }
		 //                doc.documentElement.style.fontSize = normal ? '100px' : `${_baseFontSize  * dpr * _fontscale}px`;
		 //            };
	  //           aa(false, 1);
	  //       },
	  //       subRecalc(){
	  //       	var docEl=document.documentElement,
	  //       	clientWidth = Math.min( window.innerWidth , docEl.clientWidth );
	  //       	docEl.style.fontSize= ( clientWidth / 750 * 100)+"px";
	  //       },
	        show(whi){
	        	this.showIndex = whi;
	        },
	        getArtList(){
				this.lock = true;
				let resArticlePage = articleService.articlePage(this.pageSize,15);
				if (resArticlePage && resArticlePage.status == "success") {
					this.arcListA = this.arcListA.concat(resArticlePage.recordPage.list);
					// this.arcListB = this.arcListB.concat(resArticlePage.recordPage.list);	
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
				// let that = this;
				// $(".main-content").scroll(function(){
				// 	if ( ($(this).scrollTop() + $(this).height()) > $(this)[0].scrollHeight-350) {
				// 	that.$options.methods.getArtList.call(that);
				// // 	console.log(that)
				// // console.log(this)
				// }
				// })
				// console.log(e.target)
			}

	    },
	    
	    destroyed(){
	    	// var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
	    	// window.removeEventListener(resizeEvt, this.recalc, false);
	    	// document.removeEventListener('DOMContentLoaded', this.recalc, false);
	    },
	    // beforeRouteEnter (to, from, next) {
	    // 	var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
	    // 	window.addEventListener(resizeEvt, window.recalc, false);
	    // 	document.addEventListener('DOMContentLoaded', window.recalc, false);
	    // 	next(vm=>{
	    // 		vm.recalc();
	    // 	});

	    // },
	    // beforeRouteLeave (to, from, next) {

	    // 	var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
	    // 	window.removeEventListener(resizeEvt, this.recalc, false);
	    // 	document.removeEventListener('DOMContentLoaded', this.recalc, false);

	    // 	document.querySelector('html').setAttribute("data-dpr",1);
	    // 	document.querySelector('meta[name="viewport"]').setAttribute("content","width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no");
	    // 	window.addEventListener(resizeEvt, this.subRecalc, false);
	    // 	document.addEventListener('DOMContentLoaded', this.subRecalc, false);

	    // 	next();
	    // }
	}
</script>
<style lang="less" scoped>
	.main-wrap{
		padding:3em 0px 0;
		height: 100vh;
		width: 100%;
		background: #fff;
		overflow: hidden;
	}
	.main{
		height: calc(100% - 90px);
		padding:0 0.5em;
		overflow-y:auto;
	}
	.footer-nav {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		text-align: center;
		overflow: hidden;
		background-color: #fff;
		box-shadow: 0 0 0.4em  #ccc;
	}
	.footer-item {
		float: left;
		width: 25%;
		height: 100%;
		color: #999;
	}
	.footer-icon {
	    display: block;
	    font-size: 1.5em;
	    line-height: 1.5em;
	}
	.footer-item a.router-link-active,.current{
		color: #f40;
	}
	.nav-add {
		position: absolute;
		right: 0;
		top: 0;
		width: .72rem;
		height: @navHeight;
		line-height: @navHeight;
		text-align: center;
		background-color: rgba(255,255,255,.8);
		box-shadow:-.1rem 0px .4rem #cccccc;
		color:#000;
		i {
			font-size: .40rem;
		}
	}
	.main-content{
		height: 100%;
		overflow-y: auto;
	}
	.router-link-active{
		color:@currentColor;
	}
	/*vux 样式修改*/
	.vux-tab-wrap{
      	padding-top: 38px;
	}
	.vux-tab .vux-tab-item{
		line-height: 38px;
	}
	.vux-tab-container{
		height: 38px;
	}
</style>
<style>
	.vux-tab{
		height: 38px !important;
	}	
</style>