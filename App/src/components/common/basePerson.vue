<template>
	<div>
		<top @hrefTo="$Tool.goPage({name:'/'})">
			<template slot="title">{{title}}</template>
		</top>
		<div class="member-msg">
			<div class="member-msg-header">
				<div class="member-msg-image">
					<img src="../../assets/images/header.jpeg" alt="">
				</div>
				<div class="member-msg-modal">
					<ul class="member-msg-list">
						<li class="member-msg-item" @click="$Tool.goPage({ name:'release',query:{title:'发布图文',sort:1}})">
							<span>{{publidsedNum}}</span>
							发布
						</li>
						<li class="member-msg-item">
							<span>{{focusNum}}</span>
							关注
						</li>
						<li class="member-msg-item">
							<span>{{fansNum}}</span>
							粉丝
						</li>
					</ul>
					<div class="member-msg-btn">
						<button class="btn btn-edit"  @click="$Tool.goPage({ name:'editInfo',query:{title:'编辑资料'}})">编辑资料</button>
						<button class="btn btn-apply" @click="$Tool.goPage({ name:'identityIndex',query:{title:'申请认证'}})">申请认证</button>
					</div>
				</div>
				
			</div>
		</div>
		<div class="member-tab">
			<ul class="member-switch">
				<router-link class="member-switch-item active" v-for="(item, index) in switchList" tag="li" :to="{path:item.path,query:{current:item.query}}" :key="item.query" exact>{{item.desc}}
				</router-link>
			</ul>
		</div>
		<div class="main">
			<router-view></router-view>
		</div>
	
	</div>
</template>

<script>
import config from '@/lib/config/config'
import articleService from '@/service/articleService'
import followService from '@/service/followService'
export default {
	data(){
		return {
			demo2: '美食',
			 index: 0,
			 // list2: list(),
			title:'',
			userPhoto:require('@/assets/images/userPhoto.jpg'),
			focusNum:{
				type:Number,
				default:0,	
			},
			fansNum:{
				type:Number,
				default:0,	
			},
			publidsedNum:{
				type:Number,
				default:0,	
			},	

			switchList:[
				{desc:'发布', path:'/personBase/published', query:1},
				{desc:'关注', path:'/personBase/focus', query:2},
				{desc:'粉丝', path:'/personBase/fans', query:3},
				{desc:'收藏', path:'/personBase/collect', query:4},
				{desc:'历史', path:'/personBase/history', query:5},

			]
		}
	},
	mounted(){
		var userData = JSON.parse(localStorage.userData);
		this.title = userData.username;
		if( userData.imageurl ){
			this.userPhoto = config.fileRoot + '/' + userData.imageurl;
		}	
		//获取文章数量
		articleService.getUserArticleCount(data=>{
			if (data && data.status == "success" ) {
				this.publidsedNum = data.result.count;			
			}			
		});
		// console.log(resArticleCount)
		//获取粉丝数量
		followService.getUserVermicelliCount(data=>{
			if (data && data.status == "success" ) {
				this.fansNum = data.result.count;
			}
		});
		
		//获取关注数量
		followService.getUserFollowCount(data=>{
			if (data && data.status == "success" ) {
				this.focusNum = data.result.count;
			}
		});
		
	},
}
</script>

<style lang="less" scoped>
	.member-msg{
		margin-top: @topHeigth;
		padding: .3rem .4rem;
		background-position: 0 0;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-image: url('../../assets/images/logo-bg.png');
		color: #fff;
		.member-msg-header{
			display: flex;
			overflow: hidden;
			.member-msg-image{
				width: 1.4rem;
				height: 1.4rem;
				// margin-right: .6rem;
				img {
					display: block;
					width: 100%;
					height: 100%;
					border-radius: 50%;
					border: .04rem solid @borderColor;
				}
			}
			.member-msg-modal {
				position: absolute;
				right: .4rem;
				.member-msg-list{
					display: flex;
					overflow: hidden;
					padding-top: .1rem;
					.member-msg-item{
						text-align: center;
						margin-right: .7rem;
						font-size: .24rem;
						span{
							display: block;
							margin-bottom: .1rem;

						}
					}
				}
			}
			.member-msg-btn{
				margin-top: .2rem;
				button {
					padding: .08rem .2rem;
					color:#66b3ff;
					font-size: .24rem;
					border: .02rem solid #66b3ff;
					border-radius: .24rem;
					margin-right: .2rem;
				}
				.btn-deit{
					color:#66b3ff;
					border-color: #66b3ff;
				}
				.btn-apply{
					color: #fff;
					border-color: @mainColor;
					background-color: @mainColor;
				}

			}
		}
	}
	.member-tab{
		background-color: #fff;
		.member-switch {
			display: flex;
			.member-switch-item{
				flex:1;
				text-align: center;
				height: .7rem;
				line-height: .7rem;
				font-size: .28rem;
				border-bottom: .02rem solid @borderColor;
			}
			.router-link-active.active {
				color: @mainColor;
				border-bottom: .04rem solid @mainColor;
			}

		}
	}
	.main{
	}
</style>