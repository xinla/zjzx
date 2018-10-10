<template>
	<div @scroll="loadMore">
		<multIT :article="item" :ifPublisher="true" v-for="(item,index) in arcList" :key="index"></multIT>
		<prompt-blank v-if="proIf" :mes="proMes"></prompt-blank>
		<load-more :show-loading="ifLoad"></load-more>
	</div>
</template>

<script>
import articleService from '@/service/articleService'

export default {
	data(){
		return {
			arcList:[],
			proMes:'',
			proIf:false,
			page:1,
			lock:false,
			ifLoad:true,
			scrollTop:0,
		}
	},
	activated(){
		this.$nextTick(()=>{
			this.page = 1;
			this.init();
		})
	},
	methods:{
		init(){
			this.lock = true;
			this.ifLoad = true;
			var res = articleService.getCollectArticlePage(this.page,10);
			if (res&&res.status == "success") {
				if (res.recordPage.list.length) {
					this.page++;						
					this.arcList = this.arcList.concat(res.recordPage.list);					
				}else if (this.arcList.length == 0) {
					this.proIf = true;
					this.proMes = "您想要的真相消失啦~~~";
				}
			} else {
				this.proIf = true;
				this.proMes = "请求失败，请稍后再试！"
			}
			this.lock = false;
			this.ifLoad = false;
		},
		loadMore(e){
			if (!this.lock && ($(e.target).scrollTop() + $(e.target).height()) > e.target.scrollHeight-350) {
				this.init();
				console.log(1)
			}
		},
	}
}
</script>

<style rel="stylesheet" scoped>

</style>