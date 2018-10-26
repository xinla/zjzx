<template>
	<div class="swiperNav">
		<ul class="nav">
			<router-link :to="{path:'recommend',}" class="nav-item" tag="li">推荐</router-link>
			<router-link :to="{path:'fangpian',}" class="nav-item" v-for="(item,index) in classfyList" :key="item.classifyname" tag='li'>
				{{item.classifyname}}
			</router-link>
		</ul>
		<router-link to="/more">
			<div class="nav-add">
				<i class="iconfont">&#xe610;</i>
			</div>
		</router-link>

	</div>
</template>
<script>
import articleClassifyService from '@/service/article_classifyService'

	export default {
		name:'homeNav',
		components:{
			
		},
		data() {
			return {
		        classfyList:[],
			}
		},
		mounted(){
			this.$nextTick(()=>{
				articleClassifyService.getArticleClassifyList(data=>{
					if (data && data.status == "success") {
						this.classfyList = data.result.classfyList;					
						// console.log(this.classfyList)
					}
				});
			})
		}
	}
</script>
<style lang="less" scoped>
::-webkit-scrollbar {
	    display: none;
	}
	.swiperNav {
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		margin-top: @headerHeight;
		border-bottom:.01rem solid @borderColor;
		overflow: hidden;
		// text-align: center;
		background-color: #fff;
		.nav{
			overflow-x: auto;
			height: @navHeight;
			line-height: @navHeight;
			white-space: nowrap;
			width: calc(100% - @navHeight);
			.nav-item {
				text-align: center;
				width: 17%;
				display: inline-block;
				font-size: .3rem;
			}
			.nav-item.active {
				color:@mainColor;
				font-weight: 600;
			}
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
		
		.router-link-active{
			color:@currentColor;
		}
		
	}
</style>
