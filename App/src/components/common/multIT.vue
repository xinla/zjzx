<template>
	<div class="bfc-o"  @click="$Tool.goPage({ name:'detail',query:{id:article.id,detailType,}})">
		<div class="article-wrap">
			<div class="article-item clearfix">
				

				<!-- 浮动图片 -->
				<!-- <div class="float-img" v-if="imgList.length < 3 "> -->
					<img class="float-img"v-for="(item,index) in imgList" v-if="[index == 0, imgList.length < 3]" :src="item?item:imgurl" >
					<img class="float-img" v-if="1 == article.type && ArticleFile.length && ArticleFile.length < 3" :src="ArticleFile[0].url?(fileRoot+ArticleFile[0].url):imgurl">
				<!-- </div> -->
				<!-- 公共标题 -->
				<h2 class="article-title">{{article.title}}</h2>

				<!-- 上下图文大图 -->
				<div class="normal-img clearfix" v-if="imgList.length > 3">
					<img class="float-img" v-for="(item,index) in imgList" :src="item?item:imgurl">
				</div>
				<div class="normal-img clearfix" v-else-if="1 == article.type && ArticleFile.length > 3">
					<img :src="item.url?(fileRoot+item.url):imgurl" v-for="(item, index) in ArticleFile" v-if="index < 3">
				</div>
				
				<!-- 视频 -->
				<div class="article-video" v-else-if="2 == article.type && ArticleFile.length">
					<div class="article-play">
						<i class="iconfont icon-bofang1"></i>
					</div>
					<img :src="ArticleFile[0].thumbnail?(fileRoot + ArticleFile[0].thumbnail):imgurl">
				</div>
				<!-- 文章评论 -->
				<div class="article-footer clearfix">
					<div class="fl">
						<span v-if="ifPublisher">{{publisher}}</span>
						<span>{{CommentNum}}评论</span>
						<span>{{publishtime}}</span>
					</div>
					<div class="fr article-remove" @click="$emit('delete',[article.id,whi,$event]);" v-if="ifDel">
						<i class="iconfont icon-remove"></i>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import config from '@/lib/config/config'
import articleFileService from '@/service/article_fileService'
import articleCommentService from '@/service/article_commentService'
import userService from '@/service/userService'
import articleService from '@/service/articleService'

export default {
	data(){
		return {
			imgurl:require('@/assets/images/userPhoto.jpg'),
			ArticleFile:[
				// {
				// 	thumbnail:"",
				// }
			],
			CommentNum:0,
			publishtime:"",
			fileRoot:config.fileRoot+'/',
			publisher:"",
			imgList:[],
		}
	},
	props:{
		article:{
			type:Object,
			default:{}
		},
		whi:{
			type:Number,
		},
		//判断是否为作者详情视图(真:为作者视图；假（空）:为浏览视图)
		detailType:{
			type:String,
			default:"",
		},
		//判断是否显示发布人
		ifPublisher:{
			type:Boolean,
			default:true,
		},
		ifDel:{
			type:Boolean,
			default:false,
		},
	},
	mounted(){
		this.$nextTick(()=>{
			this.init();
		})
	},	
	watch:{
		//使用了缓存，父组件传值发生改变，子组件需要监测对应改变的对象值，不然子组件重新渲染还是使用缓存中的值
		article(){
			this.init();
		},
	},
	methods:{
		init(){
			articleFileService.getFileByArticle(this.article.id,data=>{
				if (data && data.status == "success") {
					this.ArticleFile = data.result.filelist;				
				}				
			});
			if (this.ifPublisher) {
				if (this.article.author) {
					try{
						userService.getUserById(this.article.author,data=>{
							if (data && data.status == "success") {
								this.publisher = data.result.user.username;
							}
						});										
					}catch(err){
						
					}
				}				
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
			if (!this.article.type) {
				this.imgList = this.$Tool.extractImg(this.article.content,3);				
			}
		}
	}
}
</script>
<style lang="less" scoped>
	.article-wrap {
		padding: 0 .3rem;
		.article-item{
			border-bottom: .02rem solid @borderColor;
			padding-top: .3rem;
			padding-bottom: .1rem;
			.article-title{
				// height: 1.3rem;
				max-height: 1.3rem;
				overflow: hidden;
				text-overflow:ellipsis;
				display:-webkit-box; 
				-webkit-box-orient:vertical;
				-webkit-line-clamp:3; 
				font-size: .28rem;
				line-height: .45rem;
				font-weight: 500;
			}
			.float-img{
				display: block;
				width: 1.86rem;
				height: 1.22rem;
				margin-left: .3rem;
				object-fit: cover;
				padding: .02rem;
				border: .02rem solid @borderColor;
				float: right;
			}
			.normal-img{
				width: 100%;
				height: 3.26rem;
				overflow: hidden;
				img{
					display: block;
					width: 100%;
					height: 100%;
					padding: .02rem;
					border: .02rem solid @borderColor;
					object-fit: cover;
				}
			}
			.article-video{
				position: relative;
				width: 100%;
				height: 3.24rem;
				.article-play{
					position: absolute;
					top: 50%;
					left: 50%;
					margin-left: -.44rem;
					margin-top: -.44rem;
					width: .88rem;
					height: .88rem;
					line-height: .88rem;
					border-radius: 50%;
					text-align: center;
					background-color: rgba(0,0,0,.4);
					.iconfont{
						padding-top: .08rem;
						padding-left: .08rem;
						font-size: .35rem;
						color: #f1f1f1;
					}
				}
				img{
					display: block;
					width: 100%;
					height: 100%;
					padding: .02rem;
					border: .02rem solid @borderColor;
					object-fit: cover;
				}
			}
			.article-footer{
				height: .6rem;
				line-height: .6rem;
				font-size: .24rem;
				color: #a3a3a3;
				span{
					margin-right: .1rem;
				}
				.article-remove{
					width: .45rem;
					height: .35rem;
					line-height: .35rem;
					margin-top: .125rem;
					text-align: center;
					border: .02rem solid @borderColor;
					border-radius: .08rem;
					.iconfont{
						font-size: .24rem;
					}
				}
			}
		}
	}
</style>