<template>
	<div class="msg-wrap" @scroll="loadMore">
		<ul class="msg-list">
			<li class="msg-item" v-for="(item,index) in list" @click="toDetail(item.itemid,item.id,item.type)">
				<span class="msg-title oe bfc-d">{{item.title}}</span>
				<badge :text="item.newcount" v-if="item.isnew"></badge>
				<time class="fr">{{ $Tool.publishTimeFormat(item.createtime) }}</time>
			</li>
		</ul>
		<prompt-blank v-if="proIf" :mes="proMes"></prompt-blank>
		<load-more :show-loading="ifLoad"></load-more>
	</div>
	
</template>

<script>
import messageService from '@/service/messageService'
import articleService from '@/service/articleService'
import articleCommentService from '@/service/article_commentService'

import replyCommentList from '@/view/member/replyCommentList'

export default {
	data(){
		return {
			list:[
				{ 
					userid :"接收人id", itemid :"项目id", type :"项目类型", createtime :"最新消息时间", isnew:"是否最新消息", newcount:"最新消息数量",
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
	activated(){
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
			for (let i = 0,len = this.list.length; i < len; i++) {
				if (this.list[i].type == 1) {
					let resActicle = articleService.getArticleById(this.list[i].itemid)
					if (resActicle && resActicle.status == "success") {
						// debugger
						if (resActicle.record) {							
							this.$set(this.list[i],"title",resActicle.record.title)
						}
					}
				} else if (this.list[i].type == 2) {
					let resActicle = articleCommentService.getCommentById(this.list[i].itemid);
					if (resActicle && resActicle.status == "success") {
						if (resActicle.record) {							
							this.$set(this.list[i],"title",resActicle.record.content)
						}
					}
				} else {

				}
			}
			this.lock = false;
			this.ifLoad = false;
		},
		loadMore(e){
			if (!this.lock && ($(e.target).scrollTop() + $(e.target).height()) > e.target.scrollHeight-350) {
				this.init();
				// console.log(1)
			}
		},
		toDetail(id,mesId,type){
			if (type == 1) {
				messageService.readMessage(mesId);
				this.$Tool.goPage({name:"detail",query:{id,}})
				return;
			}
			if(type == 2){
				messageService.readMessage(mesId);
				this.$Tool.goPage({name:"replyCommentList",query:{id,title:'评论详情'}})
				return;
			}
			if (type == 3) {
				messageService.readMessage(mesId);
				this.$Tool.goPage({name:"QADetail",query:{id,}})
				return;
			}
			if(type == 4) {
				messageService.readMessage(mesId);
				this.$Tool.goPage({name:"other",query:{id,}})
				return;
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
		width: 100%;
		height: calc( 100vh - .87rem );
		overflow-y: auto;
		padding: 0 .2rem;
		background-color: #fff;
		.msg-list {
			width: 100%;
			.msg-item {
				line-height:30px;
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
		max-width: 60%;
	}
	.vux-badge{
		vertical-align: top;
	}
</style>