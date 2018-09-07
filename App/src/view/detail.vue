<template>
	<div >
		<top @hrefTo="this.$Tool.goBack">
			<template slot="title">{{ '' }}</template>
		</top>
		<div class="detail">
			<section class="content-wrap" v-if="!proFail1">
				<h1>{{ article.title}}</h1>
				<div class="publisher bfc-o">
					<img :src="imgurl" alt="" class="uphoto uphoto-big">
					<div>
						<div class="uname">
							{{ artUser.username }}
						</div>
						<div class="ts">
							<time datetime="2011-01-12">{{ article.publishtime }}</time>
							<!-- <span>{{ article.classify }}</span> -->
						</div>
					</div>
					<button type="button" class="focus bfc-p" @click="doFocus">{{focusState==0?'关注+':'已关注'}}</button>
				</div>
				<div class="content">
					{{ article.content}}
				</div>
				<div class="key-wrap">
					关键词：<span class="key" v-for="item in article.keywords">{{ item }}</span>
				</div>
			</section>
			<prompt-blank v-if="proFail1" :mes="failMes1"></prompt-blank>			
			<div class="btn-a-wrap bfc-o">
				<button type="button" class="btn-a"><i class="iconfont icon2">&#xe7c8;</i>{{ article.like}}</button>
				<button type="button" class="btn-a"><i class="iconfont icon2">&#xe7c3;</i>不喜欢</button>
				<button type="button" class="btn-a"><i class="iconfont icon3">&#xe883;</i>微信</button>
				<button type="button" class="btn-a"><i class="iconfont icon3">&#xe882;</i>QQ</button>
			</div>	
			<div class="comment" v-if="!proFail2">
				<div class="comment-form">
					<input type="text" class="input-commnet-content" v-model="commentCon" maxlength="100" placeholder="留下你的高见，一百字以内">
					<input type="button"class="submit-comment" value="评论" @click="comment">
				</div>
				<ul class="comment-ul">
					<li class="comment-li bfc-o" v-for="item in commentList">
						<div class="uphoto-wrap fl">
							<img class="uphoto" :src="imgurl" alt="">
						</div>
						<div class="comment-detail">				
							<p><span class="uname oe bfc-d">直击真相</span><time datetime="2011-01-12">2011-01-12</time></p>
							<p class="ucomment">直击真相直击真相直击真相直击真相</p>
							<div>
								<div>
									<button type="button" class="reply reply-btn">回复</button>&nbsp;-&nbsp;<button type="button" class="reply reply-sh">
										<span class="rep-show"><var>120</var>条回复<i class="iconfont">&#xe7f6;</i></span>
										<span class="rep-hide">收起回复<i class="iconfont">&#xe7f4;</i></span>
									</button>
									<div class="like-wrap fr">
										<var>125</var><button type="button" class="like-btn"><i class="iconfont icon2">&#xe7c8;</i><i class="iconfont icon2 like-animate">&#xe7c8;</i></button>
										<i class="iconfont icon2 report-comment-btn ">&#xe77e;</i>
									</div>
								</div>	
								<div class="comment-form">
									<input type="text" class="input-commnet-content" name="" maxlength="100" placeholder="留下你的高见，一百字以内">
									<input type="submit" name="submit" class="submit-comment" value="回复">
								</div>											
								<ul class="reply-wrap">
									<li class="reply-li bfc-o">
										<div class="uphoto-wrap fl">
											<img class="uphoto" :src="imgurl" alt="">
										</div>
										<div class="comment-detail">				
											<p><span class="uname oe bfc-d">直击真相</span><time datetime="2011-01-12">2011-01-12</time></p>	
											<p class="ucomment">直击真相直击真相直击真相直击真相</p>
											<div>
												<div>
													<button type="button" class="reply reply-btn">回复</button>&nbsp;-&nbsp;<button type="button" class="reply reply-num">条回复</button>
												</div>
											</div>
										</div>
									</li>
									<li class="reply-li bfc-o">
										<div class="uphoto-wrap fl">
											<img class="uphoto" :src="imgurl" alt="">
										</div>
										<div class="comment-detail">				
											<p><span class="uname oe bfc-d">直击真相</span><time datetime="2011-01-12">2011-01-12</time></p>	
											<p class="ucomment">直击真相直击真相直击真相直击真相</p>
											<div>
												<div>
													<button type="button" class="reply reply-btn">回复</button>&nbsp;-&nbsp;<button type="button" class="reply reply-num">条回复</button>
												</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<prompt-blank v-if="proFail2" :mes="failMes2"></prompt-blank>			
		</div>
	</div>
</template>

<script>
import config from '@/lib/config/config'
import articleService from '@/service/articleService'
import userService from '@/service/userService'
import followService from '@/service/followService'
import articleCommentService from '@/service/article_commentService'
export default {
	data(){
		return {
			id:Number,
			imgurl:require('@/assets/images/userPhoto.jpg'),
			fileRoot:config.fileRoot+'/',
			focusState:0,
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
			proFail1:false,
			proFail2:false,
			failMes1:"获取内容失败",
			failMes2:"获取评论失败",
			commentCon:'',
		}
	},
	mounted(){
		this.id = this.$route.query.id;
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
			if (this.artUser.imageurl) {
				this.imgurl = fileRoot + this.artUser.imageurl;
			}
		}
		// console.log(resUserInfo)
		// 关注/取消关注
		if (localStorage.getItem('token')) {
			let resFocusState = followService.doFollow(this.article.author);
			if (resFocusState && resFocusState.status == "success") {
				this.focusState = resFocusState.result;
			}			
		}
		// 获取文章评论列表
		let resArticleCommentList = articleCommentService.getArticleCommentPage(this.id,1,10);
		if (resArticleCommentList&&resArticleCommentList.status == "success") {
			this.commentList = resArticleCommentList.list.list;
		} else {
			this.proFail2 = true;
		}
		console.log(resArticleCommentList)
		// console.log(this.commentList)
		
	},
	methods:{
		doFocus(){
			// 关注/取消关注
			if (localStorage.getItem('token')) {
				let resFocusState = followService.doFollow(this.article.author);
				if (resFocusState && resFocusState.status == "success") {
					this.focusState = resFocusState.result;
				}			
			}else{
				this.$vux.alert.show({
				  content: '请先登录',
				})
				setTimeout(function(){
					this.$vux.alert.hide();
				},1000)
			}
		},
		comment(){
			if (localStorage.id) {
				let userId = localStorage.id;
				if (this.commentCon && this.$Tool.checkInput(this.commentCon)) {
					let resArticleComment = articleCommentService.articleComment(this.id,this.commentCon,userId,this.article.author,1);	
					if (resArticleComment && resArticleComment.status == "success") {

					} else {

					}			
				} else {
					this.$vux.alert.show({
					  content: '内容不合法，亲修改后提交',
					})
					setTimeout(function(){
						this.$vux.alert.hide();
					},1000)
				}
			} else {
				this.$vux.alert.show({
				  content: '请先登录',
				})
				setTimeout(function(){
					this.$vux.alert.hide();
				},1000)
			}
		}
	},
}
</script>

<style scoped>
	.detail{
		background: #eee;
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
	    font-size: 24px;
	    vertical-align:sub ;
	    cursor: pointer;
	    color: #666;
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
	    color: #3a5ab5;
	}
	.reply-li {
	    padding-top: 15px;
	}
	.like-btn {
	    position: relative;
	}
	.like-animate {
	    position: absolute;
	    left: 0;
	    bottom: 0;
	    -webkit-transition: all 1s;
	    transition: all 1s;
	}
	.like-animate-up {
	    opacity: 0;
	    bottom: 20px;
	    color: #f40;
	}
	.rep-hide {
	    display: none;
	}
	.comment-form {
	    position: relative;
	    border-top: 10px solid transparent;
	}
	.input-commnet-content {
	    border: 1px solid #888;
	    width: 100%;
	    text-indent: 6px;
	    background: #fff;
	}
	.submit-comment {
	    position: absolute;
	    width: 100px;
	    top: 0;
	    right: 0;
	    background: #333;
	    color: #fff;
	}
	.comment input {
	    line-height: 35px;
	    height: 35px;
	}
</style>