<template>
	<downRefresh class="main-content" @refresh="getArtList()"  @scrolling="loadMore">
		<div>				
			<loading-main v-show="!arcList.length"></loading-main>
			<multIT v-for="(item,index) in arcList" :article="item" :key="index"></multIT>
			<!-- <bigIVT :article="item" v-else-if="item.type==2"></bigIVT>	 -->
			<!-- <smaIVT :article="item" v-else="item.type==3"></smaIVT> -->
			<load-more v-show="arcList.length && ifLoad" tip="正在加载"></load-more>				
		</div>
	</downRefresh>
</template>

<script>
import downRefresh from '@/components/common/downRefresh'

import articleService from '@/service/articleService'
export default {
	components:{
		downRefresh,
	},
	props:{
		classify:{
			type:Number,
			default:0,
		},
		show:{
			type:Boolean,
			default:false,
		}
	},
	mounted () {
		this.getArtList();			
	},
	data(){
		return {
			arcList:[],
			page:1,
			lock:false,
			ifLoad:true,
			scrollTop:0,			
		}
	},
	methods:{
		getArtList(){
			this.lock = true;
			this.ifLoad = true;
			let resArticlePage;
			if(this.classify == 0){
				resArticlePage = articleService.articlePage(this.page,15);
			}else{
				resArticlePage = articleService.articlePage(this.page,15,this.classify);
			}
			if (resArticlePage && resArticlePage.status == "success") {
				this.arcList = this.arcList.concat(resArticlePage.recordPage.list);	
				this.page++;
				// console.log(this.arcList);articlePage
			}
			this.lock = false;
			this.ifLoad = false;
		},
		loadMore(e){
			if (!this.lock && ($(e.target).scrollTop() + $(e.target).height()) > e.target.scrollHeight-350) {
				this.$options.methods.getArtList.call(this);
			}
			this.scrollTop = $(e.target).scrollTop();
			// console.log(this.scrollTop);
		},

	},
	watch:{
		$route(){
			$(".main-content").eq(this.classify).scrollTop(this.scrollTop);
		}
	}
}
</script>

<style rel="stylesheet" scoped>
	.main-content{
		position: relative;
		height: calc(100vh - 130px);
		overflow-y: auto;
		padding:0 0.5em;
	}
	.refresh{
		background: #fafafa;
		overflow: hidden;
	}
	.animate{
		transition: all .5s;
	}
</style>