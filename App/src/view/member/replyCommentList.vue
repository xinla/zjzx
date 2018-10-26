<template>
		<div class="comment-main">	
			<!-- 回复列表 -->
			<transition name="slide-ud">
				<!-- v-scrollLoad="scrollBotLoad" -->
				<div class="reply-wrap" @scroll="scrollBotLoad" >
					<div class="reply-li bfc-o">
						<div class="uphoto-wrap fl">
							<img class="uphoto" :src="commentUser.imageurl?(fileRoot+commentUser.imageurl):imgurl" alt="">
						</div>
						<div class="comment-detail">				
							<p>
								<span class="uname oe bfc-d">{{commentUser.username}}</span>
								<button type="button" class="focus-b bfc-p" v-if="userId != commentMian.douserid" @click="doFocus">
								{{replyUserFocusState?'已关注':'关注'}}
							</button>
							</p>	
							<p class="ucomment">{{commentMian.content}}</p>
							<div>
								<div>
									<!-- <button type="button" class="reply reply-btn" @click="">回复</button>&nbsp;-&nbsp; -->
									<div class="reply reply-sh">
										<div>
											<time v-text="$Tool.publishTimeFormat(commentMian.commenttime)"></time>	
											<i class="iconfont icon-warning-circle report-comment-btn" @click="report()"></i>		
											<!-- <span>-</span> -->
											<span class="rep-show">
												<var>{{commentUser.likeNum || 0}}</var>人赞过
											</span>
										</div>
									</div>
								</div>	
							</div>
						</div>
					</div>
					<!-- 评论的回复列表 -->					
					<ul class="reply-main">
						<li class="reply-li bfc-o" v-for="(item,index) in replyList">
							<div class="uphoto-wrap fl">
								<img class="uphoto" :src="item.imageurl?(fileRoot+item.imageurl):imgurl" alt="">
							</div>
							<div class="comment-detail">				
								<p>
									<span class="uname oe bfc-d">{{item.username}}</span>
									<span class="delComment fr" v-if="item.douserid == userId" @click="deleteCom(item.id,index,2)">删除</span>
								</p>	
								<p class="ucomment">{{item.content}}</p>
								<div>
									<div>
										<!-- <button type="button" class="reply reply-btn" @click="">回复</button>&nbsp;-&nbsp; -->
										<button type="button" class="reply reply-sh">
											<time v-text="$Tool.publishTimeFormat(item.commenttime)"></time>
											<span>-</span>
											<span class="rep-show" @click="replySb(item.username)">
												<var>{{item.replyCount || 0}}</var>回复
											</span>
										</button>
									</div>	
								</div>
							</div>
						</li>
					</ul>
				</div>
			</transition>
			<!-- 真评论框 -->
			<div class="comment-form bf">
				<div class="input-commnet-wrap">
					<input type="text" class="input-commnet-content" v-model="commentCon" maxlength="100" autofocus placeholder="留下你的高见">	
				</div>
				<input type="button"class="submit-comment" value="发布" @click="comment()">
			</div>								
			<!-- 举报 -->
			<transition name="slide-ud">
				<div class="report-wrap bf" v-if="ifReport">
					<group title="选择举报类别">
					    <radio :options="reportList" fill-mode :selected-label-style="{color:'#f40'}" @radio-checked-icon-color="" @on-change="changeReport"></radio>
					</group>
					<div class="ac">
						<button type="button" class="report-btn" @click="reportCancle">取消</button>
						<button type="button" class="report-btn" @click="reportConfirm">确定</button>
					</div>
				</div>
			</transition>
		</div>
</template>

<script>
import config from '@/lib/config/config'

import listUtil from '@/service/util/listUtil'
import userService from '@/service/userService'
import followService from '@/service/followService'
import praiseService from '@/service/praiseService'
import reportService from '@/service/reportService'
import articleService from '@/service/articleService'
import readHistoryService from '@/service/readHistoryService'
import articleFileService from '@/service/article_fileService'
import articleCommentService from '@/service/article_commentService'
import articleCollectService from '@/service/articleCollectService'
import shareService from '@/service/shareService'
import messageService from '@/service/messageService'
export default {
	data(){
		return{
			replyCommentId:0,
			userId:localStorage.id,
			commentMian:{
				content:"评论/回复内容",
				douserid:"评论人id",
				commenttime:"评论/回复时间",
			},
			commentUser:{

			},
			ifCommentSwitch:false,
			commentCon:"",
			//三级回复@的用户名
			commentConAdd:'',
			replyUserFocusState:false,
			imgurl:require('@/assets/images/userPhoto.jpg'),
			fileRoot:config.fileRoot+'/',
			replyList:[],
			//举报显隐
			ifReport:false,
			//举报数组
			reportList:[
				{
					key:1,
					value:"暴力，反动"
				},
				{
					key:2,
					value:"涉黄，污秽"
				},
				{
					key:3,
					value:"违法，造谣"
				},
			],
			reportInfo:{
				reportreasion:'',//"举报原因"，
				reporttime:'',//"举报时间" ,
				// itemid:'',//"对象id",
				// reportuserid:'',//"被举报人id",
				// type:'',//"类型"  1.文章举报  
			},
		}
	},
	// props:{
	// 	replyCommentId:{
	// 		type:Number,
	// 		default:0,
	// 	},
	// 	replyUserId:{
	// 		type:Number,
	// 		default:0,
	// 	}
	// },
	activated(){

	},
	mounted(){
		// this.replyCommentId = this.$route.query.id;
		// this.init();
	},
	methods:{
		init(){
			if (!this.replyCommentId) {
				this.$vux.alert.show({
					  content: '获取出错，请返回！',
					})
				this.$Tool.goBack();
				return;
			}
			let res = articleCommentService.getCommentById(this.replyCommentId);
			if (res && res.status == "success") {
				this.commentMian = res.record;
				console.log(this.commentMian)
			}
			//获取发布人信息
			let resUserInfo = userService.getUserById(this.commentMian.douserid);
			if (resUserInfo && resUserInfo.status == "success") {
				this.commentUser = resUserInfo.result.user;
			}
			//获取评论点赞量
			let resGetPraiseCount = praiseService.getPraiseCount(this.replyCommentId,2);
			if (resGetPraiseCount && resGetPraiseCount.status == "success") {
				// item.likeNum = resGetPraiseCount.result.count;
				this.$set(this.commentMian,"likeNum",resGetPraiseCount.result.count);
			}
			this.loadReply();
			this.ifFocus();
		},
		loadReply(){
			//获取文章评论回复列表
			let resReplyList = articleCommentService.getReplyList(this.replyCommentId,1,10)
			if (resReplyList && resReplyList.status == "success") {
				this.replyList = resReplyList.recordPage.list;
				//获取回复人信息
				for (var i = 0,len = this.replyList.length; i < len; i++) {
					let resUserInfo = userService.getUserById(this.replyList[i].douserid);
					if (resUserInfo && resUserInfo.status == "success") {
						this.replyList[i].imageurl = resUserInfo.result.user.imageurl;
						this.replyList[i].username = resUserInfo.result.user.username;
					}
					//获取回复数量
					// let resReplyCount = articleCommentService.getReplyCount(this.replyList[i].commentid);
					// if (resReplyCount && resReplyCount.status == "success") {
					// 	this.replyList[i].replyCount = resReplyCount.result.count;
					// }	
					
				}
			}
		},
		// 是否关注发布人
		ifFocus(){
			if (!localStorage.id ) { return;}
			let resTestFollow = followService.testFollow(this.commentMian.douserid);
			if (resTestFollow && resTestFollow.status == "success") {
				if (resTestFollow.result == 1) {
					this.replyUserFocusState = true;
				} else {
					this.replyUserFocusState = false;
				}
			}			
		},
		doFocus(){
			// 关注/取消关注
			if (!localStorage.id ) { this.$Tool.loginPrompt(); return; }
			this.$loading.open();
			let resFocusState = followService.doFollow(this.commentMian.douserid);
			if (resFocusState && resFocusState.status == "success") {
				if (resFocusState.result == 1) {
					this.replyUserFocusState = true;
				} else {
					this.replyUserFocusState = false;
				}
			}else{
				this.$vux.alert.show({
				  content:'关注失败，请重试',
				})
			}	
			this.$loading.close();	
		// console.log(this.focusState)

		},
		comment(){
			if (!localStorage.id ) { this.$Tool.loginPrompt(); return; }
			let userId = localStorage.id;
			if (this.commentCon && this.$Tool.checkInput(this.commentCon)){
				let comment = this.commentConAdd?(this.commentCon + this.commentConAdd):this.commentCon;
				//执行发送评论回复
				let resACommentReply = articleCommentService.articleComment(this.commentMian.articleid,comment,userId,this.commentMian.douserid,2,this.replyCommentId);	
				if (resACommentReply && resACommentReply.status == "success") {
					this.commentCon = "";
					this.commentConAdd = "";
					// this.commentList[this.commentIndex].replyCount ++;
					// this.ifReply = true;
					this.loadReply();
					$(".reply-wrap").animate({scrollTop:0},100);
					
				} else {
					this.$vux.alert.show({
					  content:'评论失败，请重试',
					})
				}
			}
		},
		scrollBotLoad(){
			if (!this.lock && ($(".detail").scrollTop() + $(".detail").height()) > $(".detail")[0].scrollHeight-350) {
				// console.log(1)
				this.loadComment();
			} else {}
		},
	},
	watch:{
		replyCommentId(){
			this.ifFocus();
			this.loadReply();
		}
	}
}
</script>

<style rel="stylesheet" scoped>
	.comment-main{
	    background: #fdfdfd;
	    padding: 0 5px 50px;
	    overflow: auto;
	}
	.input-commnet-wrap-a {
	    position: relative;
	    width: 50%;
	}
	.icon-comment-a{
		font-size: 24px;
		color: #666;
	}
	.icon-message{
		position: relative;
	}
	.commment-num {
        position: absolute;	    
	    right: -48px;
        top: -2px;
        width: 100px;
        text-align: center;
        line-height: 0;
	}
	.commment-num-span{
		background: #f40;
		font-size: 10px;
	    color: #fff;
	    border-radius: 8px;
	    font-style: normal;
	    line-height: 12px;
	    font-weight: 100;
	    padding: 1px 4px;
	}
	.collected{
		color: #fc0;
	}
	.mask-sub{
		height: 100%;
	}
	.comment-form {
		display: flex;
	    align-items: center;
        justify-content: space-around;
        border-top: 1px solid rgb(223, 223, 223);
	    line-height: 30px;
	    padding: 0 15px;
	    height: 45px;
        background: #fafafa;
	}
	.input-commnet-wrap{
		position: relative;
	    width: 88%;
	}
	.input-commnet-content {
		width: 100%;
	    text-indent: 6px;
	    background: #eee;
	    border-radius: 30px;
	    height: 30px;
	    line-height: 30px;
	}
	.submit-comment {
	    color: #777;
	}
	.comment input {
	    line-height: 35px;
	    height: 35px;
	}
	.reply {
	    color: #666;
        vertical-align: baseline;
        font-size: 12px;
	}
	.reply-main{
	    padding: 0 15px;
	}
	.reply-li {
        padding: 15px 0;
	    border-top: 1px solid #eee;
	}
	.report-comment-btn{
		font-size: 16px;
	    vertical-align: text-top;
	}
	.rep-show {
	    background: #ddd;
	    border-radius: 10px;
	    padding: 1px 4px;
	}
	.report-wrap{
		height: auto;
	    background: #fff;
	}
	.report-btn{
	    padding: 5px 10px;
	    margin: 15px;
	    background: #eee;
	    border-radius: 6px;
	    color: #666;
	}
	.uphoto {
	    width: 40px;
	    height: 40px;
	    border-radius: 50%;
	    float: left;
	    margin-right: 15px;
	}
	.comment-detail {
		position: relative;
	    display: inline-block;
	    width: 100%;
	    padding-left: 50px;
	    margin-top: -40px;
	}
	.uname {
	    max-width: 80%;
	    margin-right: 10px;
	}
	.delComment{
		color: #aaa;
		font-size: 12px;
	}
	.ucomment {
	    margin: 10px 0;
	}
	.slide-ud-enter-active {
	  transition: all .3s ease;
	}
	.slide-ud-leave-active {
	  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.slide-ud-enter, .slide-ud-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */ {
	  bottom: -90%;
	  opacity: 0;
	}
	.focus-b{
		top: 0;
		right: 0;
		color: #f40;
		background: none;
	}
</style>