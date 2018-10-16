<template>
	<div class="mask" v-if="ifShow">	
		<transition name="slide-ud">
			<div class="bf" v-if="ifShow">
				<ul class="share-wrap">
					<li class="share-li">
						<div class="iconfont icon-wechat-fill"></div>
						微信	
					</li>	
					<li class="share-li">
						<div class="iconfont icon-QQ"></div>
						QQ
					</li>
				</ul>
				<div class="cancle" @click="$emit('cancle')">
					取消
				</div>				
			</div>			
		</transition>
	</div>
</template>
<script>
export default {
	props:{
		ifShow:{
			type:Boolean,
			default:true,
		},
	},
	data(){
		return {

		}
	},
	methods:{
		cancle(){
			this.ifShow = false;
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
	flex: auto;
	color: #666;
}
.iconfont{
	font-size: 20px;
}
.slide-ud-enter-active {
  transition: all .3s ease;
}
.slide-ud-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-ud-enter, .slide-ud-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  bottom: -50%;
  opacity: 0;
}
</style>