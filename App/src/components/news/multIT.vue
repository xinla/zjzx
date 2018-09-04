<template>
	<div class="text-wrap bfc-o">
		<router-link :to="{ name:'detail'}">
		<h1>{{article.title}}</h1>
		<div class="img-wrap bfc-o">
			<img v-for="(item,index) in ArticleFile" :src="item.url" :alt="item.filename">
		</div>
		<p class="pub">
			<span>{{CommentNum}}条评论</span>
			<span>{{publishtime}}</span>
		</p>
		</router-link>
	</div>
</template>
<script>
import articleFileService from '@/service/article_fileService'
import articleCommentService from '@/service/article_commentService'
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
		}
	},
	props:{
		article:Object,
	},
	mounted(){
		this.$nextTick(()=>{
				let resArticleFile = articleFileService.getFileByArticle(this.article.id);
				this.ArticleFile = resArticleFile.result.filelist;

				let resArticleCommentNum = articleCommentService.getArticleCommentCount(this.article.id);
				this.CommentNum = resArticleCommentNum.result.count;

				let pubMillis = new Date(this.article.publishtime.replace(/-/g,'/')).getTime();
				let curMillis = new Date().getTime();
				let difference = curMillis - pubMillis;
				if (difference < 4.32e+7) {
					if (difference < 3.6e+6) {
						if (difference < 6000) {
							this.publishtime = "刚刚";
						} else {
							this.publishtime = difference/60000 + "分前";					
						}
					} else {
						this.publishtime = difference/3600000 + "小时前";
					}
				}
			// if(article.type == 1){
			// }
		})
	},
	
	watch:{
		article(){
			this.id = this.article.id;
		}
	}
}
</script>
<style scoped>
	.text-wrap{
		padding: 1em 0 0.5em;
	    border-bottom: 1px solid #eee;
	}
	h1{
		font-weight: normal;
		font-size: 18px
	}
	[data-dpr='2'] h1{
		font-size: 36px;
	}
	[data-dpr='3'] h1{
		font-size: 54px;
	}
	.pub{
		line-height: 2em;
	    color: #999;
	}
	.img-wrap img{
		float: left;
		width: 31%;
		max-width: 200px;
		margin: 0.5em 1% 0;
	}
</style>