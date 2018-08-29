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
			<!-- 未登录 -->
			<div class="member-login" v-if="!ifLogin">
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

			<!-- 已登录 -->
			<router-link :to="{ path:'/personBase/published',query:{current:1} }">				
				<div class="member-user clearfix" v-if="ifLogin">
					<div class="member-user-headimg fl">
						<img src="@/assets/images/header.jpeg" alt="">

					</div>
					<div class="member-user-box fl">
						<h3 class="username">用户名</h3>
						<div class="follow dib">关注<span>0</span></div>
						<div class="fans dib">粉丝<span>0</span></div>
					</div>
					<div class="member-user-arrow fr">
						<i class="iconfont">&#xe628;</i>
					</div>
				</div>
			</router-link>


			<div class="member-func">
				<ul class="member-func-list clearfix">
					<li class="member-func-item">
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
		<zNav></zNav>
	</div>
</template>

<script>
	import zNav from '@/components/navBar'
	import config from '@/lib/config/config'
	import fileService from '@/service/fileService'
	export default {
		components:{
			zNav,
		},
		created(){
			let login = localStorage.getItem('token');
			if(login){
				this.ifLogin=true;
			}else{
				this.ifLogin=false;
			}

			console.log(fileService);
		},
		data() {
			return {
				ifLogin:false,
				modal1: [
					{
						icon: require('@/assets/images/icon-msg.png'),
						text: '我的消息',
						link: '/memberBase/messages'
					},
					{
						icon: require('@/assets/images/icon-guanzhu.png'),
						text: '我的关注',
						link: '/memberBase/focus'						
					},
					{
						icon: require('@/assets/images/icon-money.png'),
						text: '我的钱包',
						link: '/memberBase/wallet'
					},

				],
				modal2: [
					{
						icon: require('@/assets/images/icon-kefu.png'),
						text: '在线客服',
						link: '/memberBase/wallet'
					},
					{
						icon: require('@/assets/images/icon-zan.png'),
						text: '推荐给好友',
						link: '/memberBase/wallet'
					},
					{
						icon: require('@/assets/images/icon-fankui.png'),
						text: '用户反馈',
						link: '/memberBase/feedback'
					}
				],
				modal3: [
					{
						icon: require('@/assets/images/icon-setup.png'),
						text: '设置',
						link: '/memberBase/set'
					},
				],
				loginLink:'/memberBase/login'

				
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
		padding-bottom: 75px;
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
		padding: 6px 10px;
		border-radius: 12px;
		color: #fff;
	}

	.member-user {
		padding: 20px 15px;
		border-bottom:1px solid #e8e8e8;
	}
	.member-user-headimg{
		width: 96px;
		height: 96px;
		
	}
	.member-user-headimg img{
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 1px solid #e8e8e8;
	}

	.member-user-box {
		padding-left: 20px;
	}

	.member-user-box h3.username {
		padding: 15px 0;
		font-size: 18px;
		font-weight: 600;
		letter-spacing: 1px;
	}
	.member-user-box .follow,
	.member-user-box .fans {
		font-size: 14px;
		color: #666;
		margin-right: 8px;
	}

	.member-user-box .follow span,
	.member-user-box .fans span {
		color: #222;
		margin-left: 5px;
		font-weight: 600;
	}
	.member-user-arrow {
		margin-top: 25px;
	}
	.member-user-arrow  i{
		font-size: 25px;
		color: #999;
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