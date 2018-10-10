<template>
	<div class="msg-wrap" @scroll="loadMore">
		<ul class="msg-list">
			<!-- <li class="msg-tip" v-if="!list.length">
				<div class="msg-tip-box">
					<i class="iconfont icon-nomsg"></i>
					<p class="msg-tip-desc">暂无消息通知</p>
				</div>				
			</li> -->
			<li class="msg-item" v-for="(item,index) in list">
				<span class="msg-title oe bfc-d">sdgsg aasfafeaea ewaerawe dgsfgesfsafsfea <!-- {{item.title}} --></span>
				<badge></badge>
			</li>
		</ul>
		<prompt-blank v-if="proIf" :mes="proMes"></prompt-blank>
		<load-more :show-loading="ifLoad"></load-more>
	</div>
	
</template>

<script>
import messageService from '@/service/messageService'
import articleService from '@/service/articleService'

export default {
	data(){
		return {
			list:[
				{ 
					userid :"接收人id", itemid :"项目id", type :"项目类型", createtime :"最新消息时间", isnew:"是否最新消息", newcount:"最新消息数量" 
				}
			],
			proMes:'',
			proIf:false,
			ifDeleteAll:false,
			page:1,
			lock:false,
			ifLoad:true,
		}
	},
	mounted(){
		this.$nextTick(()=>{
			this.page = 1;
			this.list = [];
			this.init();
		})		
	},
	methods:{
		init(){
			this.lock = true;
			this.ifLoad = true;
			let res = messageService.getMessagePage(this.page,20);
			if (res && res.status == "success") {
				if (res.recordPage.list.length) {
					this.page++;						
					this.list = this.list.concat(res.recordPage.list);					
				}else if (this.list.length == 0) {
					this.proIf = true;
					this.proMes = "您想要的真相消失啦~~~";
				}
			} else {
				this.proIf = true;
				this.proMes = "请求失败，请稍后再试！"
			}
			for (var i = 0,len = this.list.length; i < len; i++) {
				if (this.list[i].type == 1) {
					let res = articleService.getArticleById(this.list[i].itemid)
					if (res && res.status == "success") {
						this.$set(this.list,"title",res.record.title)
					}
				} else if (this.list[i].type == 2) {

				} else {

				}
			}
			this.lock = false;
			this.ifLoad = false;
		},
		loadMore(e){
			if (!this.lock && ($(e.target).scrollTop() + $(e.target).height()) > e.target.scrollHeight-350) {
				this.init();
				console.log(1)
			}
		},
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
	.msg-title{
		width: 60%;
		line-height:30px;
	}	
</style>