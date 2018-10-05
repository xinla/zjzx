<template>
	<div class="text-wrap bfc-o"  @click="$Tool.goPage({ name:'detail',query:{id,}})">
		<div>
			<!-- 单图文 -->
			<div class="img-wrap fr" v-if="imgList.length < 3">
				<img v-for="(item,index) in imgList" v-if="index == 0" :src="item?item:imgurl">	
			</div>
			<h1 class="articel-title">{{article.title}}</h1>
			<!-- 三图文 -->
			<div class="img-wrap bfc-o" v-if="imgList.length >=3">
				<img v-for="(item,index) in imgList" v-if="index < 3" :src="item?item:imgurl">	
			</div>
			<!-- picture -->
			<div class="img-wrap img-three bfc-o" v-if="1 == article.type && ArticleFile.length">
				<ul class="img-list clearfix">
					<li class="img-item" v-for="(item, index) in ArticleFile" v-if="index < 3">
						<img :src="item.url?(fileRoot+item.url):imgurl" alt="">
					</li>
				</ul>
			</div>
			<!-- video -->
			<div class="big bfc-o" v-else-if="2 == article.type && ArticleFile.length">
				<i class="iconfont icon-play-circle cc"></i>
				<img class="big" :src="ArticleFile[0].thumbnail?(fileRoot + ArticleFile[0].thumbnail):imgurl" alt="">
			</div>
		</div>
		<p class="pub">
			<span v-if="ifPublisher">{{publisher}}</span>
			<span>{{CommentNum}}评</span>
			<span>{{publishtime}}</span>
			<small class="delete fr" @click="$emit('delete',[id,whi])" v-if="ifDel">X</small>
		</p>
	</div>
</template>
<script>
import config from '@/lib/config/config'
import articleFileService from '@/service/article_fileService'
import articleCommentService from '@/service/article_commentService'
import userService from '@/service/userService'
import articleService from '@/service/articleService'

// import store from '@/store/store'
export default {
	data(){
		return {
			id:this.article.id,
			imgurl:require('@/assets/images/userPhoto.jpg'),
			ArticleFile:[
				{
					thumbnail:"",
				}
			],
			CommentNum:{
				type:Number,
				default:0,
			},
			publishtime:this.article.publishtime,
			fileRoot:config.fileRoot+'/',
			publisher:"",
			imgList:[],
		}
	},
	props:{
		article:Object,
		whi:Number,
		ifPublisher:{
			type:Boolean,
			default:true,
		},
		ifDel:true,
	},
	mounted(){
		this.$nextTick(()=>{
			this.getArticleInfo();
		})
	},	
	watch:{
		article(){
			this.getArticleInfo();		
		}
	},
	methods:{
		getArticleInfo(){
			articleFileService.getFileByArticle(this.article.id,data=>{
				if (data&&data.status == "success") {
					this.ArticleFile = data.result.filelist;				
				}				
			});
			if (this.article.author) {
				userService.getUserById(this.article.author,data=>{
					if (data && data.status == "success") {
						this.publisher = data.result.user.username;
					}
				});				
			}else{
				this.publisher = "真相官方";
			}
			// 获取文章评论数量
			articleCommentService.getArticleCommentCount(this.article.id,data=>{
				if (data.status == "success") {
					this.CommentNum = data.result.count;		
				}else{
					this.CommentNum = 0;
				}					
			});

			this.publishtime = this.$Tool.publishTimeFormat(this.article.publishtime);	
			this.imgList = this.$Tool.extractImg(this.article.content,3);
		}
	}
}
</script>
<style lang="less" scoped>
	.text-wrap {
		padding: .3rem;
		border-bottom: .02rem solid @borderColor;
		background-color: #fff;
		.articel-title {
			font-size: .28rem;
			font-weight: 500;
			line-height: .4rem;
			margin-bottom: .2rem; 
		}
		.img-three{
			margin-bottom: .35rem;
			.img-item {
				float: left;
				width: 32%;
				height: 1.3rem;
				border: .02rem solid @borderColor;
				margin-right: 2%;
				img{
					display: block;
					width: 100%;
					height: 100%;
					object-fit: fill;
				}
			}
			.img-item:last-child{
				margin-right: 0;
			}
		}
		.pub {
			line-height: .4rem;
			font-size: .24rem;
			color: #999;
			.delete{
				width: .5rem;
				height: .4rem;
				line-height: .4rem;
				border: .02rem solid @borderColor;
				border-radius: .12rem;
				text-align: center;
				font-size: .2rem;
			}
		}
	}
	/* .text-wrap{
	    border-bottom: 1px solid #eee;
	    background-color: #fff;
	    padding: .3rem .2rem;
	}
	h1{
		margin:.3em 0;
		font-weight: normal;
		font-size: 16px;
	    line-height: 1.5em;
	}
	[data-dpr='2'] h1{
		font-size: 36px;
	}
	[data-dpr='3'] h1{
		font-size: 54px;
	}
	.pub{
		line-height: 2.5em;
	    color: #999;
	}
	.img-wrap img{
		float: left;
		width: 2.2rem;
		height: 2.2rem;
		max-width: 200px;
		margin:0 1%;
	}
	small.delete {
	        font-size: 0.85em;
	    background: #eee;
	    width: 1.1em;
	    line-height: 1.1em;
	    text-align: center;
	    border-radius: 1.6em;
	    vertical-align: middle;
	    top: 0.85em;
	}
	img{
		background: url('../../assets/images/imgErrorBg.png') #efefef no-repeat center;
	    background-size: 80%;
	}
	.icon-play-circle{
	    font-size: 50px;
	    color: #666;		
	}
	.img-wrap.fr{
		margin-bottom: 5px;
		margin-left: 5px;
	} */
</style>