<template>
	<div class="msg-wrap">
		<ul class="msg-list">
			<li class="msg-tip" v-if="tipShow">
				<div class="msg-tip-box">
					<i class="iconfont icon-nomsg"></i>
					<p class="msg-tip-desc">暂无消息通知</p>
				</div>
				
			</li>
			<li class="msg-item" v-for="(item,index) in list" v-if="msgShow">
				{{item.itemid}}<badge></badge>
			</li>
		</ul>
	</div>
	
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
			tipShow:false,
			msgShow:false
		}
	},
	mounted(){
		this.$nextTick(()=>{
			this.init();
			if(!this.list.itemid){
				this.tipShow = true;
				this.msgShow = false;
			}else{
				this.tipShow = false;
				this.msgShow = true;
			}
		})
		
	},
	methods:{
		init(){
			let res = messageService.getMessagePage(this.page,this.size);
			if (res && res.status == "success") {
				this.list = res.recordPage.list;
				this.list.push({ 
					userid :"接收人id", itemid :"项目id", type :"项目类型", createtime :"最新消息时间", isnew:"是否最新消息", newcount:"最新消息数量" 
				})
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
	.msg-wrap{
		margin-top: @topHeigth;
		width: 100%;
		height: calc( 100vh - .87rem );
		overflow-y: auto;
		padding: 0 .2rem;
		background-color: #fff;
		.msg-list {
			width: 100%;
			.msg-item {
				padding: .3rem 0;
				border-bottom: .02rem solid @borderColor;
			}
			.msg-tip {
				width: 100%;
				height: calc( 100vh - .87rem );
				text-align: center;
				color: #ccc;
				.msg-tip-box{
					position: relative;
					top: 25%;
					.iconfont{
						font-size: 1.2rem;
					}
					.msg-tip-desc{
						padding: .4rem 0;
						letter-spacing: .04rem;
					}
				}


			}

		}
	}	
</style>