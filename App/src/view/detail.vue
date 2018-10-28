<template>
	<div>
		<top @hrefTo="this.$Tool.goBack">
			<template slot="title">{{ '文章详情' }}</template>
		</top>
		<loading-main v-show="ifLoad"></loading-main>
		<div class="detail" @scroll="loadScroll">
			<section class="content-wrap" v-if="!proFail1">
				<h1 class="article-title">{{ article.title }}</h1>
				<div class="publisher bfc-o clearfix">
					<router-link :to="{name:'published',query:{userId:article.author}}">
						<img :src="artUser.imageurl?(fileRoot+artUser.imageurl):imgurl" alt="" class="uphoto uphoto-big fl">
						<div class="article-time-name fl">
							<div class="uname">
								{{ artUser.username}}
							</div>
							<div class="ts utime">
								<time v-text="$Tool.publishTimeFormat(article.publishtime)"></time>
								<!-- <span>{{ article.classify }}</span> -->
							</div>
						</div>
					</router-link>
					<button type="button" class="focus bfc-p fr" v-if="userId != article.author" @click="handleFocus(article.author,1)">{{focusState?'已关注':'关注'}}</button>
				</div>
				<div class="content">
					<div class="article-content">
		            <p v-html="article.content"></p>
		          </div>
					<div class="phone-content clearfix">
						<div v-if="1 == article.type"  class="phone-img fl">
							<!-- <img  :src="fileRoot + item.url" :alt="item.filename">							 -->
							<img v-for="(item,index) in ArticleFile"  :src="fileRoot + item.url" :alt="item.filename">							
						</div>
						<div v-else-if="2 == article.type">
							<video-player class="video-player vjs-custom-skin" 
								ref="videoPlayer"
							 	:playsinline="true"
							  	:options="playerOptions">							  	
							</video-player>	
							<!-- :src="fileRoot + ArticleFile[0].url"			 -->
						</div>
					</div>
					<a :href="article.sourceurl" class="see-text" v-if="sourceShow">查看原文</a>
				</div>
				<!-- <div class="keywords">
					<label>关键词：</label>
					<span v-for="item in article.keywords">{{ item }}</span>
				</div> -->
			</section>
			<prompt-blank v-if="proFail1" :mes="failMes1"></prompt-blank>		
			<ul class="article-change clearfix" v-if="!detailType">
				<li class="item" @click="handleFabulous(1)" :class="{'likeActive':likeStatus}"> 
					{{likeNum}}
					<like :likeStatus="likeStatus"></like>
				</li>
				<li class="item">
					<span>不喜欢</span>
					<i class="iconfont icon-lajixiang"></i>
				</li>
			</ul>	

			<ul class="article-menu" v-else>
				<li :class="{current:current == 1}" @click="handleSwitch(1)">评论</li>
				<li :class="{current:current == 2}" @click="handleSwitch(2)">转发</li>
				<li :class="{current:current == 3}" @click="handleSwitch(3)">点赞</li>
			</ul>

			<div class="hot-comment" v-if="ifSwitchB">
				<div class="hot-title">热门评论</div>
				<div class="hot-content">
					<ul class="hot-list">
						<li class="hot-item clearfix" v-for="(item,index) in commentList">
							<div class="hot-userphoto fl">
								<img :src="item.imageurl?(fileRoot+item.imageurl):imgurl">
							</div>
							<div class="hot-wrap fl">
								<div class="hot-header clearfix">
									<h5 class="fl">{{item.username}}</h5>
									<p class="hot-fabulous fr" :class="{'likeActive':item.ifLike}" @click="handleFabulous(2,item.id,index)">
										<var class="hot-count">{{item.likeNum}}</var>
										<like :likeStatus="index==curLike?ifLike:0"></like>
									</p>
								</div>
								<div class="hot-body clearfix">
									<p class="hot-text">
										{{item.content}}
									</p>
									<!-- <span class="hot-open fr">展开全文</span> -->
								</div>
								<div class="hot-footer clearfix">
									<div class="fl">
										<span class="hot-time">{{$Tool.publishTimeFormat(item.commenttime)}}</span>
										<span class="hot-point">•</span>
										<span class="hot-reply" @click="handleFirstReply(item.douserid,item.id,index)">
											<var>{{item.replyCount}}</var>回复
										</span>
									</div>
									<!-- <span class="hot-report fr">举报</span> -->
									<span class="hot-report fr"  v-if="item.douserid == userId" @click="handleDelete(item.id, index, 1)" >删除</span>
								</div>
							</div>
						</li>
					</ul>
					<prompt-blank v-if="proFail2" :mes="failMes2"></prompt-blank>
					<load-more :show-loading="false" :tip="loadText" v-show="ifLoadMore"></load-more>	
				</div>
			</div>
			<memberList v-else :list="listMember" :mes="proMes"></memberList>
		</div>
		<!-- 伪评论框 -->
		<div class="article-tabBar" v-show="inputToggle">
			<div class="tabBar clearfix">
				<div class="article-input fl" @click="handleOpenInput">
					<i class="iconfont icon-comment"></i>
					<span>写评论...</span>
					<i class="iconfont icon-biaoqing"></i>
				</div>
				<div class="article-icon fr">
					<div class="item msg-item" @click="handleComment">
						<i class="iconfont icon-xiaoxi1"></i>
						<span class="badge" v-show="badgeShow">{{commentNum}}</span>
					</div>
					<div class="item">
						<i class="iconfont" :class="{'icon-not-collection':collectToggle.notcollect,'icon-collected':collectToggle.collected}" @click="handleCollect(id)"></i>
					</div>
					<div class="item"  @click="handleShare">
						<i class="iconfont icon-share"></i>
					</div>
				</div>
			</div>
		</div>
		
		<div class="pop-mask" v-show="popMask" @click="handleCancel">
			
		</div>
		<div v-transfer-dom class="transdom">
			<popup v-model="popList.show" style="z-index: 588;">
				<div class="popup-wrap">
					<div class="popup-area">
						<textarea
							:placeholder="popList.placeholder" 
							v-model.trim="popList.desc"
							@input="handleDesc"
							autofocus
							ref="popFocus"></textarea>
					</div>
					<div class="popup-btn clearfix">
						<button type="button" class="popup-cancel fl" @click="handleCancel">取消</button>
						<button type="button" class="popup-send fr" :class="{popupActive:popList.popupActive}" @click="handleSend">发布</button>
					</div>
				</div>
			</popup>
		</div>

		<!-- 分享 -->
		<div v-transfer-dom style="z-index: 988;">
			<popup v-model="shareShow" style="z-index: 999;">
				<div class="share-wrap">
					<ul class="share-list">
						<li @click="handleGiveShare(1)">
							<div class="share-img">
								<img src="@/assets/images/icon-wechat.png" alt="">
							</div>
							<span class="share-desc">微信好友</span>
						</li>
						<li  @click="handleGiveShare(2)">
							<div class="share-img">
								<img src="@/assets/images/icon-friend.png" alt="">
							</div>
							<span class="share-desc">微信朋友圈</span>
						</li>
						<li  @click="handleGiveShare(3)">
							<div class="share-img">
								<img src="@/assets/images/icon-qq.png" alt="">
							</div>
							<span class="share-desc">手机QQ</span>
						</li>
						<li  @click="handleGiveShare(4)">
							<div class="share-img">
								<img src="@/assets/images/icon-weibo.png" alt="">
							</div>
							<span class="share-desc">微博</span>
						</li>
					</ul>
					<div class="share-btn" @click="handleCancelShare">取消</div>
				</div>
			</popup>
		</div>

		<!-- 回复框 -->
		<div v-transfer-dom>
			<popup v-model="replyShow" position="bottom" height="100%">
				<div class="reply-wrap" @scroll="loadScroll">
					<div class="reply-header">
						<i class="iconfont icon-remove" @click="handleCloseRelpy"></i>
						<span v-show="noReply">暂无回复</span>
						<span v-show="hasReply">{{replyobj.replyCount}}条回复</span>
					</div>
					<div class="reply-body">
						<div class="reply-container reply-first clearfix">
							<div class="reply-img fl"> 
								<img :src="replyobj.imageurl?(fileRoot+replyobj.imageurl):imgurl">
							</div>
							<div class="reply-content fr">
								<div class="header clearfix">
									<div class="header-desc fl">
										<h4>{{replyobj.username}}</h4>
										<!-- <span>旅游媒体人</span> -->
									</div>
									<span class="header-focus fr" @click="handleFocus(replyUserId,2,)">{{replyUserFocusState?'已关注':'关注'}}</span>
								</div>
								<div class="reply-desc">
									<p>{{replyobj.content}}</p>
								</div>
								<div class="reply-time-report clearfix">
									<span class="reply-time fl">
										{{$Tool.publishTimeFormat(replyobj.commenttime)}}
									</span>
									<span class="reply-report fr" @click="handleReport">举报</span>
								</div>
								<div class="reply-footer clearfix">
									<div class="reply-footer-wrap fl clearfix" v-show="noZan">	
										<ul class="reply-list clearfix fl">
											<li class="reply-item">
												<img :src="replyobj.imageurl?(fileRoot+replyobj.imageurl):imgurl" alt="">
											</li>
											
										</ul>
										<div class="reply-footer-desc fl">
											<span class="num">{{replyobj.likeNum}}</span>人赞过 
											<i class="iconfont icon-arrow-right"></i>
										</div>
									</div>
									<div class="reply-list fl" v-show="hasZan">
										暂无人赞过
									</div>
									<div class="reply-fabulous fr"  @click="handleFabulous(2,replyobj.id,0)" :class="{'likeActive':likeStatus}">
										{{replyobj.likeNum}}
										<like :likeStatus="likeStatus"></like>
									</div>
								
								</div>

							</div>
						</div>
						<div class="isDiscuss" v-show="noComment">抢鲜评论</div>
						<!-- 评论的内容 -->
						<div class="reply-container" v-show="hasComment">
							<div class="reply-discuss">全部评论</div>
							<div class="reply-box clearfix" v-for="(item,index) in replyList">
								<div class="reply-img fl">
									<img :src="item.imageurl?(fileRoot+item.imageurl):imgurl">
								</div>
								<div class="reply-content fr">
									<div class="header clearfix">
										<div class="header-desc fl">
											<h4>{{item.username}}</h4>
										</div>
										<!-- <div class="reply-fabulous fr">
											<span class="reply-fabulous-num">17</span>
											<i class="iconfont icon-weizan"></i>
										</div> -->
									</div>
									<div class="reply-desc">
										<p>{{item.content}}</p>
									</div>
									<div class="reply-time-delete clearfix">
										<div class="reply-times fl clearfix">
											<span class="reply-time fl">{{$Tool.publishTimeFormat(item.commenttime)}}</span>
											<span class="fl reply-point">•</span>
											<div class="reply-huifu fl" @click="handleAllReply(item.username)">
												<var>{{item.replyCount}}</var>
												<span class="reply-replys">回复</span>
											</div>
											
										</div>
										<span class="reply-delete fr" v-if="item.douserid == userId" @click="handleDelete(item.id,index,2)">删除</span>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</popup>
		</div>
		
		<!-- 举报框 -->
		<div v-transfer-dom style="z-index: 988;">
			<popup v-model="reportShow" style="z-index: 999;">
				<div class="report-wrap">
					<div class="report-header">
						<h2>举报</h2>
					</div>
					<div class="report-body">
						<ul class="report-list">
							<li class="report-item clearfix" v-for="(item,index) in reportList" :key="item.id" @click="handleChooseReport(item,index)">
							<span class="fl">{{item.desc}}</span>
							<i v-show="item.show" class="iconfont icon-warning-circle fr"></i>
						</li>

						<!-- 	<li class="report-item">
								其它：
								<input type="text" placeholder="我有话说">
							</li -->
						</ul>
					</div>
					<div class="report-footer" @click="handleSendReport">
						完成
					</div>
				</div>
			</popup>
		</div>
	</div>
</template>

<script>
import config from '@/lib/config/config'
import like from '@/components/common/like'
// import share from '@/components/common/share'
import memberList from '@/components/common/memberList'

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
import transmitService from '@/service/transmitService'

import { Group, TransferDom, Popup} from 'vux'

export default {
	directives:{
		TransferDom,
	},
	components:{
		like,
		// share,
		memberList,
		Group,
		Popup
	},
	data(){
		return {
			badgeShow:false,
			sourceShow:false,
			reportToggle:true,
			reportShow:false,
			popMask:false,
			noZan:false,
			hasZan:false,
			noComment:false,
			hasComment:false,
			noReply:false,
			hasReply:false,
			replyShow:false,
			collectToggle:{
				notcollect:true,
				collected:false
			},
			shareShow:false,
			inputToggle:true,
			popList:{
				show:false,
				desc:'',
				placeholder:'请文明发言，遵守评论规则...',
				popupActive:false
			},
			ifLoad:true,
			ifLoadMore:false,
			userId:localStorage.id,
			id:0,//文章id =>article.id
			detailType:0,
			imgurl:require('@/assets/images/userPhoto.jpg'),
			fileRoot:config.fileRoot+'/',
			focusState:false,
			article:{
				id:Number,
				title:"标题",
				content:"内容",
				author:Number,
				type:2,
				sourceurl:'',
				publishtime:"发布时间",
				publisharea:"发布地区",
			},
			artUser:{
				username:'',
				imageurl:'',
			},
			ArticleFile:[],
			commentList:[],
			replyList:[],
			proFail1:false,
			proFail2:false,
			failMes1:"获取内容失败",
			failMes2:"获取评论失败",
			commentCon:'',
			//三级回复@的用户名
			commentConAdd:'',
			//底部评论框状态切换
			ifCommentSwitch:false,
			//评论回复显隐切换
			ifReply:false,
			//回复评论的id
			replyCommentId:Number,
			//回复评论人的id
			replyUserId:Number,
			//回复评论人的关注状态
			replyUserFocusState:false,
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
			// ifCollect:false,
			//文章点赞量
			likeNum:0,
			//评论总量
			commentNum:999,
			//点赞状态
			likeStatus:false,
			//举报显隐
			ifReport:false,
			//举报数组
			reportList:[
				{id: 1, desc: "淫秽色情", show:false},
				{id: 2, desc: "违法信息", show:false},
				{id: 3, desc: "营销广告", show:false},
				{id: 4, desc: "恶意攻击谩骂", show:false},
				// {id: 5, desc: "其它", show:false},
			],
			//显影分享
			ifShare:false,
			//评论加载分页
			pageNum1:1,
			//回复加载分页
			pageNum2:1,
			//是否加载
			ifLoad:false,
			//加载锁
			lock:false,
			//load文字提示
			loadText:"正在加载",
			// 视频
			playerOptions : {
				// playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
				// autoplay: false, //如果true,浏览器准备好时开始回放。
				// muted: false, // 默认情况下将会消除任何音频。
				// loop: false, // 导致视频一结束就重新开始。
				preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
				language: 'zh-CN',
				aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
				fluid: true, // 当true时，Video.jsplayer将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
				sources: [
					{
						type: "video/mp4",
						src: "" //url地址
					}
				],
				poster: "", //你的封面地址
				// width: document.documentElement.clientWidth,
				notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
				controlBar: {
					timeDivider: false,
					durationDisplay: false,
					remainingTimeDisplay: false,
					fullscreenToggle: true //全屏按钮
				}
			},
			reportInfo:{
				reportreasion:'',//"举报原因"，
				reporttime:'',//"举报时间" ,
				// itemid:'',//"对象id",
				// reportuserid:'',//"被举报人id",
				// type:'',//"类型"  1.文章举报  
			},
			//转发，点赞列表
			listMember:[],
			//转发，点赞提示
			proMes:"",
			//转发、点赞，评论切换
			ifSwitchB:true,
			//当前
			current:1,
			replyobj:{},
			shareDesc:{
				href:'',
				title:'',
				content:'',
				thumbs:[]
			}
		}
	},
	mounted(){
		shareService.init();
	},	
	activated(){
		this.id = this.$route.query.id;
		this.detailType = this.$route.query.detailType || 0;
	},
	methods:{
		init(){
			if (!this.id) {
				this.$vux.alert.show({
					  content: '获取出错，请返回！',
					});
				this.$Tool.goBack();
				return;
			}
			this.ifLoad = true;
			//添加阅读记录
			readHistoryService.addReadHistory(this.id,(data)=>{});
			// if (resAddReadHistory && resAddReadHistory.status == "success") {
			// }
			//获取文章信息
			let resArticleDetail = articleService.getArticleById(this.id);

			if (resArticleDetail&&resArticleDetail.status == "success") {
				this.article = resArticleDetail.record;
				if(this.article.sourceurl == null) {
					this.sourceShow = false;
				}else{
					this.sourceShow = true;
				}
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
			// 是否关注发布人
			if (localStorage.getItem('token')) {
				followService.testFollow(this.article.author,(data)=>{
					if (data && data.status == "success") {
						if (data.result == 1) {
							this.focusState = true;
						} else {
							this.focusState = false;
						}
					}						
				});
			}
			// 文章附件
			if (this.article.type != 3) {
				articleFileService.getFileByArticle(this.article.id,data=>{
					if (data && data.status == "success") {
						if (this.article.type == 1) {
							this.ArticleFile = data.result.filelist;				
						}else if(this.article.type == 2){
							this.playerOptions.sources[0].src = this.fileRoot + data.result.filelist[0].url;
							this.playerOptions.poster = this.fileRoot + data.result.filelist[0].thumbnail;
						}

					}				
				});				
			}
			//获取文章点赞量
			praiseService.getPraiseCount(this.id,1,(data)=>{
				if (data && data.status == "success") {
					this.likeNum = data.result.count;
				}		
			});
			//用户是否给文章点赞
			praiseService.testPraise(this.id,1,(data)=>{
				if (data && data.status == "success") {
					if (data.result == 1) {
						this.likeStatus = true;
					} else {
						this.likeStatus = false;
					}
				}			
			});
			//获取评论数量
			articleCommentService.getArticleCommentCount(this.id,(data)=>{
				if (data.status == "success") {
					this.commentNum = data.result.count;
					if(this.commentNum == 0) {
						this.badgeShow = false;
					}else{
						this.badgeShow = true;
					}
					// if(this.commentNum >= 1){
					// 	this.commentNum = 19345;
					// }
					let commentStr = String(this.commentNum);
					let commentLength = commentStr.length;
					// console.log(commentLength);
					if(commentLength >= 5) {
						let commentDie = commentStr/10000;
						let commentResult = (commentDie.toFixed(1)) + 'w';
						this.commentNum = commentResult;
						// console.log(commentResult);
					}
				}			
			});
			
			// console.log(resArticleCommentList)
			// console.log(this.commentList)
			//是否收藏
			articleCollectService.testCollect(this.id,(data)=>{
				if (data && data.status == "success") {
					if (data.result == 1 ) {
						this.collectToggle.notCollect = false;
						this.collectToggle.collected = true;
						// this.ifCollect = true;				
					} else {
						// this.ifCollect = false;		
						this.collectToggle.notCollect = true;
						this.collectToggle.collected = false;		
					}
				}		
			});
			//评论滚动近底部，自动加载 一屏1080
			this.loadComment();
			this.ifLoad = false;
		},
		// 弹出评论框
		handleOpenInput(){
			this.textShow();
			if(this.replyShow){
				this.popMask = true;
			}
			this.popList.placeholder = "请文明发言，遵守评论规则...";
		},
		// 取消评论框
		handleCancel(){
			this.popList.show = false;
			this.popMask = false;
			this.shareShow = false;
			this.reportShow = false;
		},

		// 评论框input事件
		handleDesc(){
			if(this.popList.desc) {
				this.popList.popupActive = true;
			}else{
				this.popList.popupActive = false;
			}
		},
		// 关注--取消关注
		handleFocus(userId,type){
			/*
			type: 1文章发布人---2.评论人
			*/
			if(!localStorage.id){
				this.$Tool.loginPrompt();
				return;
			}
			followService.doFollow(userId, (data)=>{

				if(data && data.status == "success") {
					if(type == 1) {
						if(data.result == 1) {
							this.$vux.toast.show({
								text:'关注成功'
							})
							this.focusState = true;
							//给发布人发送消息
							messageService.sendMessage(userId, "focus", this.id, 1);
						}else {
							this.$vux.toast.show({
								text:'取消关注'
							})
							this.focusState = false;
						}
					}else {
						if(data.result == 1) {
							this.$vux.toast.show({
								text:'关注成功'
							})
							this.replyUserFocusState = true;
							// 给评论人发送消息
							messageService.sendMessage(userId, "focus", this.replyCommentId, 2);
						}else {
							this.$vux.toast.show({
								text:'取消关注'
							})
							this.replyUserFocusState = false;
						}
					}
				}else {
					this.$vux.alert.show({
						content:'关注失败，请重新关注'
					})
				}
			});
		},
		// 点赞--取消点赞
		handleFabulous(type, itemid, index) {
			if(!localStorage.id) {
				this.$Tool.loginPrompt();
				return;
			}
			// 文章点赞
			if(type == 1) {
				let resDoPraise = praiseService.doPraise(this.id,1);
				if(resDoPraise && resDoPraise.status == "success") {
					if(resDoPraise.result.code == 1) {
						this.likeStatus = true;
						this.likeNum++;
						// 给发布人发送消息
						messageService.sendMessage(this.article.author, "like", this.id, 1);
					}else{
						this.likeStatus = false;
						this.likeNum --;
					}
				}
			}else{
				// 评论点赞
				let resDoPraise = praiseService.doPraise(itemid,2);
				if(resDoPraise && resDoPraise.status == "success") {
					console.log(resDoPraise);
					if(resDoPraise.result.code == 1) {
						this.curLike = index;
						this.ifLike = true;
						this.commentList[index].likeNum ++;
						this.commentList[index].ifLike = true;
						// 给评论人发送消息
						messageService.sendMessage(this.replyUserId, "like", this.replyCommentId, 2);
					}else{
						this.curLike = index;
						this.ifLike = false;
						this.commentList[index].likeNum --;
						this.commentList[index].ifLike = false;
					}

					if(resDoPraise.result.count <= 0){
						this.noZan = false;
						this.hasZan = true;
					}else{
						this.hasZan = false;
						this.noZan = true;
					}
				}
			}
		},
		// 发布评论
		handleSend(type){
			this.badgeShow = true;
			if(!this.popList.desc) {
				this.popList.show = false;
				this.popMask = false;
				return;
			}
			if(!localStorage.id){
				this.$Tool.loginPrompt();
				return;
			}
			let userId = localStorage.id;
			if(this.popList.desc && this.$Tool.checkInput(this.popList.desc)) {
				if(this.commentType == 1) {

					// 执行发送评论
					let resArticleComment = articleCommentService.articleComment(this.id,this.popList.desc,userId,this.article.author,1);	
					if(resArticleComment && resArticleComment.status == "success") {
						this.lock = false; 
						this.pageNum1 = 1;
						this.loadComment();
						setTimeout(()=>{
							this.$vux.toast.show({
								type:'success',
								text: '发布成功'
							});
						},500);
						this.popList.desc = "";
						this.commentNum++;
						this.popList.show = false;
						this.popList.popupActive = false;

						// 给发布人发送消息
						messageService.sendMessage(this.article.author,"reply",this.id,1);
						let dis = $(".detail").scrollTop() + $(".article-change").offset().top -100;
						$(".detail").animate({scrollTop:dis},100);
					}else{
						this.$vux.alert.show({
							content:'评论失败，请重试'
						});
						setTimeout(()=>{
							this.$vux.alert.hide();
						},1000);
					}
				}else{
					let comment = this.commentConAdd?(this.popList.desc + this.commentConAdd):this.popList.desc;
					// 执行发送评论回复
					let resACommentReply = articleCommentService.articleComment(this.id,comment,userId,this.replyUserId,2,this.replyCommentId);	
					if(resACommentReply && resACommentReply.status == "success") {
						setTimeout(()=>{
							this.$vux.toast.show({
								type:'success',
								text: '发布成功'
							});
						},500);
						this.popList.desc = "";
						this.commentConAdd = "";
						this.popList.show = false;
						this.popMask = false;
						this.popList.popupActive = false;
						this.commentList[this.commentIndex].replyCount ++;

						// 给评论人发送消息
						messageService.sendMessage(this.replyUserId,'reply',this.replyCommentId,2);
						this.loadReply();
						$(".reply-wrap").animate({scrollTop:0},100);
					}else{
						this.$vux.alert.show({
							content:'评论失败，请重试'
						});
						setTimeout(()=>{
							this.$vux.alert.hide();
						},1000);
					}
				}
			}else{
				this.$vux.alert.show({
					content:'内容不合法，请修改后提交'
				});
				setTimeout(()=>{
					this.$vux.alert.hide();
				},1000);
			}
		},

		// 删除评论
		handleDelete(itemid, index, type){
			const thiz = this;
			let deleteData = articleCommentService.deleteArticleConmon(itemid);
			// debugger;
			this.$vux.confirm.show({
				content:'确认删除评论？',
				onConfirm(){
					thiz.$vux.loading.show();
					if(deleteData && deleteData.status == "success") {
						setTimeout(()=>{
							if(type == 1) {
								thiz.commentList.splice(index,1);
								thiz.commentNum --;
								thiz.$vux.loading.hide();
								thiz.$vux.toast.show({
									text:'删除成功'
								});	
								if(thiz.commentList.length <= 0) {
									thiz.proFail2 = true;
									thiz.ifLoadMore = false;
									thiz.badgeShow = false;
								}
							}else{
								thiz.replyList.splice(index,1);
								thiz.commentList[thiz.commentIndex].replyCount --;
								thiz.$vux.loading.hide();
								thiz.$vux.toast.show({
									text:'删除成功'
								});	
								let resReplyList = articleCommentService.getReplyList(thiz.replyCommentId,1,10)
								if(resReplyList.recordPage.list.length <= 0){
									thiz.noComment = true;
									thiz.hasComment = false;
								}else{
									thiz.hasComment = true;
									thiz.noComment = false;
								}
							}
						},500);
					}
				}
			})
		},

		//收藏---取消收藏
		handleCollect(articleid){
			if (!localStorage.id ) { this.$Tool.loginPrompt(); return; }			
			let resArticleCollect = articleCollectService.articleCollect(articleid);
			if (resArticleCollect && resArticleCollect.status == "success") {
				
				if (resArticleCollect.result == 1 ) {
					this.$vux.toast.show({
					  text:'收藏成功',
					  type:'succes'
					});
					
					//给发布人发送消息
					messageService.sendMessage(this.article.author,"collect",this.id,1);
					setTimeout(()=>{
						this.$vux.alert.hide();
					},1000);			
					this.collectToggle.notcollect = false;
					this.collectToggle.collected = true;
				} else {
					this.$vux.toast.text('取消收藏', 'middle')
					setTimeout(()=>{
						this.$vux.alert.hide();
					},1000)	
					this.collectToggle.notcollect = true;
					this.collectToggle.collected = false;		
				}
			}
		},

		// 分享
		handleShare(){
			this.shareShow= true;
			if(this.replyShow){
				this.popMask = true;
			}
			//分享内容对象
			let reg = /[^\u4e00-\u9fa5]+/g;
			let tempContent = this.article.content.replace(reg,"");
			this.shareDesc = {
				href:config.domain + location.href.substring(location.href.indexOf('/',10)),
				title: this.article.title,
				content: tempContent.substring(0,80)
			};
			if (this.article.type == 3) {
				let temp = this.$Tool.extractImg(this.article.content,1);
				this.shareDesc['thumbs'] = temp[0];
			}else if(this.ArticleFile.length) {
				this.shareDesc['thumbs'] = [this.fileRoot + this.ArticleFile[0]['url']];
			}else{
				this.shareDesc['thumbs'] = [this.fileRoot + this.playerOptions.poster];
			}

		}, 

		//分享到第三方
		handleGiveShare(type){
			if(type == 1) {
				shareService.shareToWxHy(this.shareDesc,(data)=>{
					console.log(this.shareDesc);

				})
			}
			else if(type == 2) {
				shareService.shareToWxPyq(this.shareDesc,(data)=>{
					console.log(this.shareDesc);
				})
			}
			else if(type == 3) {
				shareService.shareToWxPyq(this.shareDesc,(data)=>{
					console.log(this.shareDesc);
				})
			}
			else{
				shareService.shareToXl(this.shareDesc,data=>{
					console.log(this.shareDesc);
				})
			}

		},
		//关闭分享弹框
		handleCancelShare(){
			this.shareShow = false;
		},
		//首次回复
		handleFirstReply(replyUserId,commentid,commentIndex){
			this.replyShow = true;
			this.commentType = 2;
			this.replyUserId = replyUserId;	//回复评论人id
			this.replyCommentId = commentid; //回复评论的id
			this.commentIndex = commentIndex;//指定评论数组中某条评论的索引值 
			//展开评论回复是顶部当前索引使用
			// 是否关注发布人
			// debugger;
			this.replyobj = this.commentList[commentIndex];
			if(this.replyobj.likeNum <= 0) {
				this.noZan = false;
				this.hasZan = true;
			}else{
				this.noZan = true;
				this.hasZan = false;
			}
			if(localStorage.getItem('token')){
				let resTestFolow = followService.testFollow(replyUserId);
				if(resTestFolow && resTestFolow.status == "success"){
					if(resTestFolow.result == 1){
						this.replyUserFocusState = true;
					}else{
						this.replyUserFocusState = false;
					}
				}
			}
			// 获取文章评论回复列表
			this.loadReply();
		},

		//二级三级回复
		handleAllReply(userName){
			this.textShow();
			this.popMask = true;
			this.popList.placeholder = "回复 "  + userName + ":"
			this.commentConAdd = " //@" + userName;
		},

		// 关闭回复框
		handleCloseRelpy(){
			this.replyShow = false;
			this.commentType = 1;
		},

		// 点击消息滚动
		handleComment(){
			let dis = $(".detail").scrollTop() + $(".article-change").offset().top -100;
			$(".detail").animate({scrollTop:dis},100);
			console.log(dis);
		},

		// 举报
		handleReport(){
			this.reportShow = true;
			this.popMask = true;
			console.log('举报');
		},

		// 选择举报项
		handleChooseReport(item,index){
			item.show = !item.show;
			this.reportInfo.reportreasion = index;
			
		},

		// 提交举报
		handleSendReport(itemid,reportuserid){
			if(!this.reportInfo.reportreasion){
				this.reportShow = false;
				this.popMask = false;
			}else{
				this.$vux.alert.show({
				  content:'感谢您的反馈，我们会着实核查！',
				})	
				this.reportShow = false;
				this.popMask = false;
				this.reportList.show = false;
			}
		},

		// 个人中心所能看到的switch
		handleSwitch(v){;
			if(v == 1) {
				this.ifSwitchB = true;
				this.current = 1;
				return;
			}
			else if(v == 2) {
				this.ifSwitchB = false;
				this.current = 2;
				let res = transmitService.getTransmitList(this.id,1,10);
				if (res && res.status == "success") {
					this.listMember = res.recordPage.list;
				}
				if(this.listMember.length == 0){
					this.proMes = "还没有人转发哦"
				}
				return;
			}
			else {
				this.ifSwitchB = false;
				this.current = 3;
				let res = praiseService.getPraiseList(this.id,1,1,10);
				if (res && res.status == "success") {
					this.listMember = res.recordPage.list;
				}
				if(this.listMember.length == 0){
					this.proMes = "还没有人点赞哦"
				}
				return;
			}
		},

		/*----------------加载-函数---------------------*/
		// 加载评论
		loadComment(){
			// 获取文章一级评论列表
			this.ifLoadMore = true;
			let resArticleCommentList = articleCommentService.getArticleCommentPage(this.id, this.pageNum1, 10);
			if(resArticleCommentList && resArticleCommentList.status == "success") {
				if(this.pageNum1 == 1) {
					this.commentList = [];
				}
				listUtil.appendList(this.commentList,resArticleCommentList.list.list);
				listUtil.asyncSetListPropty(resArticleCommentList.list.list,(item)=>{
					// 获取文章一级评论人信息
					let resUserInfo = userService.getUserById(item.douserid);
					if (resUserInfo && resUserInfo.status == "success") {
						this.$set(item, "imageurl", resUserInfo.result.user.imageurl);
						this.$set(item, "username", resUserInfo.result.user.username);
					}
					// 获取文章一级评论回复数量
					let resGetReplyCount = articleCommentService.getReplyCount(item.id);
					if(resGetReplyCount && resGetReplyCount.status == "success") {
						this.$set(item, 'replyCount', resGetReplyCount.result.count);
					}
					// 获取文章一级评论点赞数
					let resGetPraiseCount = praiseService.getPraiseCount(item.id,2);
					if(resGetPraiseCount && resGetPraiseCount.status == "success") {
						this.$set(item,"likeNum",resGetPraiseCount.result.count);
					}

					//用户是否给文章一级评论点赞
					let resTestPraise = praiseService.testPraise(item.id,2)
					if (resTestPraise && resTestPraise.status == "success") {
						if (resTestPraise.result == 1) {
							this.$set(item,"ifLike",true);
						} else {
							this.$set(item,"ifLike",false);
						}
					}
				});
				if (this.commentList.length == 0) {
					this.lock = true;		
					this.proFail2 = true;
					this.failMes2 = "暂无评论，来抢第一个沙发吧";
					this.ifLoadMore = false;
				} else if (this.commentList.length < 10 || this.commentNum == this.commentList.length ) {
					this.lock = true;		
					this.ifLoadMore = true;
					this.proFail2 = false;
					this.loadText = "已加载全部";
				} else {
					this.pageNum1 ++;
				}
			} else {
				this.proFail2 = true;
			}
		},

		// 加载回复
		loadReply() {
			// 获取文章评论回复列表
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
				}
			}

			if(resReplyList.recordPage.list.length <= 0){
				this.noReply = true;
				this.hasReply = false;
				this.noComment = true;
				this.hasComment = false;
			}else{
				this.hasReply = true;
				this.noReply = false;
				this.hasComment = true;
				this.noComment = false;
			}
		},


		// 页面加载后渲染函数
		loadScroll(){
			if (!this.lock && ($(".detail").scrollTop() + $(".detail").height()) > $(".detail")[0].scrollHeight-350) {
				this.loadComment();
			}
		},  
		textShow(){
			this.popList.show = true;
			this.$refs.popFocus.focus();
		}
		
	},
	watch:{
		id(){
			// debugger
			this.$nextTick(()=>{
				this.init();				
			})
		}
	},
	// beforeRouteEnter(to,from,next){
	// 	next(vm=>{
	// 		vm.id = vm.$route.query.id;	
	// 		vm.detailType = vm.$route.query.detailType || 0;
	// 	})
	// }
}
</script>

<style lang="less" scoped>
	.detail{
		position: relative;
		height: calc(100% - .87rem);
		overflow: hidden;
		overflow-y: auto;
		padding: 0 .3rem .88rem .3rem;
		background-color: #fff;
		.content-wrap{
			.article-title{
        padding-top: .4rem;
        padding-bottom: .2rem;
				font-size: .42rem;
				line-height: .58rem;
				letter-spacing: .02rem;
				overflow: hidden;
				text-overflow:ellipsis;
				display:-webkit-box; 
				-webkit-box-orient:vertical;
				-webkit-line-clamp:3; 
			}
			.publisher{
				padding: .45rem 0;
				.uphoto{
					width: 1.2rem;
					height: 1.2rem;
					border-radius: 50%;
					margin-right: .2rem;
				}
				.article-time-name{
					width: calc(100% - 2.78rem);
					margin-right: .22rem;
					.uname{
						padding-top: .25rem;
						font-size: .32rem;
					}
					.utime{
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						font-size: .24rem;
						padding-top: .2rem;
						color: #999;

					}
				}
				.focus{
					width: 1.16rem;
					height: .56rem;
					line-height: .56rem;
					margin-top: .4rem;
					text-align: center;
					color: #fff;
					border-radius: .1rem;
					background-color: #f85959;
					border: .02rem solid transparent;
				}
				.btnActive{
					background-color: #fafafa;
					border: .02rem solid #bbb;
					color: #bbb;
				}
			}
			.content{
				padding-bottom: .45rem;
				.article-content{
					padding-bottom: .4rem;
					line-height: .5rem;
					p{
            font-size: .34rem;
						line-height: .5rem !important;
						margin-bottom: .3rem !important;
					}
					img{
						display: inline-block;
						width: 100%;
						margin-bottom: .4rem !important;
						border-radius: .08rem;
						padding: .04rem;
						border: .02rem solid @borderColor;
						text-align: center;
					}
				}
				.phone-content{
					padding-bottom: .4rem;
					// display: flex;
					.phone-img{
						width: 33%;
						height: 1.2rem;
						margin-right: .4%;
						margin-bottom: 1%;
						&:nth-child(3n){
							margin-right: 0;
						}
						img{
							display: block;
							width: 100%;
							height: 100%;
						}
					}
				}
				.see-text{
					letter-spacing: .02rem;
					line-height: .5rem;
					color: #999;
				}

			}
			.keywords{
				margin: .6rem 0;
				label{
					color: #1674e9;
				}
				span{
					font-size: .24rem;
					padding: .13rem .22rem;
					margin-right: .2rem;
					border-radius: .25rem;
					color: #999;
					background-color: #f5f7f9;
				}
				
			}
		}
	}
	.article-change{
		border-bottom:.02rem solid @borderColor;
		padding-bottom: .56rem;
		display: flex;
		justify-content: center;
		.item{
			width: 1.84rem;
			height: .64rem;
			line-height: .64rem;
			margin-right: .86rem;
			border: .02rem solid #d9d9d9;
			border-radius: .3rem;
			text-align: center;
			&:last-child{
				margin-right: 0;
			}
			.iconfont{
				font-size: .32rem;
				// color: #222;
				padding-right: .03rem;
			}
			span{
				vertical-align: top;
				font-size: .24rem;
				color: #222;
			}
		}
		.likeActive{
			color: #f40;
		}
	}
	.article-menu{
		line-height: .8rem;
		background-color: #fff;
		border-bottom: .02rem solid @borderColor;
		display: flex;
		li{
			flex: 1;
			text-align: center;	
		}
		.current{
			border-bottom: .04rem solid #f85959;
			color: #f85959;
		}
	}
	.hot-comment{
		padding-top: .56rem;
		.hot-title{
			position: relative;
			text-indent: .2rem;
			font-size: .3rem;
			font-weight: 700;
			letter-spacing: .02rem;
			&:before{
				position: absolute;
				content:'';
				display: block;
				width: .08rem;
				height: .3rem;
				background-color: #129aee;
			}
		}
		.hot-content{
			padding-top: .56rem;
			.hot-item{
				margin-bottom: .5rem;
				.hot-userphoto{
					width: .66rem;
					height: .66rem;
					margin-right: .25rem;
					border-radius: 50%;
					img{
						display: block;
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
			}
			.hot-wrap{
				width: calc(100% - .91rem);
				.hot-header{
					height: .66rem;
					line-height: .66rem;
					font-size: .24rem;
					h5{
						color: #3e609e;
					}
					.iconfont{
						font-size: .4rem;
						color: #999;
					}
					.hot-count{
						color: #999;
						vertical-align: top;
					}
				}
				.hot-body{
					position: relative;
					padding-top: .1rem;
					.hot-text{
						line-height: .45rem;
						// overflow:hidden; 
						// text-overflow:ellipsis;
						// display:-webkit-box; 
						// -webkit-box-orient:vertical;
						// -webkit-line-clamp:4; 
					}
					.hot-open{
						position: absolute;
						right: 0;
						background-color: #fff;
						bottom: -.08rem;
						line-height: .5rem;
						font-size: .24rem;
						color: #1674e9;
					}
				}
				.hot-footer{
					line-height: .4rem;
					font-size: .24rem;
					padding: .2rem 0;
					.hot-time{
						color: #999;
					}
					.hot-point{
						padding: 0 .08rem;
						color: #999;
					}
					.hot-reply{
						padding: .1rem .2rem;
						border-radius: .3rem;
						color: #666;
						background-color: #f1f1f1;
						var{
							margin-right: .04rem;
						}
					}
					.hot-report{
						color: #999;
					}
				}
			}
		}
	}
	.article-tabBar {
		width: 100%;
		height: .88rem;
		position: fixed;
		z-index: 566;
		left: 0;
		bottom: 0;
		padding: 0 .3rem;
		background-color: #fafafa;
		border-top: .02rem solid #d8d8d8;
		.article-input {
			width: 3rem;
			height: .56rem;
			position: relative;
			line-height: .56rem;
			margin-top: .16rem;
			padding-left: .26rem;
			padding-right: .13rem;
			border: .02rem solid @borderColor;
			border-radius: .3rem;
			background-color: #f3f4f5;
			.icon-comment{
				padding-right: .14rem;
				color: #222;
			}
			span{
				font-size: .24rem;
				color: #222;
			}
			.icon-biaoqing{
				position: absolute;
				right: .13rem;
				font-size: .36rem;
				color: #9fa7b3;
			}
		}
		.article-icon{
			display: flex;
			line-height: .88rem;
			.item{
				margin-right: .56rem;
				&:last-child{
					margin-right: 0;
				}
				.iconfont{
					font-size: .4rem;
					color: #222;
				}
				.icon-collected{
					color: #fc0;
				}
				.icon-not-collection{
					color: #222;
				}
			}
			.msg-item {
				position: relative;
				.iconfont{
					position: absolute;
					left: -.56rem;
				}
				.badge{
					display: inline-block;
					position: absolute;
					top: .12rem;
					left: -.42rem;
					line-height: .3rem;
					padding: 0.02rem .1rem;
					border-radius: .18rem;
					font-size: .2rem;
					background-color: @mainColor;
					transform: scale(.6);
					color: #fff;
				}
			}
				
		}
	}
	.popup-wrap {
		width: 100%;
		padding: .2rem;
		background-color: #f4f4f4;
		.popup-area{
			width: 100%;
			height: 1.8rem;
			margin-bottom: .2rem;
			textarea{
				width: 100%;
				height: 100%;
				background-color: #fff;
				border: .02rem solid @borderColor;
				border-radius: .2rem;
				padding: .13rem .18rem;
				font-size: .28rem;
				resize:  none;
				&::-webkit-input-placeholder{color:#999;}
				&:-moz-placeholder{color:#999;}
				&::-moz-placeholder{color:#999;}
				&:-ms-input-placeholder{color:#999;}
			}
		}
		.popup-btn{
			button{
				width: 1.2rem;
				height: .6rem;
				border: .02rem solid transparent;
				border-radius: .2rem;
			}
			.popup-cancel{
				border-color: #dadada;
				background-color: #f4f4f4;
				color: #808080;
			}
			.popup-send{
				background-color: #dadada;
				color: #fff;
			}
			.popupActive{
				background-color: #f85959;
			}
		}
	}
	.share-wrap{
		.share-list{
			background-color: #f0f0f0;
			padding: .53rem .2rem;
			display: flex;
			text-align: center;
			li{
				flex: 1;
				margin-right: .24rem;
				&:last-child{
					margin-right: 0;
				}
				.share-img{
					margin: 0 auto;
					width: 1.2rem;
					height: 1.2rem;
					border-radius: 50%;
					text-align: center;
					background-color: #fff;
					img{
						display: inline-block;
						width: .75rem;
						height: .75rem;
						margin-top: .225rem;

					}
				}
				.share-desc{
					display: block;
					padding-top: .2rem;
					font-size: .24rem;
					color: #222;
				}
			}
		}
		.share-btn{
			width: 100%;
			height: 1rem;
			line-height: 1rem;
			text-align: center;
			font-size: .32rem;
			background-color: #f6f6f6;
		}
	}
	.reply-wrap{
		height: 100vh;
		border-radius: .3rem .3rem 0 0;
		background-color: #fff;
		.reply-header{
			position: relative;
			left: 0;
			top: 0;
			height: .89rem;
			line-height: .89rem;
			padding: 0 .36rem;
			text-align: center;
			border-bottom: .02rem solid @borderColor;
			.iconfont {
				position: absolute;
				left: .36rem;
				font-size: .45rem;
				font-weight: 700;
			}
			span{
				letter-spacing: .02rem;
				font-size: .32rem;
			}
		}
		.reply-body{
			width: 100%;
			height: calc(100vh - .89rem);
			overflow-y: auto;
			// overflow: auto;
			// padding: .32rem .3rem;
			padding: .32rem .3rem 1rem .3rem;
			.reply-container{
				width: 100%;
				&:first-child{
					border-bottom: .02rem solid @borderColor;
				}
				.reply-box{
					margin-bottom: .5rem;
				}
				.reply-img{
					width: .64rem;
					height: .64rem;
					border-radius: 50%;
					margin-right: .25rem;
					img{
						display: block;
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.reply-content{
					width: calc(100% - .89rem);
					.header{
						.header-desc{
							display: inline-block;
							font-size: .24rem;
							h4{
								font-weight: normal;
								color: #406599;
								// padding-bottom: .13rem;
								line-height: .5rem;
							}
							span{
								color: #979fac;
							}
						}
						.reply-fabulous{
							color: #979fac;
							span{
								font-size: .24rem;
								margin-right: -.1rem;
							}
							.iconfont{
								font-size: .36rem;
							}
							.icon-weizan{
								color: #979fac;
							}
						}
						.header-focus{
							font-weight: 700;
							font-size: .24rem;
							line-height: .5rem;
							color: #f96565;
						}
					}
					.reply-desc{
						margin: .26rem 0;
						p{
							line-height: .45rem;
						}
					}
					.reply-time-report{
						font-size: .24rem;
						color: #979fac;
					}
					.reply-time-delete{
						font-size: .24rem;
						.reply-point{
							color: #666;
							padding: 0 .15rem;
						}
					}
					.reply-footer{
						// padding: .26rem 0;
						height: 1rem;
						line-height: 1rem;
						.reply-footer-wrap{
							.reply-list{
								max-width: 1.68rem;
								height: .48rem;
								margin-top: .26rem;
								margin-right: .18rem;
								overflow: hidden;
								.reply-item{
									float: left;
									width: .48rem;
									height: .48rem;
									margin-right: .08rem;
									border-radius: 50%;
									img{
										display: block;
										width: 100%;
										height: 100%;
										border-radius: 50%;
									}
								}	
							}
							.reply-footer-desc{
								font-size: .24rem;
								color: #222;
								.iconfont{
									font-size: .3rem;
								}
							}
						}
						.reply-fabulous{
							color: #979fac;
							span{
								font-size: .24rem;
								margin-right: -.1rem;
							}
							.iconfont{
								font-size: .36rem;
							}
							.icon-weizan{
								color: #979fac;
							}
						}
					}

				}
			}
			.reply-discuss{
				line-height: .8rem;
			}
			.isDiscuss{
				line-height: .8rem;
				padding-left: .89rem;
			}
		}
	}
	.report-wrap{
		padding-top: .2rem;
		background-color: #f8f8f8;
		.report-header{
			text-align: center;
			line-height: .75rem;
			h2{
				font-weight: 500;
				font-size: .32rem;
				letter-spacing: .02rem;
			}
		}
		.report-body{
			padding: 0 .56rem;
			.report-list{
				 .report-item{
				 	line-height: .75rem;
				 	border-bottom: .02rem solid @borderColor;
				 	&:last-child{
				 		border-bottom: none;
				 	}
				 	.iconfont{
				 		color: #f00;
				 	}
				 	input{
				 		display: inline-block;
				 		width: 70%;
				 		height: .65rem;
				 		margin-top: -.06rem;
				 	}
				 }
			}
		}
		.report-footer{
			padding:  0 .56rem;
			line-height: .8rem;
			font-size: .32rem;
			text-align: center;
			color: #222;
			border-top: .02rem solid @borderColor;
			background-color: #fff;
		}
	}
	.vux-popup-dialog{
		background-color: transparent;
	}
	.pop-mask{
		display: block;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
    	z-index: 502;
		tap-highlight-color: rgba(0, 0, 0, 0);
		transition: opacity 400ms

	}
	.video-js .vjs-big-play-button{
		width: 2em;
		height: 2em !important;
	    font-size: 2.8em;
		border-radius: 50%;
		margin: 0 !important;
		transform: translate(-50%,-50%);
	}
</style>

<style scoped>
	.article-content >>> p{
		line-height: .5rem !important;
		margin-bottom: .3rem !important;
	}
	.article-content >>> p img{
		display: inline-block;
		width: 100%;
		border-radius: .08rem;
		padding: .04rem;
		border: .02rem solid #e8e8e8;
		text-align: center;
	}
	.vux-popup-show{
		/*z-index: 999 !important;*/
	}

</style>	
