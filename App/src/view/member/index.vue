<template>
	<div class="member-wrap">
		<div class="member-head">
			<div class="member-headtop clearfix">
				<div class="member-dark fl">
					<i class="iconfont">&#xe650;</i>
					<span>夜间</span>
				</div>
				<div class="member-sign-in fr">
					<i class="iconfont">&#xe65d;</i>
					<span>签到</span>
				</div>
			</div>
			<div class="member-login">
				<ul class="member-login-way clearfix">
					<li><i class="iconfont">&#xe61f;</i></li>
					<li><i class="iconfont">&#xe61d;</i></li>
					<li><i class="iconfont">&#xe7e5;</i></li>
					<li><i class="iconfont">&#xe66e;</i></li>
				</ul>
				<div class="member-login-btn">
					<router-link :to="{path:loginLink}">
						<a href="javascript:void(0)">登录/注册</a>
					</router-link>
				</div>
				
			</div>
			<div class="member-func">
				<ul class="member-func-list">
					<li class="member-func-item clearfix">
						<i class="iconfont">&#xe616;</i>
						<span>评论</span>
					</li>
					<li class="member-func-item">
						<i class="iconfont">&#xe7a7;</i>
						<span>收藏</span>
					</li>
					<li class="member-func-item">
						<i class="iconfont">&#xe629;</i>
						<span>历史</span>
					</li>
					<li class="member-func-item">
						<i class="iconfont">&#xe642;</i>
						<span>占位</span>
					</li>

				</ul>
			</div>
		</div>
		<div class="member-body" >
			<ul class="member-modal">
				<li class="member-modal-item clearfix" v-for='item in modal1'>
					<router-link :to="{ path:item.link,query:{title:item.text} }">
						<div class="member-icon fl">
							<img :src="item.icon">
						</div>
						<p class="fl">{{item.text}}<b class="iconfont icon-arrow">&#xe628;</b></p>
					</router-link>
				</li>
			</ul>
			<ul class="member-modal">
				<li class="member-modal-item clearfix" v-for='item in modal2'>
					<router-link :to="{ path:item.link,query:{title:item.text} }">
						<div class="member-icon fl">
							<img :src="item.icon">
						</div>
						<p class="fl">{{item.text}}<b class="iconfont icon-arrow">&#xe628;</b></p>
					</router-link>
				</li>
			</ul>
			<ul class="member-modal">
				<li class="member-modal-item clearfix" v-for='item in modal3'>
					<router-link :to="{ path:item.link,query:{title:item.text} }">
						<div class="member-icon fl">
							<img :src="item.icon">
						</div>
						<p class="fl">{{item.text}}<b class="iconfont icon-arrow">&#xe628;</b></p>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				modal1: [
					{
						icon: require('@/assets/images/icon-msg.png'),
						text: '我的消息',
						link: '/memDetail/messages'
					},
					{
						icon: require('@/assets/images/icon-guanzhu.png'),
						text: '我的关注',
						link: '/memDetail/focus'						
					},
					{
						icon: require('@/assets/images/icon-money.png'),
						text: '我的钱包',
						link: '/memDetail/wallet'
					},

				],
				modal2: [
					{
						icon: require('@/assets/images/icon-kefu.png'),
						text: '在线客服',
						link: '/memDetail/wallet'
					},
					{
						icon: require('@/assets/images/icon-zan.png'),
						text: '推荐给好友',
						link: '/memDetail/wallet'
					},
					{
						icon: require('@/assets/images/icon-fankui.png'),
						text: '用户反馈',
						link: '/memDetail/feedback'
					}
				],
				modal3: [
					{
						icon: require('@/assets/images/icon-setup.png'),
						text: '设置',
						link: '/memDetail/set'
					},
				],
				loginLink:'/memDetail/login'

				
			}
		},
		methods:{
			transArgs(link,title){
				this.router.push({
					path:link,
					query:{
						title:title,
					}
				});
			}
		}
	}
</script>

<style lang="css" scoped>
	.member-wrap {
		
	}
	.member-head {
		background-color: #fff;
		padding: 15px 15px;
	}
	.member-headtop {
		position: relative;
		margin-bottom: 25px;
	}
	.member-headtop > div {
		padding: 8px 12px;
		text-align: center;
		border: 1px solid #e8e8e8;
		border-radius: 10px;
		background-color: #fff;
		font-size: 15px;
		color: #1497ea;
	}
	.member-dark i {
		font-size: 18px;
		vertical-align: bottom;
	}
	.member-login {
		padding: 0 20px;
		border-bottom:1px solid #e8e8e8;
	}
	.member-login-way {
		margin-bottom: 25px;
	}
	.member-login-way li {
		float: 	left;
		width: 25%;	
		text-align: center;
	}
	.member-login-way li:last-child{
		margin-right: 0;
	}
	.member-login-way i {
		font-size: 32px;
	}
	.member-login-way li:first-child i {
		color: #1ab2e8;
	}
	.member-login-way li:nth-child(2) i {
		color: #1c999f;
	}
	.member-login-way li:nth-child(3) i {
		color: #06bb14;
	}
	.member-login-way li:last-child i {
		color: #d81e06;
	}

	.member-login-btn {
		text-align: center;
		margin-top: 25px;
		padding-bottom: 20px;
	}
	.member-login-btn a {
		display: inline-block;
		background-color: #ec414d;
		padding: 10px 20px;
		border-radius: 12px;
		color: #fff;
	}
	.member-func-list {
		padding: .7em 0;
		padding-top: 1em;
		padding-bottom: .7em;
		display: flex;
	}
	.member-func-item {
		flex: 1;
		text-align: center;
		color: #666;
	}
	.member-func-list i{
		display: block;
		font-size: 24px;
	}

	.member-func-list span {
		display: block;
		font-size: 16px;
		padding-top: 6px;
	}
	.member-modal {
		margin-top: 20px;
		background-color: #fff;
		padding-left: 15px;

	}
	.member-modal-item {
		width: 100%;
		height: 50px;
		line-height: 50px;
	}
	.member-modal-item .member-icon {
		width: 20px;
		height: 20px;
		margin-top: 15px;
	}
	.member-modal-item .member-icon img {
		display: block;
		width: 100%;
		height: 100%;
	}
	.member-modal-item p {
		height: 100%;
		float: left;
		width: calc(100% - 20px);
		font-size: 16px;
		border-bottom: 1px solid #e8e8e8;
		text-indent: 15px;
		padding-right: 15px;
		position: relative;
		letter-spacing: 1px;
	}

	.member-modal .member-modal-item:last-child p {
		border-bottom: none;
	}
	.member-modal-item b{
		position: absolute;
		top: 0;
		right: 15px;
		color: #999;
	}
</style>