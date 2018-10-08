<template>
	<!-- 文章动态通知 -->
	<ul class="article">
		<li class="article-li" v-for="(item,index) in list">
			{{ item.itemid }}
			<badge></badge>
		</li>
	</ul>
</template>

<script>
import messageService from '@/service/messageService'
export default {
	data(){
		return {
			page:1,
			size:20,
			list:[
				{ 
					userid :"接收人id", itemid :"项目id", type :"项目类型", createtime :"最新消息时间", isnew:"是否最新消息", newcount:"最新消息数量" 
				}
			],
		}
	},
	mounted(){
		this.init();
	},
	// activated(){
	// 	this.init();
	// },
	methods:{
		init(){
			let res = messageService.getMessagePage(this.page,this.size);
			if (res && res.status == "success") {
				this.list = res.recordPage.list;
				this.list.push({ 
					userid :"接收人id", itemid :"项目id", type :"项目类型", createtime :"最新消息时间", isnew:"是否最新消息", newcount:"最新消息数量" 
				})
				console.log(1)
			}
		}
	},
	beforeRouteEnter (to, from, next) {
		if (!localStorage.id ) { 
            GoTruth.$Tool.loginPrompt(); 
        }else{
          	next();
        } 
	}
}
</script>

<style lang="less" scoped>
	.article{
		background:#fff;
		padding-bottom: 0;
	}
	.article-li{
		line-height: 30px;
		border-bottom: .02rem solid @borderColor;

		&:last-child{
			border: none;
		}
	}
</style>