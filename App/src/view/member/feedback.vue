<template>
	<div class="feedback-wrap">
		<ul class="feedback-list">
			<li class="feedback-item" v-for="(item ,index) in tabList" @click="handleTab(index)"  :class="{active:index==nowIndex}">{{item}}</li>
		</ul>

		<!-- 我的反馈 -->
		<div class="feedback-tab feedback-fankui" v-show="nowIndex===0">
			<h3 class="feedback-tit">您的反馈内容:</h3>
			<div class="feedback-textarea">
				<textarea 
					v-focus 
					:placeholder="placeholder" 
					maxlength="120"
					v-model="textDesc"
					ref="textFocus"
					@input="handleDesc">
				</textarea>
				<p class="feedback-count" :class="{countClass:countClass}">
					<span>{{this.textDesc.length}}</span>/<span>{{totalCount}}</span>
				</p>
			</div>
			<div class="feedback-upload clearfix">
				<div class="feedback-tip fl" v-show="uploadShow">
					<label for="uploadImg"></label>
					<i class="iconfont icon-camera"></i>
					<span class="upload-desc">上传图片</span>
				</div>
				<div class="feedback-img fl" v-show="imgShow"  v-for="(item, index) in list" @click="show(index)">
					<i class="iconfont icon-remove" @click.stop="handleRemove"></i>
					<img :src="item.src" class="previewer-demo-img">
				</div>
				<div v-transfer-dom>
			      <previewer :list="list" ref="previewer" :options="options"></previewer>
			    </div>
				<input type="file" class="upload-input" id="uploadImg" accept="image/*" @change="handleUploadFile">
			</div>
			<button type="button" class="feedback-btn" @click="handleSubmit">提交反馈</button>
		</div>

		<!-- 常见问题 -->
		<div class="feedback-tab feedback-question" v-show="nowIndex===1">
			<h3 class="question-tit">常见问题</h3>
			<div class="question-body">
				<ul class="question-list">
					<li class="question-item">
						<h4 class="ask">问： 直击真相的特色是什么？</h4>
						<p class="anwser">答：直击真相是一款融合搜索+订阅+推荐的新闻资讯应用。通过独家的“兴趣引擎”技术了解用户的兴趣偏好，同时通过聚合全网内容及服务。为用户提供符合个人兴趣的新闻资讯，帮助用户快速捕捉到最核心、最需要的资讯。</p>
					</li>
					<li class="question-item">
						<h4 class="ask">问： 我很喜欢某方面的内容，想多看一些相关文章应该怎么做？</h4>
						<p class="anwser">答：您可以在顶部搜索框中输入并搜索感兴趣的关键词，在展示的页面中进行订阅操作，之后就可以随时在顶部导航栏中点击并查看相关内容。同时系统会也记住你的兴趣，为你推荐更多相关内容。</p>
					</li>
					<li class="question-item">
						<h4 class="ask">问： 对于不感兴趣或质量较差的文章应该如何反馈？</h4>
						<p class="anwser">答：对不感兴趣的文章，可以点击文章列表中该文右下角的「x」或正文页底栏中的不感兴趣按钮，并选择不感兴趣的具体原因，系统收到反馈后将减少该类内容的推荐。对于质量较差的文章，可以点击正文底部的「不喜欢」，相关同事将会对您的反馈进行处理。</p>
					</li>
					<li class="question-item">
						<h4 class="ask">问： 我是真相号的自媒体作者，有真相号的问题要反馈怎么办？</h4>
						<p class="anwser">答：关于真相号使用相关问题，您可以在在真相号后台“客户服务”一栏查看，或联系客服 QQ：4008191599 反馈相关问题。</p>
					</li>
					<li class="question-item">
						<h4 class="ask">问： 我的直击真相不能刷新文章列表或加载图片怎么办？</h4>
						<p class="anwser">答：您可以清理一下客户端缓存和手机内存，关机重启或者切换网络试试一下。如果无法解决，请截图并在意见反馈中发送给我们，工作人员会尽快与您联系。</p>
					</li>
					<li class="question-item">
						<h4 class="ask">问： 为什么升级／重装之后我以前收藏和订阅不见了？</h4>
						<p class="anwser">答：收藏和订阅的内容是随着您的账号永久保存的，您可以确认一下之前是否曾经登录过。如果没有登录，那您的收藏和订阅在重装后可能无法保存。建议您注册登录后再进行收藏和订阅等操作。</p>
					</li>
					<li class="question-item">
						<h4 class="ask">问： 本地相关新闻在哪里查看，如何切换本地频道城市？</h4>
						<p class="anwser">答：本地新闻在您可以在顶部导航栏中点击您当前所在城市，如果您的顶部导航栏中找不到本地频道，可以搜索指定城市并订阅。同时，进入本地频道后，页面右上角的「切换城市」按钮可以支持城市之间的切换。
问：如何联系你们？</p>
					</li>
				</ul>
			</div>
		</div>
	</div>

</template>

<script>
import feedbackService from '@/service/feedbackService'
import { Previewer, TransferDom } from 'vux'

export default{
	directives: {
		TransferDom,
		focus: {
		// 指令的定义
			inserted: function (el) {
				el.focus()
			}
		}
	},
	components: {
		Previewer
	},
	data(){
		return {
			nowIndex:0,
			tabList:['我的反馈','常见问题'],
			placeholder:'说说您遇到的问题,我们将不断改进...',
			textDesc:'',
			totalCount:120,
			countClass:false,
			uploadImg:'',
			uploadShow:true,
			imgShow:false,
			list:[{src:''}],
			options: {
				getThumbBoundsFn (index) {
					let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
					let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
					let rect = thumbnail.getBoundingClientRect()
					return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
				}
			},
		}
	},
	watch:{

	},
	methods:{
		show(index){
			 this.$refs.previewer.show(index);
		},
		// 选项卡切换
		handleTab(index){
			this.nowIndex=index;
		},
		// 监听文本框中的值
		handleDesc(){
			if(this.textDesc.length > 0) {
				this.countClass = true;
			}else{
				this.countClass = false;
			}
		},
		// 删除图片
		handleRemove(){
			const thiz = this;
			this.$vux.confirm.show({
				content:'确认删除图片?',
				onConfirm () {
					thiz.$vux.loading.show();
					setTimeout(()=>{
						thiz.uploadImg = "";
						thiz.uploadShow = true;
						thiz.imgShow = false;
						if(thiz.uploadImg == "") {
							thiz.$vux.loading.hide();
							thiz.$vux.toast.show({
								text:'删除成功'
							});
						}
					},1000);
				}
			})
		},
		// 提交反馈
		handleSubmit(){
			const thiz = this;
			if(!localStorage.id) {
				this.$vux.alert.show({
					content:'登录后探索真相'
				});
				this.$Tool.goPage({name: '/',replace:true});
				return;
			}
			if(!this.textDesc) {
				this.$vux.alert.show({
					content:'您还未填写任何反馈...',
					onHide () {
						thiz.$refs.textFocus.focus();
					}
				});
				return;
			}
			if(!this.$Tool.checkInput(this.textDesc)) {
				this.textDesc = this.$Tool.replaceNo(this.textDesc);
				this.$vux.alert.show({
					content:'反馈内容还有非法字符,已为您删除,请确认关闭!'
				});
				return;
			}
			let feedbackData = feedbackService.submitFeedback(this.textDesc,this.list[0].src);
			if(feedbackData && feedbackData.status == "success") {
				this.textDesc = "";
				this.list[0].src = "";
				this.$vux.alert.show({
					content: "反馈成功",
					onHide () {
						thiz.$refs.textFocus.focus();
					}
				});
				setTimeout(()=>{
					this.$vux.alert.hide();
				},1000);
				this.uploadShow =true;
				this.imgShow = false;
			}else{
				this.$vux.alert.show({
					content: '反馈失败'
				})
			}

		},
		// 上传图片
		handleUploadFile(e){
			let file = e.target.files[0];
			if(!file) return;
			if(!this.$Tool.checkPic(file.name)) {
				this.$vux.alert.show({
					content:'上传格式错误:仅限jpg、png、jpeg、gif格式'
				})
				return;
			}
			if(!FileReader) {
				this.$vux.alert.show({
				  content:'错误提示：版本太低不支持'
				});
				return;
			}
			
			let fileReader = new FileReader();
			fileReader.readAsDataURL(file);

			fileReader.onload=(e) =>{
				this.$vux.loading.show({
					text: '正在上传...'
				});
				setTimeout(()=>{
					this.list[0].src = e.target.result;
					this.uploadShow = false;
					this.imgShow = true;
						if(e.target.result) {
						this.$vux.loading.hide();
					}
				},1000);	
			};
			fileReader.onerror = () => {
				this.$vux.alert.show({
				  content:'文件读取失败，请重试',
				});
			};
			e.target.value = "";
		},
		beforeRouteEnter (to, from, next) {
		if (!localStorage.id ) { 
            GoTruth.$Tool.loginPrompt(); 
        }else{
          next();
        } 
	}
	}
}

</script>

<style lang="less" scoped>
	.feedback-wrap {
		width: 100%;
		height: calc( 100vh - @topHeigth);
		background-color: #fff;
		.feedback-list{
			width: 100%;
			border-bottom: .02rem solid @borderColor;
			position: relative;
			top: 0;
			left: 0;
			z-index: 999;
			background-color: #fff;
			.feedback-item{
				display: inline-block;
				width: 50%;
				height: .78rem;
				line-height: .78rem;
				text-align: center;
				font-size: .3rem;
				border-right: .02rem solid @borderColor;
				&:last-child{
					border-right: none;
				}
			}
			.active{
				color: #129aee;
			}
		}
		.feedback-tab{
			height: calc(100vh - .78rem);
			overflow: hidden;
			overflow-y: auto;
			padding: .2rem .4rem;
			background-color: #fff;
			.feedback-tit{
				position: relative;
				font-weight: normal;
				letter-spacing: .02rem;
				line-height: .5rem;
				padding-left: .2rem;
				&::before{
					content:"";
					display: block;
					position: absolute;
					left: 0;
					top: .1rem;
					height: .3rem;
					width: .08rem;
					border-radius: .2rem;
					background-color: #129aee;
				}
			}
			.feedback-textarea{
				width: 100%;
				height: 3rem;
				position: relative;
				border-radius: .2rem;
				textarea{
					display: block;
					width: 100%;
					height: 100%;
					padding: .2rem;
					border: .04rem solid @borderColor;
					border-radius: .2rem;
					overflow-y: auto;
					resize: none;
				}
				.feedback-count{
					position: absolute;
					bottom: .2rem;
					right: .2rem;
					color: #999;
				}
				.countClass{color: #129aee;}
			}
			.feedback-upload{
				padding: .2rem 0;
				.feedback-tip{
					display: inline-block;
					padding: .2rem;
					text-align: center;
					border-radius: .2rem;
					color: #fff;
					background-color: #bfbfbf;
					position: relative;
					label{
						width: 100%;
						height: 100%;
						left: 0;
						top: 0;
						display: block;
						position: absolute;
					}
					.iconfont{
						font-size: .6rem;
					}
					.upload-desc{
						display: block;
						line-height: .45rem;
					}
				}
				.feedback-img{
					display: inline-block;
					width: 1.52rem;
					height: 1.44rem;
					border-radius: .2rem;
					position: relative;
					img{
						display: block;
						width: 100%;
						height: 100%;
						border-radius: .2rem;
						filter: brightness(0.7);
						object-fit: cover;
					}
					.iconfont{
						width: .3rem;
						height: .3rem;
						text-align: center;
						line-height: .3rem;
						background-color: #fff;
						color: #000;
						border-radius: 20%;
						font-size: .2rem;
						position: absolute;
						top: 0;
						border-radius: 0 .2rem 0 .2rem;
						right: 0;
						z-index: 1;
					}
				}
				.upload-input {
					display: none;
				}
			}
			.feedback-btn{
				padding: .15rem .3rem;
				position: absolute;
				right: .4rem;
				letter-spacing: .02rem;
				border-radius: .15rem;
				background-color: @mainColor;
				color: #fff;
			}
		}
		.feedback-fankui{
			max-height: calc( 100vh - 1.65rem);
			// padding-top: 1rem;
		}
		.feedback-question{
			// margin-top: 1.65rem;
			padding-top: .4rem;
			padding-bottom: .4rem;
			background-color: #f7f7f7;
			min-height: calc( 100vh - 1.65rem);
			.question-tit {
				text-align: center;
				letter-spacing: .02rem;
				font-size: .3rem;
			}
			.question-body {
				margin-top: .2rem;
				color: #666;
				.question-item {
					margin-bottom: .2rem;
					.ask{
						font-size: .28rem;
						line-height: .4rem;
						color: #333;
					}
					.anwser {
						font-size: .28rem;
						line-height: .4rem;

					}
				}
			}
		}
	}

</style>