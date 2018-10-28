<template>
	<div>
		<div class="status-bar"></div>
		<div class="top-back">
			<div class="top-back-icon"  @click="$emit('hrefTo')">
				<i class="iconfont icon-arrow-left">
					<slot name="href"></slot>
				</i>
			</div>
			<div class="top-back-title">
				<slot name="title"></slot>
			</div>		
			<div class="top-back-nav">
				<slot name="nav">
					<i class="iconfont icon-more">
					</i>				
				</slot>				
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props:{
		showNav:{
			type:Boolean,
			default:false,
		}
	},
	data(){
		return{

		}
	},
}	
</script>
<style lang="less" scoped>
.status-bar{
	background: @statusBarBg;
}
.top-back {
	display: flex;
	width: 100%;
	height: @topHeigth;
	padding: 0 .34rem;
	line-height: @topHeigth;
	background-color: #fff;
	border-bottom: .02rem solid @borderColor;
	position: relative;
	left: 0;
	top: 0;
	z-index: 9;
	justify-content: space-between;
	.top-back-icon{
		width: .4rem;
		.iconfont{
			font-size: .4rem;
			color: #666;
		}
	}
	
	.top-back-title{
		// width: calc(100% - .67rem);
		text-align: center;
		color: #666;
		font-size: .32rem;
	}
	.top-back-nav{
		min-width: .6rem;
		height: .87rem;
		line-height: .87rem;
		// margin-top: .27rem;
		font-size: .4rem;
		color: #666;
		.iconfont{
			font-size: .5rem;
		}
	}
}
</style>