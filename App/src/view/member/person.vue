<template>
	<div>
		<top>
			{{title}}
		</top>
		<header id="header" class="bfc-o">
			<img src="http://a5.topitme.com/o025/1002536708f56d0bfd.jpg" alt="" class="uphoto fl">
			<div class="person-header-right ac bfc-o">
				<ul class="person-hr-ul bfc-o">
					<li class="person-hr-li fl">
						<p>100</p>
						发布
					</li>
					<li class="person-hr-li fl">
						<p>100</p>
						关注
					</li>
					<li class="person-hr-li fl">
						<p>100</p>
						粉丝
					</li>
				</ul>
				<div class="right-btn bfc-d">
					<router-link :to="{path:''}">编辑资料</router-link>
					
				</div>
				<div class="right-btn bfc-d">
					申请认证
				</div>
			</div>
		</header><!-- /header -->
		<div class="main">
			<ul class="switch-wrap bfc-o">
				<router-link :to="{path:'published',query:{current:1}}" :class="['sort',{current:show==1?1:0}]" tag='li'>发布				
				</router-link>
				<router-link :to="{path:'focus',query:{current:2}}" :class="['sort',{current:show==2?1:0}]" tag='li'>关注				
				</router-link>
				<router-link :to="{path:'fans',query:{current:3}}" :class="['sort',{current:show==3?1:0}]" tag='li'>粉丝				
				</router-link>
				<router-link :to="{path:'collect',query:{current:4}}" :class="['sort',{current:show==4?1:0}]" tag='li'>收藏				
				</router-link>
				<router-link :to="{path:'history',query:{current:5}}" :class="['sort',{current:show==5?1:0}]" tag='li'>历史				
				</router-link>
			</ul>
			<router-view></router-view>
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
			title:'用户名',
			show:true,
			pubArticle:[
				{
					img:"http://imglf1.ph.126.net/Re9FjZ0i7lKkHczXoij53w==/3752061439653360841.jpg",
					href:"http://www.baidu.com",
					title:"发布发布发布发布发布发布发布发布发布发布发布发布发布发布",
					uName:"新华社",
					comment:255,
					collect:200,
					time:"2015-8-8"
				},
				{
					img:"http://img.zcool.cn/community/01635d571ed29832f875a3994c7836.png@900w_1l_2o_100sh.jpg",
					href:"http://www.baidu.com",
					title:"发布发布发布发布发布发布发布发布发布发布发布发布发布发布",
					uId:"新华社",
					comment:255,
					collect:200,
					time:"2015-8-8"
				}],
			focus:[
				{
					photo:"http://imglf1.ph.126.net/Re9FjZ0i7lKkHczXoij53w==/3752061439653360841.jpg",
					uName:"新华社",
					focus:22,
					public:1000,
					collect:500
				},{
					photo:"http://imglf1.ph.126.net/Re9FjZ0i7lKkHczXoij53w==/3752061439653360841.jpg",
					uName:"新华社",
					focus:22,
					public:1000,
					collect:500
				},{
					photo:"http://imglf1.ph.126.net/Re9FjZ0i7lKkHczXoij53w==/3752061439653360841.jpg",
					uName:"新华社",
					focus:22,
					public:1000,
					collect:500
				}
			]				
		}
	},
	methods:{
		delArc(index){
			this.pubArticle.splice(index,1);
		},
	},
	watch:{
		$route(to,from){
			let par = this.$route.query.current;
			this.show = par;
		}
	}
}
</script>

<style rel="stylesheet" scoped>
	.uphoto{
		width: 15%;
		max-width: 100px;
		margin-right: 5%;
		border-radius: 50%;
	}
	header{
		padding:65px 10px 15px;
		background: #fff;
		margin-bottom: 10px;
	}
	.person-header-right{
		max-width: 520px;
	}
	.person-hr-ul{
		margin-bottom: 10px;
	}
	.person-hr-li{
		font-size: 12px;
		margin-right: 2%;
		width: 31%;
	}
	.right-btn{
		width: 40%;
		max-width: 150px;
		background: #f40;
		color: #fff;
		border-radius: 8px;
		margin-right: 2%;
		line-height: 20px;
	}
	.main{
		background: #fff;
	    padding: 0 10px;
	}
	.sort {
	    width: 20%;
	    max-width: 80px;
	    line-height: 40px;
	    cursor: pointer;
	    float: left;
	    text-align: center;
	}
	.current {
	    color: #f40;
	    border-bottom: 1px solid #f40;
	}
	#current{
		display: block;
	}
	.uname{
		width: 10%;
		max-width: 75px;
		border-radius: 50%;
		margin-right: 2%;
	}
</style>