<template>
	<div class="main-content" @scroll="loadMore">
		<multIT v-for="(item,index) in arcList" :article="item" :ifPublisher="true"></multIT>
			<!-- <bigIVT :article="item" v-else-if="item.type==2"></bigIVT>	 -->
			<!-- <smaIVT :article="item" v-else="item.type==3"></smaIVT> -->
	</div>
</template>

<script>
import multIT from '@/components/news/multIT'
import bigIVT from '@/components/news/bigIVT'

import articleService from '@/service/articleService'
export default {
	components:{
		multIT,
		bigIVT,
	},
	mounted () {	
		this.$options.methods.getArtList.call(this);
	},
	data(){
		return {
			arcList:[],
			pageSize:1,
			lock:false,
		}
	},
	methods:{
		getArtList(){
			this.lock = true;
			let resArticlePage = articleService.articlePage(this.pageSize,15);
			if (resArticlePage && resArticlePage.status == "success") {
				this.arcList = this.arcList.concat(resArticlePage.recordPage.list);	
				this.pageSize++;
				this.lock = false;

				// console.log(this.arcList);articlePage
			}
		},
		loadMore(){
			if (!this.lock && ($(".main-content").scrollTop() + $(".main-content").height()) > $(".main-content")[0].scrollHeight-350) {
				this.$options.methods.getArtList.call(this);
				console.log(1)
			}
		}
	}
}
</script>

<style rel="stylesheet" scoped>
	.main-content{
		height: 100%;
		overflow-y: auto;
	}
</style>