<template>
	<div >
		<top @hrefTo="this.$Tool.goBack">
			<template slot="title">{{ '' }}</template>
		</top>
		<div class="detail">
			<section class="content-wrap" v-if="!proFail1">
				<h1>{{ article.title }}</h1>
				<div class="publisher bfc-o">
					<img :src="artUser.imageurl?(fileRoot+artUser.imageurl):imgurl" alt="" class="uphoto uphoto-big">
					<div>
						<div class="uname">
							{{ artUser.username }}
						</div>
						<div class="ts">
							<time v-text="$Tool.publishTimeFormat(article.publishtime)"></time>
							<!-- <span>{{ article.classify }}</span> -->
						</div>
					</div>
					<button type="button" class="focus bfc-p" @click="doFocus">{{focusState?'已关注':'关注'}}</button>
				</div>
				<div class="content">
					{{ article.content }}
				</div>
				<div class="key-wrap">
					关键词：<span class="key" v-for="item in article.keywords">{{ item }}</span>
				</div>
			</section>
			<prompt-blank v-if="proFail1" :mes="failMes1"></prompt-blank>			
			<div class="btn-a-wrap bfc-o" id="commentAnchor">
				<button type="button" class="btn-a" :class="{'liked':likeStatus}" @click="doLike(1)">
					{{ likeNum }}
					<span class="bfc-d">
						<i class="iconfont icon2">&#xe7c8;</i>
						<i class="iconfont icon2 like-animate" :class="[{'like-animate-up':likeStatus}]">&#xe7c8;</i>	
					</span>
				</button>
				<button type="button" class="btn-a"><i class="iconfont icon2">&#xe7c3;</i>不喜欢</button>
				<button type="button" class="btn-a"><i class="iconfont icon3">&#xe883;</i>微信</button>
				<button type="button" class="btn-a"><i class="iconfont icon3">&#xe882;</i>QQ</button>
			</div>	
			<div class="comment" v-if="!proFail2" >				
				<ul class="comment-ul">
					<li class="comment-li bfc-o" v-for="(item,index) in commentList">
						<div class="uphoto-wrap fl">
							<img class="uphoto" :src="item.imageurl?(fileRoot+item.imageurl):imgurl" alt="">
						</div>
						<div class="comment-detail">				
							<p>
								<span class="uname oe bfc-d">{{item.username}}</span>
								<span class="delComment fr" v-if="item.douserid == userId" @click="deleteCom(item.id,index)">删除</span>
							</p>
							<p class="ucomment">{{item.content}}</p>
							<div>
								<div>
									<!-- <button type="button" class="reply reply-btn" @click="reply(item.commentid)">回复</button> -->
									<time v-text="$Tool.publishTimeFormat(item.commenttime)"></time>
									<span>-</span>
									<button type="button" class="reply reply-sh">
										<span class="rep-show" @click="showReply(item.douserid,item.id,index)">
											<var>{{item.replyCount || 0}}</var>回复
										</span>
									</button>
									<div class="like-wrap fr">
										<button type="button" class="like-btn" :class="{'liked':item.ifLike}">
											<var>{{item.likeNum}}</var>
											<span class="bfc-d">
												<i class="iconfont icon2" >&#xe7c8;</i>
												<i class="iconfont icon2 like-animate" :class="[{'like-animate-up':index==curLike?ifLike:0}]" @click="doLike(2,item.id,index)">&#xe7c8;</i>
											</span>
										</button>
										<!-- <i class="iconfont icon2 report-comment-btn ">&#xe77e;</i> -->
									</div>
								</div>	
							</div>
						</div>
					</li>
				</ul>				
			</div>
			<prompt-blank v-if="proFail2" :mes="failMes2"></prompt-blank>			
		</div>
		<!-- 伪评论框 -->
		<div class="comment-form comment-form-a bf" v-show="!ifCommentSwitch">
			<div class="input-commnet-wrap-a" @click="commentSwitch">				
				<div class="input-commnet-content"><i class="iconfont comment-icon ">&#xe86e;</i>留下你的高见</div>			
			</div>
			
			<i class="iconfont icon-comment-a icon-comment-num" @click="toComment()">&#xe78a;
				<sup class="commment-num"><span class="commment-num-span">{{commentList.length}}</span></sup>
			</i>
			<i :class="['iconfont icon-comment-a icon-collect',{'collected':ifCollect}]" @click="collect(id)">&#xe7df;</i>
			<i class="iconfont icon-comment-a icon-forward">&#xe7e7;</i>
		</div>
		<div class="mask" v-show="ifCommentSwitch">	
			<div class="mask-sub" @click="commentSwitch">
				<!-- 取消层 -->
			</div>
			<!-- 真评论框 -->
			<div class="comment-form bf">
				<div class="input-commnet-wrap">
					<input type="text" class="input-commnet-content" v-model="commentCon" maxlength="100" autofocus placeholder="留下你的高见">	
				</div>
				<input type="button"class="submit-comment" value="发布" @click="comment()">
			</div>
			<!-- 回复列表 -->
			<transition name="slide-ud">
				<div class="reply-wrap" v-if="ifReply">
					<div class="reply-li bfc-o">
						<div class="uphoto-wrap fl">
							<img class="uphoto" :src="commentList[commentIndex].imageurl?(fileRoot+commentList[commentIndex]):imgurl" alt="">
						</div>
						<div class="comment-detail">				
							<p><span class="uname oe bfc-d">{{commentList[commentIndex].username}}</span></p>	
							<p class="ucomment">{{commentList[commentIndex].content}}</p>
							<div>
								<div>
									<!-- <button type="button" class="reply reply-btn" @click="">回复</button>&nbsp;-&nbsp; -->
									<div class="reply reply-sh">
										<div>
											<time v-text="$Tool.publishTimeFormat(commentList[commentIndex].commenttime)"></time>	
											<i class="iconfont report-comment-btn ">&#xe77e;</i>		
										</div>
										<span>-</span>
										<span class="rep-show">
											<var>{{commentList[commentIndex].likeNum || 0}}</var>人赞过
											<!-- <i class="iconfont">&#xe7f6;</i> -->
										</span>
										<!-- <span class="rep-hide" @click="hideReply">
											收起回复<i class="iconfont">&#xe7f4;</i>
										</span> -->
									</div>
									<!-- <div class="like-wrap fr">
										<var>125</var>
										<button type="button" class="like-btn">
											<i class="iconfont icon2">&#xe7c8;</i>
											<transition name="up-hide">
												<i class="iconfont icon2 like-animate" v-if="ifLike" @click="dolike()">&#xe7c8;</i>												
											</transition>
										</button>
										<i class="iconfont icon2 report-comment-btn">&#xe77e;</i>
									</div> -->
								</div>	
							</div>
						</div>
					</div>
					<!-- 评论的回复列表 -->
					<ul class="reply-main">
						<li class="reply-li bfc-o" v-for="item in replyList">
							<div class="uphoto-wrap fl">
								<img class="uphoto" :src="item.imageurl?(fileRoot+item.imageurl):imgurl" alt="">
							</div>
							<div class="comment-detail">				
								<p><span class="uname oe bfc-d">{{item.username}}</span></p>	
								<p class="ucomment">{{item.content}}</p>
								<div>
									<div>
										<!-- <button type="button" class="reply reply-btn" @click="">回复</button>&nbsp;-&nbsp; -->
										<button type="button" class="reply reply-sh">
											<time v-text="$Tool.publishTimeFormat(item.commenttime)"></time>
											<span>-</span>
											<span class="rep-show" @click="showReply(item.id)">
												<var>{{item.replyCount || 0}}</var>回复
												<!-- <i class="iconfont">&#xe7f6;</i> -->
											</span>
											<!-- <span class="rep-hide" @click="hideReply">
												收起回复<i class="iconfont">&#xe7f4;</i>
											</span> -->
										</button>
										<div class="like-wrap fr">
											<var>125</var><button type="button" class="like-btn"><i class="iconfont icon2">&#xe7c8;</i><i class="iconfont icon2 like-animate">&#xe7c8;</i></button>
											<i class="iconfont icon2 report-comment-btn ">&#xe77e;</i>
										</div>
									</div>	
								</div>
							</div>
						</li>
					</ul>									
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import config from '@/lib/config/config'
import articleService from '@/service/articleService'
import userService from '@/service/userService'
import followService from '@/service/followService'
import articleCommentService from '@/service/article_commentService'
import articleCollectService from '@/service/articleCollectService'
import readHistoryService from '@/service/readHistoryService'
import praiseService from '@/service/praiseService'
export default {
	data(){
		return {
			userId:localStorage.id,
			id:Number,//文章id =>article.id
			imgurl:require('@/assets/images/userPhoto.jpg'),
			fileRoot:config.fileRoot+'/',
			focusState:false,
			article:{
				id:Number,
				title:"标题",
				content:"内容",
				author:Number,
				type:Number,
				publishtime:"发布时间",
				publisharea:"发布地区",
			},
			artUser:{
				username:'',
				imageurl:'',
			},
			commentList:[],
			replyList:[],
			proFail1:false,
			proFail2:false,
			failMes1:"获取内容失败",
			failMes2:"获取评论失败",
			commentCon:'',
			//底部评论框状态切换
			ifCommentSwitch:false,
			//评论回复显隐切换
			ifReply:false,
			//回复评论的id
			replyCommentId:Number,
			//回复评论人的id
			replyUserId:Number,
			//指定评论数组中某条评论的索引值 //展开评论回复是顶部当前索引使用
			commentIndex:Number,
			//评论类型：1评论，2回复
			commentType:1,
			//点赞
			curLike:Number,
			//点赞动画
			ifLike:false,
			//评论删除
			ifDeleteCom:false,
			//是否收藏
			ifCollect:false,
			//文章点赞量
			likeNum:0,
			//点赞状态
			likeStatus:false,
			
		}
	},
	mounted(){
		this.id = this.$route.query.id;
		//添加阅读记录
		let resAddReadHistory = readHistoryService.addReadHistory(this.id);
		// if (resAddReadHistory && resAddReadHistory.status == "success") {
		// }
		//获取文章信息
		let resArticleDetail = articleService.getArticleById(this.id);
		if (resArticleDetail&&resArticleDetail.status == "success") {
			this.article = resArticleDetail.record;
		} else {
			this.proFail1 = true;
		}
		// console.log(resArticleDetail)
		//获取发布人信息
		let resUserInfo = userService.getUserById(this.article.author);
		if (resUserInfo && resUserInfo.status == "success") {
			this.artUser = resUserInfo.result.user;
		}
		// console.log(resUserInfo)
		// 是否关注
		if (localStorage.getItem('token')) {
			let resTestFollow = followService.testFollow(this.article.author);
			if (resTestFollow && resTestFollow.status == "success") {
				if (resTestFollow.result == 1) {
					this.focusState = true;
				} else {
					this.focusState = false;
				}
			}			
		}
		//获取文章点赞量
		let resGetPraiseCount = praiseService.getPraiseCount(this.id,1);
		if (resGetPraiseCount && resGetPraiseCount.status == "success") {
			this.likeNum = resGetPraiseCount.result.count;
		}
		//用户是否给文章点赞
		let resTestPraise = praiseService.testPraise(this.id,1);
		if (resTestPraise && resTestPraise.status == "success") {
			if (resTestPraise.result == 1) {
				this.likeStatus = true;
			} else {
				this.likeStatus = false;
			}
		}
		// 获取文章一级评论列表
		let resArticleCommentList = articleCommentService.getArticleCommentPage(this.id,1,10);
		if (resArticleCommentList && resArticleCommentList.status == "success") {
			this.commentList = resArticleCommentList.list.list;
			for (var i = 0,len = this.commentList.length; i < len; i++) {
				//获取文章一级评论人信息
				let resUserInfo = userService.getUserById(this.commentList[i].douserid);
				if (resUserInfo && resUserInfo.status == "success") {
					this.commentList[i].imageurl = resUserInfo.result.user.imageurl;
					this.commentList[i].username = resUserInfo.result.user.username;
				}
				//获取文章一级评论回复数量
				let resReplyCount = articleCommentService.getReplyCount(this.commentList[i].id);
				if (resReplyCount && resReplyCount.status == "success") {
					this.commentList[i].replyCount = resReplyCount.result.count;
				}	
				//获取文章一级评论点赞量
				let resGetPraiseCount = praiseService.getPraiseCount(this.commentList[i].id,2);
				if (resGetPraiseCount && resGetPraiseCount.status == "success") {
					this.commentList[i].likeNum = resGetPraiseCount.result.count;
				}
				//用户是否给文章一级评论点赞
				let resTestPraise = praiseService.testPraise(this.commentList[i].id,2);
				if (resTestPraise && resTestPraise.status == "success") {
					if (resTestPraise.result == 1) {
						this.commentList[i].ifLike = true;
					} else {
						this.commentList[i].ifLike = false;
					}
				}
			}

		} else {
			this.proFail2 = true;
		}
		// console.log(resArticleCommentList)
		// console.log(this.commentList)
		//是否收藏
		let resArticleCollect = articleCollectService.testCollect(this.id);
		if (resArticleCollect && resArticleCollect.status == "success") {
			if (resArticleCollect.result == 1 ) {
				this.ifCollect = true;				
			} else {
				this.ifCollect = false;				
			}
		}
		
	},
	methods:{
		doFocus(){
			// 关注/取消关注
			if (localStorage.getItem('token')) {
				let resFocusState = followService.doFollow(this.article.author);
				if (resFocusState && resFocusState.status == "success") {
					if (resFocusState.result == 1) {
						this.focusState = true;
					} else {
						this.focusState = false;
					}
				}			
			}else{
				this.$vux.alert.show({
				  content: '请先登录',
				})
				setTimeout(()=>{
					this.$vux.alert.hide();
				},1000)
			}
		},
		comment(type){
			if (localStorage.id) {
				let userId = localStorage.id;
				if (this.commentCon && this.$Tool.checkInput(this.commentCon)) {
					if (this.commentType == 1) {
						//执行发送评论
						let resArticleComment = articleCommentService.articleComment(this.id,this.commentCon,userId,this.article.author,1);	
						if (resArticleComment && resArticleComment.status == "success") {
							// 获取文章评论列表(更新)
							let resArticleCommentList = articleCommentService.getArticleCommentPage(this.id,1,10);
							if (resArticleCommentList&&resArticleCommentList.status == "success") {
								this.commentList = resArticleCommentList.list.list;
							}
						} else {
							this.$vux.alert.show({
							  content:'评论失败，亲重试',
							})
							setTimeout(()=>{
								this.$vux.alert.hide();
							},1000)
						}						
					} else {
						//执行发送评论回复
						let resACommentReply = articleCommentService.articleComment(this.id,this.commentCon,userId,this.replyUserId,2,this.replyCommentId);	
						if (resACommentReply && resACommentReply.status == "success") {
							this.ifReply = true;
							// 获取文章评论回复列表(更新)
							let resReplyList = articleCommentService.getReplyList(this.replyCommentId,1,10)
							if (resReplyList && resReplyList.status == "success") {
								this.replyList = resReplyList.recordPage.list;
								console.log(resReplyList)
								//获取评论回复人信息
								for (var i = 0,len = this.replyList.length; i < len; i++) {
									let resUserInfo = userService.getUserById(this.resReplyList[i].douserid);
									if (resUserInfo && resUserInfo.status == "success") {
										this.replyList[i].imageurl = resUserInfo.result.user.imageurl;
										this.replyList[i].username = resUserInfo.result.user.username;
									}
									
								}
							}
						} else {
							this.$vux.alert.show({
							  content:'评论失败，亲重试',
							})
							setTimeout(()=>{
								this.$vux.alert.hide();
							},1000)
						}
					}

				} else {
					this.$vux.alert.show({
					  content: '内容不合法，亲修改后提交',
					})
					setTimeout(()=>{
						this.$vux.alert.hide();
					},1000)
				}
			} else {
				this.$vux.alert.show({
				  content:'请先登录',
				})
				setTimeout(()=>{
					this.$vux.alert.hide();
				},1000)
			}
						location.href = "#commentAnchor";

		},
		commentSwitch(e){
			this.ifCommentSwitch = !this.ifCommentSwitch;
			this.ifReply = false;
			// e.stopPropagation();
		},
		showReply(replyUserId,commentid,commentIndex){
			this.ifReply = true;
			this.ifCommentSwitch = true;	
			this.commentType = 2;
			this.replyUserId = replyUserId;
			this.replyCommentId = commentid;
			this.commentIndex = commentIndex;
			// 获取文章评论回复列表
			let resReplyList = articleCommentService.getReplyList(commentid,1,10)
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
		doLike(type,itemid,index){
			if (!localStorage.id) { return; }
			if (type == 1) {
				//文章点赞
				let resDoPraise = praiseService.doPraise(this.id,1);
				if (resDoPraise && resDoPraise.status == "success") {
					if (resDoPraise.result.code == 1) {
						this.likeStatus = true;
						this.likeNum ++;
					} else {
						this.likeStatus = false;
						this.likeNum --;
					}
				}
			} else {
				//评论点赞
				let resDoPraise = praiseService.doPraise(itemid,2);
				if (resDoPraise && resDoPraise.status == "success") {
					if (resDoPraise.result.code == 1) {
						this.curLike = index;
						this.ifLike = true;
						this.commentList[index].likeNum ++;
						this.commentList[index].ifLike = true;
					} else {
						console.log(1)
						this.curLike = index;
						this.ifLike = false;
						this.commentList[index].likeNum --;
						this.commentList[index].ifLike = false;
					}
				}
			}
		},
		//删除自己的评论
		deleteCom(itemid,index){
			let resDeleteArticleCommon = articleCommentService.deleteArticleConmon(itemid);
			if (resDeleteArticleCommon && resDeleteArticleCommon.status == "success") {
				this.commentList.splice(index,1);
			}
		},
		collect(articleid){
			if (!localStorage.id) { return; }
			let resArticleCollect = articleCollectService.articleCollect(articleid);
			if (resArticleCollect && resArticleCollect.status == "success") {
				if (resArticleCollect.result == 1 ) {
					this.ifCollect = true;				
				} else {
					this.ifCollect = false;				
				}
			}
		},
		toComment(){
			// console.log($("#commentAnchor").offset().top)
			// $("html,body").animate({scrollTop:$("#commentAnchor").offset().top},500);
			// document.body.scrollTop = $("#commentAnchor").offset().top;
			location.href = "#commentAnchor";
		}
	},
}
</script>

<style scoped>
	.detail{
	    color: #555;
        margin-top: 50px;
	}
	.content-wrap{
		padding: 0 15px;
	}
	h1{
	    padding: 15px 0;
	    line-height: 30px;
	    font-size: 18px;
	}
	.uphoto {
	    width: 40px;
	    height: 40px;
	    border-radius: 50%;
	    float: left;
	    margin-right: 15px;
	}
	.uphoto-big{
		width: 50px;
		height: 50px;
	}
	.uname {
	    color: #333;
	    font-size: 14px;
	}
	.ts {
	    color: #888;
	}
	.focus{
	    top: 0;
	    right: 0;
	    color: #fff;
	    background: #f25d5d;
	    width: 60px;
	    border-radius: 5px;
	    line-height: 28px;
	}
	.content {
	    margin: 0.3rem 0;
	    line-height: 25px;
	    font-size: 16px;
	}
	.key {
	    display: inline-block;
	    background: #ddd;
	    margin-right: 10px;
	    width: 60px;
	    line-height: 26px;
	    text-align: center;
	    border-radius: 14px;
	}
	.btn-a-wrap {
	    padding: 5px 10px;
	    margin-top: 15px;
	    background: #fff;
	}
	.btn-a {
	    border-radius: 10px;
	    border: 1px solid #ddd;
	    line-height: 30px;
	    padding: 0 10px;
	    margin:3px;
	    float: left;
        color: #666;
	}
	.icon2,.icon3 {
	    font-size: 22px;
	    vertical-align:sub;
	    cursor: pointer;
	    color: inherit;
	}
	.icon3{
		color: #2cbf57;
	}
	/* comment */
	.comment {
	    padding: 25px 15px;
	}
	.comment-ul{
		margin-top: 10px;
	}
	.comment-li {
	    border-top: 1px solid #ddd;
	    padding: 15px 0;
	}
	.comment .uname {
	    max-width: 80%;
	    margin-right: 10px;
	}
	.ucomment {
	    margin: 10px 0;
	}
	.comment-detail {
	    display: inline-block;
	    width: 100%;
	    padding-left: 50px;
	    margin-top: -40px;
	}
	.reply {
	    color: #666;
        vertical-align: baseline;
        font-size: 12px;
	}
	.reply-li {
        padding: 15px 0;
	    border-top: 1px solid #eee;
	}
	.like-btn {
	    position: relative;
	    line-height: 22px;
	}
	.like-animate {
	    position: absolute;
	    left: 0;
	    bottom: 0px;
	    opacity: 1;
	    color: rgba(0,0,0,0);
	}
	.like-animate-up {
	    bottom: 20px;
	    opacity: 0;
	    color: #f40;
	    -webkit-transition: opacity 1s,bottom 1s;
	    transition: opacity 1s,bottom 1s;
	}
	.rep-hide {
	    display: none;
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
	.comment-icon {
	    font-size: 20px;
		color: #666;
	}
	.input-commnet-wrap-a {
	    position: relative;
	    width: 50%;
	}
	.icon-comment-a{
		font-size: 24px;
		color: #666;
	}
	.icon-comment-num{
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
	.mask{
		display: block;
		height: calc(100% - 100px);
		background: transparent;
	}
	.mask-sub{
		height: 100%;
	}
	.comment time{
		font-size: 10px;
	}
	.reply-wrap{
	    height: 80%;
	    background: #fdfdfd;
	    position: fixed;
	    width: 100%;
	    bottom: 0;
	    padding: 0 5px;
	    border-top: 1px solid #ddd;
	}
	.reply-main{
	    padding: 0 15px;
	}
	.slide-ud-enter-active {
	  transition: all .3s ease;
	}
	.slide-ud-leave-active {
	  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.slide-ud-enter, .slide-ud-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */ {
	  bottom: -80%;
	  opacity: 0;
	}
	.delComment{
		color: #aaa;
		font-size: 12px;
	}
	.rep-show {
	    background: #ddd;
	    border-radius: 10px;
	    padding: 1px 4px;
	}
	.collected{
		color: #fc0;
	}
	.liked{
		color: #f40;
		/*border: 1px solid #f40;*/
	}
	.report-comment-btn{
		font-size: 16px;
	    vertical-align: text-top;
	}
</style>