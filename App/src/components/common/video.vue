<template>
	<div class="text-wrap bfc-o">
		<div>
			<h1 @click="$Tool.goPage({ name:'detail',query:{id:article.id,} })">{{article.title}}</h1>
			<video-player class="video-player vjs-custom-skin" 
				ref="videoPlayer"
			 	:playsinline="true"
			  	:options="playerOptions"
			  	@play="onPlayerPlay()"
			  	>
			</video-player>	
		</div>
		<p class="pub" @click="$Tool.goPage({ name:'detail',query:{id:article.id,} })">
			<span v-if="ifPublisher">{{publisher}}</span>
			<span>{{CommentNum}}评</span>
			<span>{{publishtime}}</span>
			<small class="delete fr" @click="$emit('delete',[article.id,whi,$event])" v-if="ifDel">X</small>
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
			playerOptions : {
				preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
				language: 'zh-CN',
				aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
				fluid: true, // 当true时，Video.jsplayer将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
				sources: [
					{
						type: "video/mp4",
						src: "" //url地址
					}
				],
				poster: "", //你的封面地址 
				notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
				controlBar: {
					timeDivider: false,
					durationDisplay: false,
					remainingTimeDisplay: false,
					fullscreenToggle: true //全屏按钮
				}
			},
		}
	},
	props:{
		article:Object,
		whi:{
			type:Number,
			default:0,
		},
		//判断是否显示发布人
		ifPublisher:{
			type:Boolean,
			default:true,
		},
		ifDel:false,
	},
	mounted(){
		this.$nextTick(()=>{
			this.init();
		})
	},	
	watch:{
		article(){
			this.init();				
		}
	},
	methods:{
		init(){
			articleFileService.getFileByArticle(this.article.id,data=>{
				if (data && data.status == "success") {
					this.playerOptions.sources[0].src = this.fileRoot + data.result.filelist[0].url;
					this.playerOptions.poster = this.fileRoot + data.result.filelist[0].thumbnail;				
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
		},
		onPlayerPlay(e){
			this.$emit("allPause",this.whi);
		},
		pause(){
			this.$refs.videoPlayer.player.pause();
		}
	}
}
</script>
<style scoped>
	.text-wrap{
	    border-bottom: 1px solid #eee;
	}
	h1{
		margin:.3em;
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
		margin:0 .3em;
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
<style>	
	.vjs-custom-skin > .video-js .vjs-big-play-button{
		width: 1rem;
		height: 1rem !important;
	    font-size: .5rem;
		border-radius: 50%;
		margin: 0 !important;
		transform: translate(-50%,-50%);
		border: 2px solid #fff;
	}
	/*去除音量按钮*/
	.video-js .vjs-volume-panel{
		display: none;
	}
</style>