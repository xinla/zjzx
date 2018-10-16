<template>
	<div @scroll="loadMore">
		<!-- <div class="editor bfc-o">
			<i class="iconfont icon-delete fr" v-if="!ifDeleteAll" @click="ifDeleteAll = true;"></i>
			<div v-else>
				<span @click="deleteAll()" class="deleteAll">删除全部</span>
				<span class="fr" @click="ifDeleteAll = false;">完成</span>					
			</div>
		</div> -->
		<multIT v-for="(item,index) in arcList" :article="item" :whi="index" detailType=1 :ifPublisher="false" :ifDel="true" @delete="deleteArticle" :key="index"></multIT>
			<!-- <bigIVT :article="item" v-else="item.type==2"></bigIVT>	 -->
		<prompt-blank v-if="proIf" :mes="proMes"></prompt-blank>
		<load-more :show-loading="ifLoad"></load-more>
	</div>
</template>

<script>

import articleService from '@/service/articleService'

export default {
	data(){
		return {
			userId:0,
			arcList:[],
			proMes:'',
			proIf:false,
			page:1,
			lock:false,
			ifLoad:true,
		}
	},
	activated(){
		this.userId = this.$route.query.userId;
		this.page = 1;
		this.arcList = [];
		this.init();
	},
	methods:{
		init(){
			this.lock = true;
			this.ifLoad = true;
			var res = articleService.getArticleByUser(this.userId,this.page,10,1);
			if (res&&res.status == "success") {
				if (res.result.recordPage.list.length) {
					this.page++;
					// console.log(this.page)					
					this.arcList = this.arcList.concat(res.result.recordPage.list);	
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
		deleteArticle([id,whi,event]){
			let _this = this;
			this.$vux.confirm.show({
				content:"确定要删除么",
				onConfirm () {
					deleteArt.call(_this,whi);
				}
			})
			event.stopPropagation();
			function deleteArt (index) {
				let resDelete = articleService.deleteArticleById(id);
				if (resDelete && resDelete.status == "success") {
					this.arcList.splice(index,1);
					this.$vux.alert.show({
					  content:'删除成功',
					})
					setTimeout(()=>{
						this.$vux.alert.hide();
					},1000)
				} else {
					this.$vux.alert.show({
					  content:'删除失败，请重试！',
					})
				}
				// console.log(this.arcList)
			}

		},
		loadMore(e){
			if (!this.lock && ($(e.target).scrollTop() + $(e.target).height()) > e.target.scrollHeight-350) {
				this.init();
				// console.log(1)
			}
		},

	},
	// watch:{
	// 	arcList(){
	// 		this.getArticleInfo();	
	// 	}
	// },
	// beforeRouteEnter (to, from, next) {
	// 	next(vm=>{
	// 		vm.init();
	// 	})
	// }
}
</script>

<style rel="stylesheet" scoped>
	.editor{
		color: #aaa;
		line-height: 40px;
	    padding:0 0.3rem;
		border-bottom: 0.02rem solid #e8e8e8;
	}
	.deleteAll{
		border: 0.02rem solid #e8e8e8;
		border-radius: 8px;
		padding: 2px 6px;
	}
	.icon-delete{
		font-size: 18px;
	}
</style>