<template>
	<div>
		<multIT :article="item" :ifPublisher="true" v-for="(item,index) in arcList" :key="index"></multIT>
		<prompt-blank v-if="proIf" :mes="proMes"></prompt-blank>
	</div>
</template>

<script>
import articleService from '@/service/articleService'
export default {
	mounted(){
	},
	data(){
		return {
			arcList:[],
			proMes:'',
			proIf:false,
		}
	},
	methods:{
		init(){
			var resAllList = articleService.getArticleByUser(1,10);
			if (resAllList&&resAllList.status == "success") {
				this.arcList = resAllList.result.recordPage.list;			
				if (this.arcList.length == 0) {
					this.proIf = true;
					this.proMes = "您想要的真相消失啦~~~";
				}
			} else {
				this.proIf = true;
				this.proMes = "请求失败，请稍后再试！"
			}
		},
	},
	beforeRouteEnter (to, from, next) {
		next(vm=>{
			vm.init();
		})
	}
}
</script>

<style rel="stylesheet" scoped>

</style>