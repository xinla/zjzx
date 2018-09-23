<template>
	<transition name="slide-ud">
		<div class="mask" v-show="value" @click="cancle">	
			<transition name="slide-ud">
				<div class="bf" v-show="value">
					<ul class="share-wrap">
						<li class="share-li" @click="$emit('shareWX')">
							<div class="iconfont icon-wechat-fill"></div>
							微信	
						</li>	
						<li class="share-li" @click="$emit('sharePYQ')">
							<div class="iconfont icon-chrome-fill"></div>
							朋友圈
						</li>
						<li class="share-li" @click="$emit('shareQQ')">
							<div class="iconfont icon-QQ"></div>
							QQ
						</li>
						<li class="share-li" @click="$emit('shareXL')">
							<div class="iconfont icon-weibo"></div>
							微博
						</li>
					</ul>
					<div class="cancle" @click="cancle">
						取消
					</div>				
				</div>			
			</transition>
		</div>
	</transition>
</template>
<script>
export default {
	props:{
		value:{
			type:Boolean,
			default:false,
		},
	},
	methods:{
		cancle(){
			this.$emit("input",false)
		}
	}
}
</script>

<style rel="stylesheet" scoped>
.mask{
	background: rgba(60, 60, 60, 0.1);
}
.bf{
	height: auto;
}
.share-wrap,.cancle{
	background: #fdfdfd;
	border-radius: 10px;
	margin: 10px;
	width: calc(100% - 20px);
	line-height: 30px;
	text-align: center;
}
.share-wrap{
	display: flex;
	height: 80px;
	justify-content: space-around;
	align-items: center;
}
.share-li{
	/*flex: auto;*/
	color: #666;
}
.iconfont{
	font-size: 20px;
}
.slide-ud-enter-active {
  transition: all .3s ease;
}
.slide-ud-leave-active {
  transition: all .3s ease;
}
.slide-ud-enter, .slide-ud-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  bottom: -50px;
}
</style>