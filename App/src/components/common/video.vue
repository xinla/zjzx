<template>
	<div class="text-wrap bfc-o">
		<div @click="$Tool.goPage({ name:'detail',query:{id,} })">
			<h1>{{article.title}}</h1>
			<!-- video -->
			<div class="big bfc-o" v-if="ArticleFile.length">
				<i class="iconfont icon-play-circle cc"></i>
				<img class="big" :src="ArticleFile[0].thumbnail?(fileRoot + ArticleFile[0].thumbnail):imgurl" alt="">
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
		}
	},
	props:{
		article:Object,
		whi:Number,
		ifPublisher:{
			type:Boolean,
			default:true,
		},
		ifDel:false,
	},
	mounted(){
		this.$nextTick(()=>{
			this.$options.methods.getArticleInfo.call(this);
		})
	},	
	watch:{
		article(){
			this.$options.methods.getArticleInfo.call(this);				
		}
	},
	methods:{
		getArticleInfo(){
			articleFileService.getFileByArticle(this.article.id,data=>{
				if (data&&data.status == "success") {
					this.ArticleFile = data.result.filelist;				
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
	    border-bottom: 1px solid #eee;
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
		width:50px;
		height:50px;
	    font-size: 50px;
	    color: #666;		
	}
</style>