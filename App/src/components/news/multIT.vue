<template>
	<div class="text-wrap bfc-o">
		<div @click="$Tool.goPage({ name:'detail',query:{id,}})">
		<h1>{{article.title}}</h1>
		<div class="img-wrap bfc-o">
			<img v-for="(item,index) in ArticleFile" :src="fileRoot+item.url" :alt="item.filename">
			<img src="#" alt="图片获取失败" v-if="failImg">
		</div>
		<p class="pub">
			<span>{{CommentNum}}条评论</span>
			<span>{{publishtime}}</span>
		</p>
		</div>
	</div>
</template>
<script>
import config from '@/lib/config/config'
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
			fileRoot:config.fileRoot+'/',
			failImg:false,
		}
	},
	props:{
		article:Object,
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

				let pubMillis = new Date(this.article.publishtime.replace(/-/g,'/')).getTime();
				let curMillis = new Date().getTime();
				let difference = curMillis - pubMillis;
				if (difference < 4.32e+7) { //12小时内
					if (difference < 3.6e+6) { //60分钟内
						if (difference < 60000) { //60秒内
							this.publishtime = "刚刚";
						} else {
							this.publishtime = Math.floor(difference/60000) + "分钟前";					
						}
					} else {
						this.publishtime = Math.floor(difference/3600000) + "小时前";
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
		font-size: 16px
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
		width: 2.2rem;
		height: 2.2rem;
		max-width: 200px;
		margin: 0.5em 1% 0;
	}
</style>