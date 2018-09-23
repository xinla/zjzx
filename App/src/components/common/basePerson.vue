<template>
	<div>
		<top @hrefTo="$Tool.goPage({name:'member'})">
			<template slot="title">{{title}}</template>
		</top>
		<div class="top-fix ac">
			<header id="header" class="bfc-o">
				<img :src="userPhoto" alt="" class="uphoto bfc-d">
				<div class="person-header-right ac bfc-d">
					<ul class="person-hr-ul bfc-o">
						<li class="person-hr-li fl" @click="$Tool.goPage({ name:'release',query:{title:'发布图文',sort:1}})">
							<p class="num">{{publidsedNum}}</p>
							发布
						</li>
						<li class="person-hr-li fl">
							<p class="num">{{focusNum}}</p>
							关注
						</li>
						
						<li class="person-hr-li fl">
							<p class="num">{{fansNum}}</p>
							粉丝
						</li>
					</ul>
					<div class="right-btn bfc-d right-btn-a" @click="$Tool.goPage({ name:'editInfo',query:{title:'编辑资料'}})">编辑资料												
					</div>
					<div class="right-btn bfc-d" @click="$Tool.goPage({ name:'identityIndex',query:{title:'申请认证'}})">申请认证											
					</div>
				</div>
			</header><!-- /header -->
			<ul class="switch-wrap bfc-d">
				<router-link :to="{path:'published',query:{current:1}}" class="sort" tag='li' exact>发布				
				</router-link>
				<router-link :to="{path:'focus',query:{current:2}}" class="sort" tag='li' exact>关注				
				</router-link>
				<router-link :to="{path:'fans',query:{current:3}}" class="sort" tag='li' exact>粉丝				
				</router-link>
				<router-link :to="{path:'collect',query:{current:4}}" class="sort" tag='li' exact>收藏				
				</router-link>
				<router-link :to="{path:'history',query:{current:5}}" class="sort" tag='li' exact>历史				
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

<style rel="stylesheet" scoped>
	.top-fix{
		position: fixed;
	    width: 100%;
	    margin-top: 50px;
	    background: #f4f5f6;
	    z-index: 99;
	}
	.uphoto{
		width:1rem;
		height: 1rem;
		max-width: 70px;
		max-height: 70px;
		vertical-align: middle;
		border-radius: 50%;
	}
	header{
		padding:10px;
		background: #fff;
		margin: 10px 0;
		font-size: 0;
	}
	.person-header-right{
		max-width: 520px;
		width: 75%;
		font-size: 14px;
		vertical-align: middle;
	}
	.person-hr-ul{
		margin-bottom: 10px;
	}
	.person-hr-li{
		font-size: 12px;
		margin:0 1%;
		width: 31%;
	}
	.num{
		font-weight: 600;
	}
	.right-btn{
		width: 35%;
		max-width: 150px;
		background: #f40;
		color: #fff;
		border-radius: 8px;
		margin:0 2%;
		height: 25px;
		line-height: 25px;
		border:1px solid #ddd;
	}
	.right-btn-a{
		color: #333;
		background: #fff;
	}
	.main{
		background: #fff;
	    padding: 200px 10px 0;
	}
	.sort {
	    width: 20%;
	    max-width: 80px;
	    cursor: pointer;
	    float: left;
	    text-align: center;
	    font-size: 16px;
	}
 	.router-link-active.sort {
	    color: #f40;
	    border-bottom: 1px solid #f40;
	}
	#current{
		display: block;
	}
	.switch-wrap{
		width: 100%;
		border-bottom: 1px solid #eee;
		background: #fff;
	    line-height: 40px;
		height: 41px;
	}
</style>