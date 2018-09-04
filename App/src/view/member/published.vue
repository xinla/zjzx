<template>
	<div>
		<template v-for="(item,index) in arcList">
			<multIT :article="item" v-if="item.type==1"></multIT>
			<bigIVT :article="item" v-else="item.type==2"></bigIVT>	
		</template>
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
		this.arcList = resAllList.result.recordPage.list;
		console.log(resAllList.result.recordPage.list)
	},
	data(){
		return {
			arcList:[],
		}
	}
}
</script>

<style rel="stylesheet" scoped>

</style>