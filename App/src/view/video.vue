<template>
	<div>
		<home-header></home-header>
		<down-refresh @refresh="init()">
			<div class="main-content" @scroll="loadMore">
				<loading-main v-show="ifLoad"></loading-main>
				<z-video 
				ref="zjzx-video"
				v-for="(item,index) in arcList" 
				:article="item" 
				:key="index"
				:whi="index"
				@allPause="doAllPause"
				>
				</z-video>
			</div>			
		</down-refresh>
	</div>
</template>

<script>
import homeHeader from '@/components/headerBar'
import zVideo from '@/components/common/video'
import downRefresh from '@/components/common/downRefresh'

import articleService from '@/service/articleService'
export default {
	components:{
		homeHeader,
		zVideo,
		downRefresh,
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
	mounted(){
		this.$nextTick(()=>{
			this.init();
			this.ifLoad = false;			
		})
	},
	methods:{
		init(){
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
				this.init();
			}
			this.scrollTop = $(e.target).scrollTop();
		},
		doAllPause(whi){
			this.$refs['zjzx-video'].forEach((item,index)=>{
				if (whi != index) {
					item.pause();					
				}
			});
		}
	},
	watch:{
		$route(){
			$(".main-content").scrollTop(this.scrollTop);
		}
	}
}
</script>

<style rel="stylesheet" scoped>
	.main-content{
		height: calc(100vh - 45px);
		overflow-y: auto;
		background: #fff;
	}
</style>