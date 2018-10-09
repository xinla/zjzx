<template>
	<div>
		<div class="editor bfc-o">
			<i class="iconfont icon-delete fr" v-if="!ifDeleteAll" @click="ifDeleteAll = true;"></i>
			<div v-else>
				<span @click="deleteAll()" class="deleteAll">删除全部</span>
				<span class="fr" @click="ifDeleteAll = false;">完成</span>					
			</div>
		</div>
		<multIT :article="item" :ifPublisher="true" v-for="(item,index) in arcList" :ifDel="true" @delete="deleteArticle" :key="index"></multIT>
		<prompt-blank v-if="proIf" :mes="proMes"></prompt-blank>
	</div>
</template>

<script>
import readHistoryService from '@/service/readHistoryService'
export default {
	activated(){
		this.init();
	},
	data(){
		return {
			arcList:[],
			proMes:'',
			proIf:false,
			ifDeleteAll:false,
		}
	},
	methods:{
		init(){
			readHistoryService.getReadHistory(1,10,data=>{
				if (data && data.status == "success") {
					this.arcList = data.recordPage.list;			
					if (this.arcList.length == 0) {
						this.proIf = true;
						this.proMes = "您想要的真相消失啦~~~";
					}
				} else {
					this.proIf = true;
					this.proMes = "请求失败，请稍后再试！"
				}
				
			});
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
				let resDelete = readHistoryService.clearHistory([id]);
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
		deleteAll(){
			let _this = this;
			this.$vux.confirm.show({
				content:"确定要删除么",
				onConfirm () {
					deleteA.call(_this);
				}
			})
			function deleteA(){
				let temp = [];
				for (var i = 0,len = this.arcList.length; i < len; i++) {
					temp.push(this.arcList[i].id)
				}
				console.log(temp)
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
		}
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