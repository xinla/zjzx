<template>
	<downRefresh class="main-content" @refresh="getArtList()"  @scrolling="loadMore">
		<div>				
			<loading-main v-show="!arcList.length"></loading-main>
			<multIT v-for="(item,index) in arcList" :article="item" :ifPublisher="true" :key="index"></multIT>
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
		if (!this.classify) {
			this.getArtList();			
		}
	},
	data(){
		return {
			arcList:[],
			pageSize:1,
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
				resArticlePage = articleService.articlePage(this.pageSize,15);
			}else{
				resArticlePage = articleService.articlePage(this.pageSize,15,this.classify);
			}
			if (resArticlePage && resArticlePage.status == "success") {
				this.arcList = this.arcList.concat(resArticlePage.recordPage.list);	
				this.pageSize++;
				this.lock = false;
				this.ifLoad = false;
				// console.log(this.arcList);articlePage
			}
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
		},
		show(val){
			if (val) {				
				this.getArtList();
				// this.ifLoad = false;
				// console.log(1)
			}
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