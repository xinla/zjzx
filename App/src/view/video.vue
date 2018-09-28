<template>
	<down-refresh @refresh="getArtList()">
		<div class="main-content" @scroll="loadMore">
			<loading-main v-show="ifLoad"></loading-main>
			<z-video v-for="(item,index) in arcList" :article="item" :ifPublisher="true" :key="index"></z-video>
		</div>			
	</down-refresh>
</template>

<script>
import zVideo from '@/components/common/video'
import downRefresh from '@/components/common/downRefresh'

import articleService from '@/service/articleService'
export default {
	components:{
		zVideo,
		downRefresh,
	},
	data(){
		return {
			arcList:[],
			pageSize:1,
			lock:false,
			ifLoad:true,

		}
	},
	mounted(){
		this.$options.methods.getArtList.call(this);
		this.ifLoad = false;
	},
	methods:{
		getArtList(){
			this.lock = true;
			let resArticlePage;
				resArticlePage = articleService.articlePage(this.pageSize,15,'',2);
			// if(this.classify == 0){
			// }
			// else{
			// 	resArticlePage = articleService.articlePage(this.pageSize,15,this.classify);	
			// }
			if (resArticlePage && resArticlePage.status == "success") {
				this.arcList = this.arcList.concat(resArticlePage.recordPage.list);	
				this.pageSize++;
				this.lock = false;
				// console.log(this.arcList);articlePage
			}
		},
		loadMore(e){
			if (!this.lock && ($(e.target).scrollTop() + $(e.target).height()) > e.target.scrollHeight-350) {
				this.$options.methods.getArtList.call(this);
				// console.log(1)
			}
		},
	}
}
</script>

<style rel="stylesheet" scoped>
	.main-content{
		height: calc(100vh - 90px);
		overflow-y: auto;
	}
</style>