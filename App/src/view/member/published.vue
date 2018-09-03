<template>
	<div>
		<multIT></multIT>
		<multIT></multIT>
		<smaIVT></smaIVT>
		<bigIVT></bigIVT>
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
		console.log(resAllList)
	}
}
</script>

<style rel="stylesheet" scoped>

</style>