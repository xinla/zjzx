<template>
	<div class="userCenter-wrapper">
		<top>{{title}}</top>
		<div class="top-bg"></div>
		<div class="userCenter-head">
			<div class="userCenter-headimg">
				<img src="@/assets/images/header.jpeg" alt="用户头像">
			</div>
			<div class="userCenter-msg">
				<h3>用户名</h3>
				<div class="userCenter-address">
					<i class="iconfont">&#xe601;</i>
					地区：<span>中国北京</span>
				</div>
				<p class="userCenter-introduce">
					用户介绍用户介绍用户介绍用户介绍用户介绍用户介绍用户介绍用户介绍用户介绍用户介绍用户介绍用户介绍用户介绍用户介绍用户介绍用户介绍用户介绍用户介绍
				</p>
				<div class="follw-fans">
					<span><strong>0</strong>关注</span>
					<span><strong>0</strong>粉丝</span>
				</div>
			</div>
			<button class="userCenter-edit">编辑资料</button>	
		</div>
		<div class="userCenter-body">
			<ul>
				<li>动态</li>
			</ul>
			<div class="userCenter-content">
				暂无内容
			</div>
		</div>
	</div>
</template>

<script>
	import top from '@/components/common/top'
	export default {
		components:{
			top
		},
		data(){
			return{
				title:'',
			}
		}
	}
</script>

<style lang='css'>
	.top {
		background-color: #555 !important;
	}
	.back,.nav-icon{
		color:#fff !important;
	}
	.top-bg{
		padding-top: 50px;
		width: 100%;
		height: 150px;
		background:url('../../assets/images/topbg.jpg');
		background-position: 0 0;
		background-size: cover;
		background-repeat: no-repeat;
	}
	.userCenter-head{
		position: relative;
		width: 100%;
		padding: 0 15px;
		height: auto;
		background-color: #fff;
		border-bottom: 1px solid #e8e8e8;
	}
	.userCenter-headimg {
		display: inline-block;
		width: 96px;
		height: 96px;
		position: relative;
		top: -48px;
	}
	.userCenter-headimg img{
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 2px solid #f1f1f1;
	}

	.userCenter-msg {
		margin-top: -45px;
	}

	.userCenter-msg h3 {
		font-size: 18px;
		line-height: 48px;
		letter-spacing: 1px;
		color: #222;
	}
	.userCenter-address {
		line-height: 24px;
		font-size: 16px;
		color: #222;
	}

	.userCenter-introduce {
		width: 95%;
		line-height: 20px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.follw-fans {
		margin-bottom: 10px;
		line-height: 48px;
		color: #999;
	}
	.follw-fans strong {
		color: #406599;
		margin-right: 5px;
	}
	.userCenter-edit {
		position: absolute;
		top: 15px;
		right: 15px;
		background-color: #fff;
		border-radius: 6px;
		border: 1px solid #2b90d7;
		color: #2b90d7;
		padding: 4px 8px;
	}
	.userCenter-body {
		
	}
	.userCenter-body ul {
		width: 100%;
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid #e8e8e8;
		background-color: #fff;
		padding: 0 15px;
		font-size: 18px;
	}

	.userCenter-body ul li {
		display: inline-block;
		height: 100%;
		border-bottom: 3px solid #ec414d;
		color: #ec414d;
	}
	.userCenter-content {
		height: calc(100vh - 406px);
		font-size: 18px;
		color: #999;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>