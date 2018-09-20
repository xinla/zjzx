<template>
	<div class="header">
		<div class="header-logo">
			<img src="@/assets/images/logo.png" alt="直击真相">
		</div>
		<div class="header-input">
			<i class="iconfont">&#xe627;</i>
			<span>请输入搜索关键词~</span>
		</div>
		<div class="header-menu">
			<div @click="handleRelease">
				<i class="iconfont menu-icon">&#xe603;</i>
				<p class="menu-text">发布</p>
			</div>
			<transition  enter-active-class="animated fadeIn" leave-active-class=" animated fadeOut">
				<div class="header-dialog" v-show="releaseShow">
					<div class="arrow-tip"></div>
					<ul class="header-nav">
						<li  @click="$Tool.goPage({ name:'release',query:{title:'发布图文',sort:1}})"><i class="iconfont">&#xe686;</i>发布图文</li>
						<li @click="$Tool.goPage({ name:'release',query:{title:'发布视频',sort:2}})"><i class="iconfont">&#xe604;</i>发布视频</li>
						<li @click="$Tool.goPage({ name:'release',query:{title:'发起讨论',sort:3}})"><i class="iconfont">&#xe6b3;</i>发起讨论</li>
					</ul>
				</div>
			</transition>
		</div>
	</div>
</template>
<script>
	export default {
		name:'homeHeader',
		data(){
			return {
				releaseShow:false,
			}
		},
		methods:{
			handleRelease(){
				this.releaseShow=!this.releaseShow;
			}
		}
	}
</script>

<style lang="less" scoped>
.header{
		display: flex;
		width: 100%;
		height: @headerHeight;
		background-color: @mainColor;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		.header-logo {
			float: left;
			width: 1.9rem;
			img{
				width: 90%;
				margin-top: .2rem;
			}
		}
		.header-input {
			flex: 1;
			height: .56rem;
			line-height: .56rem;
			margin-top: .16rem;
			padding-left: .2rem;
			background-color: #fff;
			border-radius: .1rem;
			color:#ccc;
			span{
				vertical-align: top;
			}

		}
		.header-menu {
			min-width:1rem;
			padding: .08rem 0 .1rem;
			float: right;
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
		}
	}
</style>