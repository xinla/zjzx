<!-- 首页新闻页面 -->
<template>
	<div>
		<z-header></z-header>
		<z-tab></z-tab>
		<div class="main">
			<template v-for="(item,index) in arcList">
				<multIT :article="item" v-if="item.type==1"></multIT>
				<bigIVT :article="item" v-else-if="item.type==2"></bigIVT>	
				<smaIVT :article="item" v-else="item.type==3"></smaIVT>
			</template>
		</div>
		<z-nav></z-nav>
		<!-- <z-swiper></z-swiper> -->
	</div>
</template>

<script>
	// import '@/assets/js/rem.js'	
	import zHeader from '@/components/headerBar'
	import zTab from '@/components/tabBar'
	// import zSwiper from '@/components/Swiper/index'
	import zNav from '@/components/navBar'
	import config from '@/lib/config/config'
	import homeService from '@/service/homeService'
	import multIT from '@/components/news/multIT'
	import smaIVT from '@/components/news/smaIVT'
	import bigIVT from '@/components/news/bigIVT'

	import articleService from '@/service/articleService'

	export default {
		components:{
			zHeader,
			zTab,
			// zSwiper
			multIT,
			smaIVT,
			bigIVT,
			zNav
		},
		created () {
			// debugger;
			// console.log(homeService);
			homeService.use(this.$http).test(function(data){
				console.log(data);
			})			
		},
		data(){
			return {
				arcList:[],
			}
		},
		methods:{
			recalc(){
				var win=window,
				doc=document,
				docEl = doc.documentElement,
				dpr = win.devicePixelRatio || 1,
				isInt = dpr.toString().match(/^[1-9]\d$/);
				if (!isInt) {
					dpr  = Math.floor(dpr);
				}

				let aa = function(normal, fontscale){
					var _baseFontSize = 100,
					_fontscale = fontscale || 1,
					ua = navigator.userAgent,
					matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i),
					UCversion = ua.match(/U3\/((\d+|\.){5,})/i),
					isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80,
					isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
					if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
		                    // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
		                    dpr = 1;
		                }
		                let scales = normal ? 1 : 1 / dpr;
		                let metaEl = doc.querySelector('meta[name="viewport"]');
		                docEl.setAttribute('data-dpr',dpr);
		                if (!metaEl) {
		                	metaEl = doc.createElement('meta');
		                	metaEl.setAttribute('name', 'viewport');
		                	doc.head.appendChild(metaEl);
		                }
		                metaEl.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${scales},maximum-scale=${scales},minimum-scale=${scales}`);
		                var clientWidth = win.innerWidth || docEl.clientWidth || doc.body.clientWidth;
		                if (!clientWidth) return;
		                if (dpr == 1) {
		                	if (clientWidth >= 750) {
		                		_baseFontSize = 100;
		                	} else {
		                		_baseFontSize = 100 * (clientWidth / 750);
		                	}                 
		                } else if (dpr == 2) {
		                	if (clientWidth >= 1500) {
		                		_baseFontSize = 100;
		                	} else {
		                		_baseFontSize = 100 * (clientWidth / 1500);
		                	}
		                } else if (dpr == 3) {
		                	if (clientWidth >= 2250) {
		                		_baseFontSize = 100;
		                	} else {
		                		_baseFontSize = 100 * (clientWidth / 2250);
		                	}
		                }
		                doc.documentElement.style.fontSize = normal ? '100px' : `${_baseFontSize  * dpr * _fontscale}px`;
		            };
		            aa(false, 1);
		        },
		        subRecalc(){
		        	var docEl=document.documentElement,
		        	clientWidth = Math.min( window.innerWidth , docEl.clientWidth );
		        	docEl.style.fontSize= ( clientWidth / 750 * 100)+"px";
		        }
		    },
	    mounted () {
	    	var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
	    	
	    	window.addEventListener(resizeEvt, this.recalc, false);
	    	document.addEventListener('DOMContentLoaded', this.recalc, false);
	    	this.recalc();
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
	    beforeRouteLeave (to, from, next) {

	    	var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
	    	window.removeEventListener(resizeEvt, this.recalc, false);
	    	document.removeEventListener('DOMContentLoaded', this.recalc, false);

	    	document.querySelector('html').setAttribute("data-dpr",1);
	    	document.querySelector('meta[name="viewport"]').setAttribute("content","width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no");
	    	window.addEventListener(resizeEvt, this.subRecalc, false);
	    	document.addEventListener('DOMContentLoaded', this.subRecalc, false);

	    	next();
	    }
	}
	</script>
	<style scoped>
	.main{
		padding:6em 0.5em 3.5em;
		height: 100%;
	}
</style>