<template>
	<div>
		<keep-alive>
			<router-view></router-view>			
		</keep-alive>
		<div class="footer-nav">
			<div class="footer-item">
				<router-link to="/home" exact>
					<i class="iconfont icon-index footer-icon"></i>
					<span class="footer-text">首页</span>
				</router-link>
			</div>
			<div class="footer-item">
				<router-link :to="{path:'/questionAnswer'}" exact>
					<i class="iconfont icon-xiaoxi footer-icon"></i>
					<span class="footer-text">问答</span>
				</router-link>
			</div>
			<div class="footer-item">
				<router-link :to="{path:'/video'}" exact>
					<i class="iconfont icon-shipin footer-icon"></i>
					<span class="footer-text">今日真相</span>
				</router-link>
			</div>
			<div class="footer-item">
				<router-link :to="{path:'/member'}" exact>				
					<i class="iconfont icon-wode footer-icon">
						<badge :text="newMes" class="bfc-p" v-if="newMes"></badge>
					</i>
					<span class="footer-text">我的</span>
				</router-link>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	// data(){
	// 	return{
	// 		newMes:''
	// 	}
	// }
	computed:{
		newMes(){
			return this.$store.state.newMes || this.$store.state.newVersion;
		}
	}
}
</script>
<style lang="less" scoped>
	.footer-nav{
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		text-align: center;
		overflow: hidden;
		background-color: #fff;
		border-top: .02rem solid @borderColor;
		.footer-item {
			float: left;
			width: 25%;
			height: .88rem;
      color: #666;
			.footer-icon {
        padding-top: .08rem;
				display: block;
				font-size: .4rem;
			}
			.footer-text{
        display: block;
        margin-top: .05rem;
				font-size: .24rem;

			}
		}
		.footer-item a.router-link-active,.current{
			color: @mainColor;
		}
	}
</style>
