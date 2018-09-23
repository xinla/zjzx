<template>
	<div>
		<multIT :article="item" :ifPublisher="true" v-for="(item,index) in arcList" :key="index"></multIT>
		<prompt-blank v-if="proIf" :mes="proMes"></prompt-blank>
	</div>
</template>

<script>
import multIT from '@/components/news/multIT'
import smaIVT from '@/components/news/smaIVT'
import config from '@/lib/config/config'
import articleService from '@/service/articleService'

export default {
	components:{
		multIT,
		smaIVT,
	},
	mounted(){
		var resAllList = articleService.getCollectArticlePage(1,10);
		if (resAllList&&resAllList.status == "success") {
			this.arcList = resAllList.recordPage.list;
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
	}
}
</script>

<style rel="stylesheet" scoped>

</style>