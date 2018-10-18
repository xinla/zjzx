<template>
	<div @scroll="loadMore">
		<div class="editor bfc-p" v-if="arcList.length">
			<i class="iconfont icon-delete fr" v-if="!ifDeleteAll" @click="ifDeleteAll = true;"></i>
			<div v-else>
				<span @click="deleteAll()" class="deleteAll">删除全部</span>
				<span class="fr" @click="ifDeleteAll = false;">完成</span>		
			</div>
		</div>
		<div class="list-wrap">
			<articleSub v-for="(item,index) in arcList" :article="item" :whi="index" :ifPublisher="true"  @delete="deleteArticle" :key="index"></articleSub>			
		</div>
		<prompt-blank v-if="proIf" :mes="proMes"></prompt-blank>
		<load-more :show-loading="ifLoad"></load-more>
	</div>
</template>

<script>
import articleSub from '@/components/common/articleSub'
import readHistoryService from '@/service/readHistoryService'
import articleService from '@/service/articleService'
export default {
	components:{
		articleSub,
	},
	data(){
		return {
			arcList:[],
			proMes:'',
			proIf:false,
			ifDeleteAll:false,
			page:1,
			lock:false,
			ifLoad:true,
			scrollTop:0,
		}
	},
	activated(){
		this.ifDeleteAll = false;
		this.page = 1;
		this.arcList = [];
		this.init();
	},
	methods:{
		init(){
			this.lock = true;
			this.ifLoad = true;
			let res = readHistoryService.getReadHistory(this.page,10);
			if (res && res.status == "success") {
				if (res.recordPage.list.length) {
					this.proIf = false;
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
		deleteArticle([id,whi,event]){
			// debugger;
			let _this = this;
			this.$vux.confirm.show({
				content:"确定要删除么",
				onConfirm () {
					deleteArt.call(_this,whi);
				}
			})
			event.stopPropagation();
			function deleteArt (whi) {
				let resDelete = readHistoryService.clearHistory([id]);
				if (resDelete && resDelete.status == "success") {
					this.arcList.splice(whi,1);
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
		deleteAll(){
			let _this = this;
			this.$vux.confirm.show({
				content:"确定要删除么",
				onConfirm () {
					deleteA.call(_this);
				}
			});
			this.ifDeleteAll = false;
			function deleteA(){
				let temp = [];
				for (var i = 0,len = this.arcList.length; i < len; i++) {
					temp.push(this.arcList[i].id)
				}
				// console.log(temp)
				let resDelete = readHistoryService.clearHistory(temp);
				if (resDelete && resDelete.status == "success") {
					this.arcList = [];
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
	// beforeRouteEnter (to, from, next) {
	// 	next(vm=>{
	// 		vm.init();
	// 	})
	// }
}
</script>

<style rel="stylesheet" scoped>
	.editor{
		width: 100%;
		color: #aaa;
		line-height: 40px;
	    padding:0 0.3rem;
		border-bottom: 0.02rem solid #e8e8e8;
		z-index: 9;
		background: #eee;
	}
	.deleteAll{
		border: 0.02rem solid #e8e8e8;
		border-radius: 8px;
		padding: 2px 6px;
	}
	.icon-delete{
		font-size: 18px;
	}
	.list-wrap{
		margin-top: 40px;
	}
</style>