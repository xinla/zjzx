<template>
	<div class="text-wrap bfc-o">
		<div @click="$Tool.goPage({ name:'detail',query:{id,}})">
			<h1>{{article.title}}</h1>
			<div class="img-wrap bfc-o">
				<img v-for="(item,index) in ArticleFile" v-if="index<=3" :src="fileRoot+item.url" :alt="item.filename">
				<img src="#" alt="图片获取失败" v-if="failImg">
			</div>
		</div>
		<p class="pub">
			<span>{{CommentNum}}条评论</span>
			<span>{{publishtime}}</span>
			<small class="delete fr" @click="$emit('delete',[id,index])">X</small>
		</p>
	</div>
</template>
<script>
import config from '@/lib/config/config'
import articleFileService from '@/service/article_fileService'
import articleCommentService from '@/service/article_commentService'
import articleService from '@/service/articleService'
export default {
	data(){
		return {
			id:this.article.id,
			ArticleFile:[],
			CommentNum:{
				type:Number,
				default:0,
			},
			publishtime:this.article.publishtime,
			fileRoot:config.fileRoot+'/',
			failImg:false,
		}
	},
	props:{
		article:Object,
		index:Number,
	},
	mounted(){

		this.$nextTick(()=>{

				let resArticleFile = articleFileService.getFileByArticle(this.article.id);
				if (resArticleFile&&resArticleFile.status == "success") {
					this.ArticleFile = resArticleFile.result.filelist;				
				} else {
					this.failImg = true;
				}
				let resArticleCommentNum = articleCommentService.getArticleCommentCount(this.article.id);
				if (resArticleCommentNum&&resArticleCommentNum.status == "success") {
					this.CommentNum = resArticleCommentNum.result.count;		
				}else{
					this.CommentNum = 0;
				}

				this.publishtime = this.$Tool.publishTimeFormat(this.article.publishtime);
			// if(article.type == 1){
			// }
		})
	},	
	watch:{
		article(){
			let resArticleFile = articleFileService.getFileByArticle(this.article.id);
				if (resArticleFile&&resArticleFile.status == "success") {
					this.ArticleFile = resArticleFile.result.filelist;				
				} else {
					this.failImg = true;
				}
				let resArticleCommentNum = articleCommentService.getArticleCommentCount(this.article.id);
				if (resArticleCommentNum&&resArticleCommentNum.status == "success") {
					this.CommentNum = resArticleCommentNum.result.count;		
				}else{
					this.CommentNum = 0;
				}

				this.publishtime = this.$Tool.publishTimeFormat(this.article.publishtime);
		}
	},
	methods:{

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
        font-size: 12px;
	    background: #eee;
	    width: 14px;
	    line-height: 14px;
	    text-align: center;
	    border-radius: 20px;
	    vertical-align: middle;
	    top: 10px;
	}
</style>