<template>
	<div class="release">
		<!-- 选择类型 -->
		<div class="release-type clearfix" v-model="record.classify">
			<div class="release-select clearfix" @click="handleType">
				<span class="release-keys fl" :value="defaultVal">{{defaultType}}</span>
				<i class="iconfont icon-down fr"></i>	
			</div>
			 <transition  enter-active-class="animated fadeIn" leave-active-class=" animated fadeOut">
				<div class="release-mask" v-show="optionShow" @click="handleCloseMask"></div>
			</transition>
			 <transition  enter-active-class="animated fadeInLeft" leave-active-class=" animated fadeOutLeft">
				<div class="release-option" v-show="optionShow">
					<ul class="release-list">
						<li class="release-item" :value="item.classifycode" v-for="item in classfyList" @click="handleItem(item)">
							{{ item.classifyname }}
						</li>
					</ul>
				</div>
			</transition>
		</div>	
		<!-- 标题 -->
		<div class="release-title">
			<input type="text" v-model="record.title" placeholder="请输入标题" v-focus>
		</div>
		<!-- 内容 -->
		<div class="release-content" v-if="record.type==1 || record.type == 3">
			<div class="content">
				<textarea placeholder="请输入内容" v-model="record.content"></textarea>
			</div>
			<!-- 上传图片 -->
			<div class="release-upload-img clearfix">
				<div class="release-img fl" v-for="(item,index) in record_file">
					<i class="iconfont icon-remove" @click.stop="handleRemoveImg(item)"></i>
					<img :src="fileRoot + item.url">
				</div>
				<div class="release-upload fl">
					<label for="upImg"></label>
					<i class="iconfont icon-add"></i>
					<input type="file" id="upImg" accept="image/*" multiple @change="uploadFile" style="display: none;">
				</div>
				
			</div>
		</div>
		
		<!-- 上传视频 -->
		<div class="release-upload-video clearfix" v-if="record.type==2">
			<div class="release-video fl" v-for="(item,index) in record_file">
				<i class="iconfont icon-remove" @click.stop="handleRemoveVideo(item)"></i>
				<img :src="fileRoot + item.thumbnail" >
			</div>
			<div class="release-upload fl" v-show="addShow">
				<label for="upvideo"></label>
				<i class="iconfont icon-add"></i>
				<input type="file"  id="upvideo" accept="video/*" @change="uploadFile" style="display: none;">
				</div>
		</div>

		<!-- 选择位置 -->
		<div class="release-seat">
			<i class="iconfont icon-weizhi"></i>
			<router-link :to="{ name:'position',query:{title:'选择位置'} }" class="tag">{{ record.selectedpublishname }}</router-link>
		</div>

		<!-- 发布按钮 -->
		<div class="release-btn clearfix">
			<button type="button" class="btn fr" @click="publish">发布</button>
		</div>

	</div>
</template>

<script>
import config from '@/lib/config/config'
import mapUtil from '@/service/util/mapUtil'
import mapService from '@/service/mapService'
import fileService from '@/service/fileService'
import articleService from '@/service/articleService'
import articleClassifyService from '@/service/article_classifyService'
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
	components:{
		Previewer
	},
	data(){
		return {
			addShow:true,
			optionShow:false,
			defaultVal:null,
			defaultType:'请选择分类',
			fileRoot:config.fileRoot +'/',
	        classfyList:[],
	        push:[],
			position:{},
			record:{
				title:'',
				content:'',
				author:{
					type:Number,
					default:1,
				},
				type:{
					type:Number,
					default:1,
				},   //1：图文，2:视频
				publishtime:'',  // 后台设置
				classify:1,
				selectedpublishaddress:'',
				selectedpublishname:'不显示',
			},
			record_file:[],
		}
	},
	activated(){
		this.record.type = this.$route.query.sort;	
		this.record.selectedpublishname = localStorage.position || "不显示";
		this.record.selectedpublishaddress = localStorage.selectedpublishaddress || 0;

		let resArcClass = articleClassifyService.getArticleClassifyList();
		this.classfyList = resArcClass.result.classfyList;

		let page_num = 0;
		mapUtil.getPosition((data)=>{
			let aa = data.citycode;
			let longitude = data.longitude;
			let latitude = data.latitude;
			this.position = data;
			mapService.getPoiList(page_num,latitude,longitude,(data2)=>{
					page_num++;
			})

		})
	},
	methods:{
		show(index){
			 this.$refs.previewer.show(index);
			 console.log(index);
		},
		handleType(){
			this.optionShow = !this.optionShow;
		},
		handleCloseMask(){
			this.optionShow = false;
		},
		handleItem(item){
			this.defaultType = item.classifyname;
			 this.record.classify = item.classifycode;
			this.optionShow = false;
		},
		handleRemoveImg(item){
			const thiz = this;
			this.$vux.confirm.show({
				content:'确认删除图片?',
				onConfirm () {
					thiz.$vux.loading.show();
					setTimeout(()=>{
						thiz.record_file.splice(item,1);
						thiz.$vux.loading.hide();
						thiz.$vux.toast.show({
							text:'删除成功'
						})
					},1000);

				}
			})
			// 
		},

		handleRemoveVideo(item){
			const thiz = this;
			this.$vux.confirm.show({
				content:'确认删除视频?',
				onConfirm () {
					thiz.$vux.loading.show();
					setTimeout(()=>{
						thiz.record_file.splice(item,1);
						thiz.$vux.loading.hide();
						thiz.$vux.toast.show({
							text:'删除成功'
						})
						thiz.addShow = true;
					},1000);
				}
			})
		},
		uploadFile(e){
			let file = e.target.files[0];           
		    if (this.record.type==1 && !this.$Tool.checkPic(file.name)) {
		    	this.$vux.alert.show({
				  content:'格式错误',
				})
			    return;
			 }
			 if(this.record.type==2 && !this.$Tool.checkVideo(file.name)) {
		    	this.$vux.alert.show({
				  content:'格式错误',
				})
			    return;
			 }
			this.$loading.open(2);
		    let param = new FormData(); //创建form对象        	
		    param.append('file',file,file.name);//通过append向form对象添加数据
		    if(this.record.type==1){
			    fileService.uploadPic(param,(data)=>{
			    	let obj = {};
		          	obj.url = data.result.url;
		          	obj.filename = data.result.filename;
		          	obj.type =1;
		          	this.record_file.push(obj);
		          	this.$loading.close();
				})
		    }else if(this.record.type==2){
		    	fileService.uploadVideo(param,(data)=>{
		    		let obj = data.result;
		          	// obj.thumbnail = data.result.thumbnail;
		          	// obj.filename = data.result.filename;
		          	obj.type =2;
		          	this.addShow = false;
		          	this.record_file.push(obj);
		          	this.$loading.close();
		          	// console.log(obj)
		    	})
		    }else{
		    	alert("错误");
		    }

		},
		publish(){

			if(!localStorage.id){
				this.$vux.alert.show({
				  content:'你还未登录呢，亲先登录再发布哦',
				})
				return;
			}
			if (!this.record.title) {
				this.$vux.alert.show({
				  content:'标题不能为空',
				})
				return;
			}

			if (!this.$Tool.checkInput(this.record.title) || !this.$Tool.checkInput(this.record.content)) {
					this.record.title = this.$Tool.replaceNo(this.record.title);
					this.record.content = this.$Tool.replaceNo(this.record.content);
					this.$vux.alert.show({
					  content:'内容含有非法字符，已为您删除，请确认',
					})
					return;
				}
			this.record.author = Number(localStorage.id?localStorage.id:0);
			Object.assign(this.record,this.position);
			let res;
			if (this.record.type == 1) {
				res = articleService.publishArticle(this.record,this.record_file);	
			} else if (this.record.type == 2) {
				// debugger;
				res = articleService.publishArticle(this.record,this.record_file);
			} else {

			}
			// debugger;
			if(res.status=="success") {
				this.$vux.alert.show({
				  content:'发布成功',
				})
				localStorage.selectedpublishaddress = null;
				localStorage.position = null;
				this.record_file=[];
				this.record.title = "";
				this.record.content = "";
				this.defaultVal = null;
				this.defaultType = '请选择分类';
				setTimeout(()=>{
					this.$vux.alert.hide();
				},1000)
			}else{
				// alert("错误提示：" +res.result.tip + "错误代码：" + res.result.errorcode)
				this.$vux.alert.show({
				  content:'发布失败',
				})
			}
		},
	},
	watch:{
		"$route"(){
			this.record.type = this.$route.query.sort;	
		}
	},
	beforeRouteEnter (to, from, next) {
		if (!localStorage.id) { 
            GoTruth.$Tool.loginPrompt(); 
        }else{
          next();
        } 
	}
}
</script>

<style lang="less" scoped>
	.release{
		width: 100%;
		height: calc(100vh - .87rem);
		overflow: hidden;
		overflow-y: auto;
		padding: .3rem;
		background-color: #fff;
		.release-type{
			position: relative;
			margin-bottom: .4rem;
			.release-select{
				position: absolute;
				z-index: 10;
				width: 55%;
				height: .8rem;
				line-height: .8rem;
				padding: 0 .3rem;
				border-radius: .2rem;
				color: #666;
				background-color: #fff;
				border: .03rem solid @borderColor;
				.release-keys{
					margin-right: .2rem;
				}
			}
			.release-mask{
				width: 100vh;
				height: 100vh;
				position: absolute;
				top: -.3rem;
				left: -.3rem;
				z-index: 9;
				background-color: rgba(0,0,0,0.5);

			}
			.release-option{
				position: absolute;
				top: .88rem;
				left: 0;
				z-index: 10;
				background-color: #fff;
			    border: 0 solid rgba(0, 0, 0, 0.3);
			    border-radius: .2rem;
			    box-shadow: 0 .02rem .06rem 0 rgba(0, 0, 0, 0.2);
				width: 60%;
				padding:  0 .3rem;
				.release-item{
					height: .65rem;
					line-height: .65rem;
					border-bottom: .02rem solid @borderColor;
					&:last-child{
						border-bottom: none;
					}
				}
			}
		}
		.release-title{
			width: 100%;
			height: .8rem;	
			margin-top: 1.2rem;
			margin-bottom: .4rem;
			input{
				width: 100%;
				height: .8rem;
				line-height: .8rem\9;
				padding: 0 .3rem;
				border-radius: .2rem;
				border: .03rem solid @borderColor;
			}
		}
		.release-content{
			
			.content{
				width: 100%;
				height: 3rem;
				border-radius: .2rem;
				border: .03rem solid @borderColor;
				textarea{
					display: block;
					width: 100%;
					height: 100%;
					padding: .2rem;
					resize: none;
				}
			}
			.release-upload-img{
				padding: .2rem 0;
				.release-img{
					position: relative;
					float: left;
					margin-right: .04rem;
					margin-bottom: .04rem;
					display: inline-block;
					width: 1.86rem;
					height: 1.86rem;
					img{
						display: block;
						width: 100%;
						height: 100%;
						filter: brightness(0.50);
						object-fit: cover;
					}
					.iconfont{
						position: absolute;
						z-index: 6;
						right: .09rem;
						top: .09rem;
						color: #fff;
					}
				}
				.release-upload{
					position: relative;
					width: 1.86rem;
					height: 1.86rem;
					text-align: center;
					float: left;
					background-color: #f4f5f6;
					label{
						position:absolute;
						left: 0;
						top: 0;
						width: 100%;
						height: 100%;
						
						line-height: 1.86rem;
					}
					.iconfont{
						display: inline-block;
						width: 1.04rem;
						height: 1.04rem;
						font-size: 1rem;
						margin-top: .41rem;
						// font-weight: 700;
						color: #dcdcdc;
					}
				}
			}
			
		}
		.release-upload-video{
			padding: .2rem 0;
			.release-video{
				position: relative;
				width: 3.5rem;
				height: 1.86rem;
				margin-right: .1rem;
				img{
					display: block;
					width: 100%;
					height: 100%;
					border-radius: .05rem;
					border: .02rem solid #ccc;
					object-fit: cover;
					filter: brightness(0.50);
					box-sizing: border-box;
				}
				.iconfont{
					position: absolute;
					z-index: 6;
					right: .09rem;
					top: .09rem;
					color: #fff;
				}
			}
		}
		.release-upload{
			position: relative;
			width: 1.86rem;
			height: 1.86rem;
			text-align: center;
			float: left;
			background-color: #f4f5f6;
			label{
				position:absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				
				line-height: 1.86rem;
			}
			.iconfont{
				display: inline-block;
				width: 1.04rem;
				height: 1.04rem;
				font-size: 1rem;
				margin-top: .41rem;
				// font-weight: 700;
				color: #dcdcdc;
			}
		}
		.release-seat{
			display: inline-block;
			padding: .13rem .15rem;
			border-radius: .26rem;
			border: .02rem solid @borderColor;
			font-size: .24rem;
			color: #979797;
			.iconfont{
				vertical-align: middle;
			}
		}
		.release-btn{
			margin-top: .2rem;
			.btn{
				margin-right: 1rem;
				width: 1.4rem;
				height: .7rem;
				line-height: .7rem;
				letter-spacing: .02rem;
				border-radius: .08rem;
				text-align: center;
				background-color: @mainColor;
				color: #fff;

			}
		}
	}
</style>