<template>
	<div class="header">
		<div class="header-logo ac">
			<img src="@/assets/images/logo.png" alt="直击真相">
		</div>
		<div class="header-input" @click="$Tool.goPage({ name:'search' })">
			<marquee>
		      <marquee-item v-for="(item,index) in keywords" :key="index">{{item.keyword}}</marquee-item>
		    </marquee>
		</div>
		<div class="header-menu">
			<div @click="handleRelease">
				<i class="iconfont icon-add menu-icon"></i>
				<p class="menu-text">发布</p>
			</div>
			<transition  enter-active-class="animated fadeIn" leave-active-class=" animated fadeOut">
				<div class="header-dialog" v-show="releaseShow">
					<div class="arrow-tip"></div>
					<ul class="header-nav">
						<li  @click="$Tool.goPage({ name:'release',query:{title:'发布图文',sort:1}});releaseShow = false;"><i class="iconfont icon-tuwen"></i>发布图文</li>
						<li @click="$Tool.goPage({ name:'release',query:{title:'发布视频',sort:2}});releaseShow = false;"><i class="iconfont icon-shipin"></i>发布视频</li>
						<li @click="$Tool.goPage({ name:'release',query:{title:'发起讨论',sort:3}});releaseShow = false;"><i class="iconfont icon-taolun"></i>发起讨论</li>
					</ul>
				</div>
			</transition>
			<div class="mask" v-show="maskShow" @click="handleMask"></div>
		</div>
	</div>
</template>
<script>
import { Marquee, MarqueeItem } from 'vux'
import searchService from '@/service/searchService'
export default {
	components:{
		Marquee,
		MarqueeItem,
	},
	data(){
		return {
			keywords:[],
			releaseShow:false,
			maskShow:false
		}
	},
	mounted(){
		this.getHotKeywords();
	},
	methods:{
		handleRelease(){
			this.releaseShow=!this.releaseShow;
			this.maskShow=!this.maskShow;
		},
		handleMask(){
			this.releaseShow = false;
			this.maskShow=false;
		},
		getHotKeywords(){
			searchService.getHotKeyword(data=>{
				if (data && data.status == "success") { 
					this.keywords = data.recordList;
				}
			});
		},
	},
	watch:{
		keywords(){

		}
	}
}
</script>

<style lang="less" scoped>
.header{
		display: flex;
		width: 100%;
		padding-top:@statusBarHeight;
		height: @headerHeight;
		background-color: @mainColor;
		align-items: center;
		box-sizing: content-box;
		.header-logo {
			width: 1.9rem;
			img{
				width: 92%;
			}
		}
		.header-input {
			flex: 1;
			height: .63rem;
			line-height: .63rem;
			padding-left: .2rem;
			background-color: #fff;
			border-radius: .1rem;
			color:#444;
			span{
				vertical-align: top;
			}

		}
		.header-menu {
			min-width:1rem;
			// padding: .08rem 0 .1rem;
			// float: right;
			text-align: center;
			color: #fff;
			.menu-icon{
				font-size: .5rem;
			}
			.menu-text {
				margin-top: -.05rem;
				font-size: .2rem;
			}
			.header-dialog{
				width: 2.72rem;
				position: absolute;
				right: .14rem;
				top: 1.08rem;
				border-radius: .14rem;
				background-color:#595959;
				z-index: 12;
				.arrow-tip{
					width: 0;   
					height: 0;   
					border-left: .2rem solid transparent;  
					border-right: .19rem solid transparent; 
					border-bottom: .2rem solid #595959;
					font-size: 0;  
					line-height: 0;  
					position: absolute;
					top: -.2rem;
					left: 2.2rem;
					z-index: 9999;
				}
				.header-nav {
					padding: 0 .24rem;
					li {
						padding: .24rem 0;
						text-align: left;
						border-bottom: .02rem solid #656566;
						font-size: .28rem;
						&:nth-last{
							border-color: red;
						}
						i{
							font-size: .32rem;
							margin-right: .32rem;
						}
					}
				}
			}
			.mask {
				width: 100vw;
				height: 100vh;
				position: fixed;
				overflow: hidden;
				left: 0;
				top: 0.88rem;
				bottom: inherit;
				z-index: 9;
				background-color: transparent;
			}
		}
	}
</style>