<template>
	<div >
		<top @hrefTo="this,$Tool.goBack">
			<template slot="title">{{ '' }}</template>
		</top>
		<div class="detail">
			<section class="content-wrap">
				<h1>{{ article.title}}</h1>
				<div class="publisher bfc-o">
					<img :src="article.uImg" alt="" class="uphoto uphoto-big">
					<div>
						<div class="uname">
							{{ article.uName }}
						</div>
						<div class="ts">
							<time datetime="2011-01-12">{{ article.time }}</time>
							<span>{{ article.sort }}</span>
						</div>
					</div>
					<button type="button" class="focus bfc-p" @click="">关注+</button>
				</div>
				<div class="content">
					{{ article.content}}
				</div>
				<div class="key-wrap">
					关键词：<span class="key" v-for="item in article.keywords">{{ item }}</span>
				</div>
			</section>
			<div class="btn-a-wrap bfc-o">
				<button type="button" class="btn-a"><i class="iconfont icon2">&#xe7c8;</i>{{ article.like}}</button>
				<button type="button" class="btn-a"><i class="iconfont icon2">&#xe7c3;</i>不喜欢</button>
				<button type="button" class="btn-a"><i class="iconfont icon3">&#xe883;</i>微信</button>
				<button type="button" class="btn-a"><i class="iconfont icon3">&#xe882;</i>QQ</button>
			</div>
			<div class="comment">
					<ul class="">
						<li class="comment-li bfc-o">
							<div class="uphoto-wrap fl">
								<img class="uphoto" src="http://imglf1.ph.126.net/Re9FjZ0i7lKkHczXoij53w==/3752061439653360841.jpg" alt="">
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
									<form action="" method="get" accept-charset="utf-8" class="comment-form">
										<input type="text" class="input-commnet-content" name="" maxlength="100" placeholder="留下你的高见，一百字以内">
										<input type="submit" name="submit" class="submit-comment" value="回复">
									</form>										
									<ul class="reply-wrap">
										<li class="reply-li bfc-o">
											<div class="uphoto-wrap fl">
												<img class="uphoto" src="http://imglf1.ph.126.net/Re9FjZ0i7lKkHczXoij53w==/3752061439653360841.jpg" alt="">
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
												<img class="uphoto" src="http://imglf1.ph.126.net/Re9FjZ0i7lKkHczXoij53w==/3752061439653360841.jpg" alt="">
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
					<ul class="">
						<li class="comment-li bfc-o">
							<div class="uphoto-wrap fl">
								<img class="uphoto" src="http://imglf1.ph.126.net/Re9FjZ0i7lKkHczXoij53w==/3752061439653360841.jpg" alt="">
							</div>
							<div class="comment-detail">				
								<p><span class="uname oe bfc-d">馨心馨心</span><time datetime="2011-01-12">2011-01-12</time></p>
								<p class="ucomment">馨心馨心馨心馨心馨心馨心馨心馨心馨心馨心</p>
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
									<ul class="reply-wrap">
										<li class="reply-li bfc-o">
											<div class="uphoto-wrap fl">
												<img class="uphoto" src="http://imglf1.ph.126.net/Re9FjZ0i7lKkHczXoij53w==/3752061439653360841.jpg" alt="">
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
												<img class="uphoto" src="http://imglf1.ph.126.net/Re9FjZ0i7lKkHczXoij53w==/3752061439653360841.jpg" alt="">
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
		</div>
	</div>
</template>

<script>

import top from '@/components/common/top'
export default {
	components:{
		top,
	},
	data(){
		return {
			article:{
				uImg:"http://img.zcool.cn/community/0195be57cd70d90000012e7eb0dae8.jpg@1280w_1l_2o_100sh.jpg",
				uName:"小白读财经",
				time:'2018-8-14',
				title:"小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经",
				sort:"财经",
				content:`小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经
				小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经

				小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经`,
				keywords:['银行',"财经"],
				like:"100",
				commentNum:'66',
				comment:[{
					uName:'馨心',
					uImg:'http://img.zcool.cn/community/0195be57cd70d90000012e7eb0dae8.jpg@1280w_1l_2o_100sh.jpg',
					content:'评论评论评论评论评论评论评论评论评论评论评论',
					time:'2018-8-14',
					link:'10'
				},
				{
					uName:'xing',
					uImg:'http://img.zcool.cn/community/0195be57cd70d90000012e7eb0dae8.jpg@1280w_1l_2o_100sh.jpg',
					content:'评论评论评论评论评论评论评论评论评论评论评论',
					time:'2018-8-14',
					link:'10'
				},{
					uName:'辛幸',
					uImg:'http://img.zcool.cn/community/0195be57cd70d90000012e7eb0dae8.jpg@1280w_1l_2o_100sh.jpg',
					content:'评论评论评论评论评论评论评论评论评论评论评论',
					time:'3小时前',
					link:'10'
				}]
			}
		}
	},
	methods:{
	}
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