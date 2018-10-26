<template>
	<downRefresh class="main-content" @refresh="doRefresh()" @scrolling="loadMore">
		<div>				
			<loading-main v-show="!arcList.length"></loading-main>
			<question v-for="(item,index) in arcList" :article="item" :key="index"></question>
			<load-more v-show="arcList.length && ifLoad" tip="正在加载"></load-more>		
		</div>
	</downRefresh>
</template>

<script>
import downRefresh from '@/components/common/downRefresh'

import articleService from '@/service/articleService'
import interlocutionService from '@/service/interlocutionService'
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
			this.init();			
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
			let resQuestionPage;
			try{
				if(this.classify == 0){
					resQuestionPage = interlocutionService.getQuestionPage(this.page,15);
				}else{
					// resQuestionPage = interlocutionService.getQuestionPage(this.page,15,this.classify);
				}
				if (resQuestionPage && resQuestionPage.status == "success") {
					this.arcList = resQuestionPage.recordPage.list;	
						// debugger
					if (this.total == resQuestionPage.recordPage.totalRow) {
						this.ifNew = true;
					}else{
						this.total = resQuestionPage.recordPage.totalRow;			
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
					text:"已经是最新啦，</br>不妨看看我隔壁的吧~",
					width:"50%",
				});				
			}
		},
		getMore(){
			this.lock = true;
			this.ifLoad = true;
			let resQuestionPage;
			try{
				if(this.classify == 0){
					resQuestionPage = articleService.articlePage(this.page,15);
				}else{
					resQuestionPage = articleService.articlePage(this.page,15,this.classify);
				}
				if (resQuestionPage && resQuestionPage.status == "success") {
					this.arcList = [...this.arcList,...resQuestionPage.recordPage.list];	
					if (resQuestionPage.recordPage.list.length) {
						this.page++;						
					}else{
						this.$vux.toast.show({
							type:"text",
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