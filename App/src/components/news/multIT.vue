<template>
	<div class="text-wrap bfc-o">
		<div @click="$Tool.goPage({ name:'detail',query:{id,}})">
			<h1>{{article.title}}</h1>
			<!-- picture -->
			<div class="img-wrap bfc-o" v-if="1 == article.type">
				<template>
					<img v-for="(item,index) in ArticleFile" v-if="index<3" :src="fileRoot+item.url" :alt="item.filename">		
				</template>
				<!-- <img src="#" alt="图片获取失败" v-if="failImg"> -->
			</div>
			<!-- video -->
			<div class="big" v-if="2 == article.type">
				<img class="big" :src="fileRoot + ArticleFile[0].thumbnail" alt="">
			</div>
		</div>
		<p class="pub">
			<span v-if="ifPublisher">{{publisher}}</span>
			<span>{{CommentNum}}条评论</span>
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
export default {
	data(){
		return {
			id:this.article.id,
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
			failImg:false,
		}
	},
	props:{
		article:Object,
		whi:Number,
		ifPublisher:true,
		ifDel:false,
	},
	mounted(){

		this.$nextTick(()=>{

				// let resArticleFile = articleFileService.getFileByArticle(this.article.id);
				// if (resArticleFile&&resArticleFile.status == "success") {
				// 	this.ArticleFile = resArticleFile.result.filelist;				
				// } else {
				// 	this.failImg = true;
				// }
				// // 获取文章评论数量
				// articleCommentService.getArticleCommentCount(this.article.id,data=>{
				// 	if (data.status == "success") {
				// 		this.CommentNum = data.result.count;		
				// 	}else{
				// 		this.CommentNum = 0;
				// 	}					
				// });

				// this.publishtime = this.$Tool.publishTimeFormat(this.article.publishtime);
			// if(article.type == 1){
			// }
			this.$options.methods.getArticleInfo.call(this);
		})
	},	
	watch:{
		article(){
			// let resArticleFile = articleFileService.getFileByArticle(this.article.id);
			// 	if (resArticleFile&&resArticleFile.status == "success") {
			// 		this.ArticleFile = resArticleFile.result.filelist;				
			// 	} else {
			// 		this.failImg = true;
			// 	}

			// 	// 获取文章评论数量
			// 	articleCommentService.getArticleCommentCount(this.article,data=>{
			// 		if (data && data.status == "success") {
			// 			this.CommentNum = data.result.count;		
			// 		}else{
			// 			this.CommentNum = 0;
			// 		}					
			// 	});

			// 	this.publishtime = this.$Tool.publishTimeFormat(this.article.publishtime);
			this.$options.methods.getArticleInfo.call(this);
				
		}
	},
	methods:{
		getArticleInfo(){
			articleFileService.getFileByArticle(this.article.id,data=>{
				if (data&&data.status == "success") {
					this.ArticleFile = data.result.filelist;				
				} else {
					this.failImg = true;
				}				
			});
			userService.getUserById(this.article.author,data=>{
				if (data && data.status == "success") {
					this.publisher = data.result.user.username;
				}
			});
			// 获取文章评论数量
			articleCommentService.getArticleCommentCount(this.article.id,data=>{
				if (data.status == "success") {
					this.CommentNum = data.result.count;		
				}else{
					this.CommentNum = 0;
				}					
			});
			this.publishtime = this.$Tool.publishTimeFormat(this.article.publishtime);		
		}
	}
}
</script>
<style scoped>
	.text-wrap{
		padding: 1em 0 0em;
	    border-bottom: 1px solid #eee;
	}
	h1{
		font-weight: normal;
		font-size: 16px
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
		margin: 0.5em 1% 0;
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
</style>