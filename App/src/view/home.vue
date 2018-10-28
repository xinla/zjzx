<!-- 首页新闻页面 -->
<template>
	<div class="index">
		<home-header></home-header>
		<div class="main-wrap">
			<div class="bfc-o">
				<tab :line-width=2 active-color='#fc378c' v-model="classifyIndex">
					<tab-item :selected="currentClassiftyName == '推荐'" @click="currentClassiftyName = '推荐'">推荐
					</tab-item>
					<tab-item :selected="currentClassiftyName == item.classifyname" v-for="(item,index) in classifyList" @click="currentClassiftyName = item.classifyname" :key="index">{{item.classifyname}}
					</tab-item>
				</tab>
					<div class="nav-add" @click="handleMore" v-model="showMore" v-if="0">
						<i class="iconfont icon-menu1"></i>
					</div>
				<div v-transfer-dom>
					<popup v-model="showMore" position="bottom" height="100%">
						<div class="more-title" @click="handleClose">
							<i class="iconfont icon-close"></i>
						</div>
						<home-more></home-more>
					</popup>	
				</div>
			</div>
			<div class="main" ref="main">
				<loading-main v-show="ifLoad"></loading-main>
				<swiper v-model="classifyIndex" :height="swiperHeight + 'px'" :show-dots="false" :threshold="150" >
			        <swiper-item>
			          	<listArticle :show="0 == classifyIndex"></listArticle>
			        </swiper-item>
			        <swiper-item v-for="(item,index) in classifyList" :key="index">
			          	<listArticle :classify="item.classifycode" :show="item.classifycode == classifyIndex?showArr[classifyIndex] = true:showArr[item.classifycode]"></listArticle>
			        </swiper-item>
		      	</swiper>
			</div>
		</div>
	</div>
</template>

<script>	
import { TransferDom,Swiper,SwiperItem, Popup } from 'vux'
import homeHeader from '@/components/headerBar'
import homeMore from'@/components/more'
import listArticle from '@/components/listArticle'

import homeService from '@/service/homeService'
import articleService from '@/service/articleService'
import articleClassifyService from '@/service/article_classifyService'

	export default {
		directives: {
    		TransferDom
  		},
		components:{
			homeHeader,
			homeMore,
			Swiper, 
			SwiperItem,
			listArticle,
			Popup,
		},
		data(){
			return {
				showMore:false,
				ifLoad:true,
				classifyList:[
					{	
						classifycode:1,
						classifyname:"揭秘"
					},{	
						classifycode:2,
						classifyname:"防骗"
					},{	
						classifycode:3,
						classifyname:"打假"
					},{	
						classifycode:4,
						classifyname:"寻亲"
					},{	
						classifycode:5,
						classifyname:"普法"
					},{	
						classifycode:6,
						classifyname:"聚焦"
					}
				],
				classifyIndex:0,
				currentClassiftyName:"推荐",
				swiperHeight:0,
				showArr:[],
			}
		},
		mounted () {
	    	// var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
	    	
	    	// window.addEventListener(resizeEvt, this.recalc, false);
	    	// document.addEventListener('DOMContentLoaded', this.recalc, false);
	    	// this.recalc();
	    	// 
	    	this.swiperHeight = document.body.clientHeight - $(this.$refs.main).offset().top;
	    	this.$nextTick(()=>{
	    		//获取分类
	    		if (!localStorage.classify) {
		    		articleClassifyService.getArticleClassifyList(data=>{
						if (data && data.status == "success") {
							this.classifyList = data.result.classfyList;	
							localStorage.classify = JSON.stringify(data.result.classfyList);
						}
					});
	    		}else{
	    			this.classifyList = JSON.parse(localStorage.classify);
	    		}
	    	})
    		this.ifLoad = false;
	    },
		methods:{
			//导航栏添加弹出popup
			handleMore(){
				this.showMore = true;
			},
			//关闭popup
			handleClose(){
				this.showMore = false;
			},
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
	.index{
		height: 100vh;
		width: 100%;
		overflow: hidden;
	}
	.main-wrap{
		height: 100vh;
		width: 100%;
		background: #fff;
		overflow: hidden;
		.main{
			height: calc(100% - 90px);
			overflow-y:auto;
		}
		.nav-add {
			position: absolute;
			right: 0;
			top: 0;
			width: .72rem;
			height: @navHeight;
			line-height: @navHeight;
			text-align: center;
			background-color: rgb(255,255,255);
			box-shadow:-.1rem 0px .4rem #cccccc;
			color:#000;
			i {
				font-size: .40rem;
			}
		}

		.vux-popup-dialog{
			background-color: transparent;

		}

	}
	.more-title {
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 99999;
		height: .87rem;
		background-color: #fff;
		border-radius: .3rem .3rem 0 0;
		line-height: .87rem;
		border-bottom: .01rem solid @borderColor;
		padding: 0 .3rem;
		i{
			font-size: .45rem;
			font-weight: 700;
		}
	}	
	.main-content{
		height: 100%;
		overflow-y: auto;
	}
	.vux-tab .vux-tab-item{
		font-size: 17px !important;
		font-weight: 500;
		flex: 0 0 18% !important;
	}
	
</style>
<style>
	/*vux tab 样式修改*/
	.vux-tab-wrap{
      	padding-top: .76rem !important;
	}
	.vux-tab .vux-tab-item{
    color: #000 !important;
		line-height: .76rem !important;
    font-size: .28rem !important;
	}
	.vux-tab-container{
		height: .76rem !important;
	}
  .vux-tab .vux-tab-item.vux-tab-selected{
    color: rgb(252, 55, 140) !important;
  }
	.vux-tab{
		height: .76rem !important;
	}
</style>
