<template>
	<downRefresh class="main-content" @refresh="doRefresh()" @scrolling="loadMore">
		<div>				
			<loading-main v-show="!arcList.length"></loading-main>
			<multIT v-for="(item,index) in arcList" :article="item" :key="index"></multIT>
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
		this.$nextTick(()=>{
			if (!this.classify) {
				this.init();				
			}
		})
	},
	data(){
		return {
			arcList:[],
			page:1,
			lock:false,
			ifLoad:true,
			scrollTop:0,	
			total:0,
			ifNew:false,		
		}
	},
	methods:{
		init(){
			let resArticlePage;
			try{
				if(this.classify == 0){
					resArticlePage = articleService.articlePage(this.page,15);
				}else{
					resArticlePage = articleService.articlePage(this.page,15,this.classify);
				}
				if (resArticlePage && resArticlePage.status == "success") {
					this.arcList = resArticlePage.recordPage.list;	
						// debugger
					if (this.total == resArticlePage.recordPage.totalRow) {
						this.ifNew = true;
					}else{
						this.total = resArticlePage.recordPage.totalRow;			
					}
						this.page++;						
					// console.log(this.arcList);
				}				
			}finally{	
				this.lock = false;
				this.ifLoad = false;			
			}
		},
		doRefresh(){
			this.page = 1;
			this.init();
			if (this.ifNew) {
				this.$vux.toast.show({
					type:"text",
					time:800,
					text:"已经是最新内容啦",
					width:"50%",
				});				
			}
		},
		getMore(){
			this.lock = true;
			this.ifLoad = true;
			let resArticlePage;
			try{
				if(this.classify == 0){
					resArticlePage = articleService.articlePage(this.page,15);
				}else{
					resArticlePage = articleService.articlePage(this.page,15,this.classify);
				}
				if (resArticlePage && resArticlePage.status == "success") {
					this.arcList = [...this.arcList,...resArticlePage.recordPage.list];	
					if (resArticlePage.recordPage.list.length) {
						this.page++;						
					}else{
						this.$vux.toast.show({
							type:"text",
							time:800,
							text: '暂无更多，不妨到我隔壁去看看吧~',
							width:"auto",
						});						
					}
					// console.log(this.arcList);
				}				
			}finally{
				this.lock = false;
				this.ifLoad = false;				
			}
		},
		loadMore(e){
			if (!this.lock && ($(e.target).scrollTop() + $(e.target).height()) >= e.target.scrollHeight) {
				this.getMore();
			}
			this.scrollTop = $(e.target).scrollTop();
		},

	},
	watch:{
		$route(){
			$(".main-content").eq(this.classify).scrollTop(this.scrollTop);
		},
		show(){
			this.init();				
		}
	}
}
</script>

<style rel="stylesheet" scoped>
	.main-content{
		position: relative;
		height: calc(100vh - 2.7rem);
		overflow: hidden;
		overflow-y: auto;
		/*// padding: 0 .3rem;
		// padding-bottom: .3rem;*/
	}
	.refresh{
		background: #fafafa;
		overflow: hidden;
	}
	.animate{
		transition: all .5s;
	}
</style>