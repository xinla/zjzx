<template>
	<div>
		<template v-for="(item,index) in arcList">
			<multIT :article="item" :whi="index" v-if="item.type==1" :ifPublisher="false" @delete="deleteArticle"></multIT>
			<bigIVT :article="item" v-else="item.type==2"></bigIVT>	
		</template>
		<prompt-blank v-if="proIf" :mes="proMes"></prompt-blank>
	</div>
</template>

<script>
import multIT from '@/components/news/multIT'
import smaIVT from '@/components/news/smaIVT'
import bigIVT from '@/components/news/bigIVT'
import config from '@/lib/config/config'

import articleService from '@/service/articleService'

export default {
	components:{
		multIT,
		smaIVT,
		bigIVT,
	},
	mounted(){
		var resAllList = articleService.getArticleByUser(1,10);
		if (resAllList&&resAllList.status == "success") {
			this.arcList = resAllList.result.recordPage.list;			
			if (this.arcList.length == 0) {
				this.proIf = true;
				this.proMes = "啥都没有啊";
			}
		} else {
			this.proIf = true;
			this.proMes = "请求失败，请稍后再试！"
		}
		// console.log(resAllList)
	},
	data(){
		return {
			arcList:[],
			proMes:'',
			proIf:false,
		}
	},
	methods:{
		deleteArticle([id,whi]){
			let _this = this;
			this.$vux.confirm.show({
				content:"确定要删除么",
				onConfirm () {
					deleteArt.call(_this,whi);
				}
			})
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
					setTimeout(()=>{
						this.$vux.alert.hide();
					},1000)
				}
			}

		}
	}
}
</script>

<style rel="stylesheet" scoped>

</style>