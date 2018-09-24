<!-- 首页新闻页面 -->
<template>
	<div>
		<div class="index" v-show="1 == showIndex">
			<home-header></home-header>
			<home-nav></home-nav>
			<div class="main">
				<loading-main v-show="ifLoad"></loading-main>
				<keep-alive>
					<router-view></router-view>		
					
				</keep-alive>
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
	import homeHeader from '@/components/headerBar'
	import homeMore from'@/components/more'
	import homeNav from '@/components/swiperNav'
	import bottomNav from '@/components/bottomNav'
	import member from '@/view/member/index'

	import homeService from '@/service/homeService'
	import articleService from '@/service/articleService'

	export default {
		components:{
			homeHeader,
			homeNav,
			member,
			homeMore
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
			}
		},
		mounted () {
	    	// var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
	    	
	    	// window.addEventListener(resizeEvt, this.recalc, false);
	    	// document.addEventListener('DOMContentLoaded', this.recalc, false);
	    	// this.recalc();
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
<style scoped>
	.main{
		padding:6em 0.5em 3.5em;
		height: 100vh;
		background: #fff;
		overflow-x: hidden;
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
</style>