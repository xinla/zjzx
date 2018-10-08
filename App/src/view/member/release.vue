<template>
	<dl>	
		<!-- <dt>分类</dt> -->
		<dd>
			<select id="sort1" v-model="record.classify">
				<option :value="item.classifycode" v-for="item in classfyList">{{ item.classifyname }}</option>
			</select>
			<label for="sort1" class="iconfont sort-lab">&#xe7f6;</label>
		</dd>	
		<!-- <dt>标题</dt> -->
		<dd><input type="text" v-model="record.title" placeholder="标题" maxlength="25"></dd>
		<!-- <dt>地点</dt> -->
		<fieldset class="imgText" v-if="record.type==1">		
			<!-- <dt>内容</dt> -->
			<dd><textarea id="contents" v-model="record.content" placeholder="内容"></textarea></dd>
			<!-- <dt>上传图片</dt> -->
			<dd>
				<div class="thumb-wrap">
					<img v-for="(item,index) in record_file" :src="fileRoot+item.url" alt="">
					<label for="upimg" class="icon-plus iconfont"></label>
					<input type="file" id="upimg" accept="image/*" multiple @change="uploadFile">
				</div>
			</dd>
		</fieldset>
		<fieldset class="video" v-if="record.type==2">
			<!-- 上传视频 -->
			<dd class="thumb-wrap">
				<img v-for="(item,index) in record_file" :src="fileRoot + item.thumbnail" alt="">
				<label for="upvideo" class="icon-plus iconfont"></label>
				<input type="file"  id="upvideo" accept="video/*" @change="uploadFile">
			</dd>
		</fieldset>
		<dd>
			<i class="iconfont position">&#xe868;</i>
			<router-link :to="{ path:'/memberBase/position',query:{title:'选择位置'} }" class="tag">{{ record.selectedpublishname }}</router-link>
		</dd>

		<dd colspan="2"><button type="button" @click="publish">发布</button></dd>
	</dl>
</template>

<script>
import config from '@/lib/config/config'
import mapUtil from '@/service/util/mapUtil'
import mapService from '@/service/mapService'
import fileService from '@/service/fileService'
import articleService from '@/service/articleService'
import articleClassifyService from '@/service/article_classifyService'

export default{
	data(){
		return {
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
				},   //1：图文，2:视屏
				publishtime:'',  // 后台设置
				classify:1,
				selectedpublishaddress:'',
				selectedpublishname:'不显示',
			},
			record_file:[],
		}
	},
	mounted(){
		
		this.record.type = this.$route.query.sort;	
		this.record.selectedpublishname = localStorage.position?localStorage.position:0;
		this.record.selectedpublishaddress = localStorage.selectedpublishaddress?localStorage.selectedpublishaddress:0;

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
		          	this.record_file.push(obj);
		          	this.$loading.close();
		          	console.log(obj)
		    	})
		    }else{
		    	alert("错误");
		    }

		},
		publish(){
			if(!localStorage.id){
				this.$vux.alert.show({
				  content:'你还未登录，亲先登录再发布',
				})
				location.href="/member";
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
				this.record_file=[];
				this.record.title = "";
				this.record.content = "";
				this.$vux.alert.show({
				  content:'发布成功',
				})
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
	}
}
</script>

<style rel="stylesheet" scoped>
	dl {
		background: #fff;
	    line-height: 40px;
		padding: 0 10px 50px;
	    margin-top: 10px;
	}
	dt{
		color: #666;
	}
	input,select,textarea{
		width: 100%;
	    line-height: 30px;
   	    border: 1px solid #ddd;
	    border-radius: 5px;
	    text-indent: 6px;
	}
	textarea{
	    height: 150px;
	}
	select{
		width: 80px;
		position: relative;
		z-index: 9;
		background: transparent;
	}
	.sort-lab{
	    position: relative;
	    right: 25px;
	    vertical-align: middle;
	    z-index: 8;
	}
	.icon-plus {
	    width: 65px;
	    height: 65px;
	    display: inline-block;
	    background: #eee;
	    border: 1px solid #ddd;
	    line-height: 65px;
	    text-align: center;
	    font-size: 30px;
	    margin: 10px;
	    color: #666;
	    vertical-align: middle;
	}
	input[type="file"] {
	    height: 0;
	    width: 0;
	}
	.thumb-wrap img {
	    width: 100px;
	    height: 100px;
	    margin-right: 5px;
	}
	button {
	    display: block;
	    width: 70px;
	    line-height: 30px;
	    margin: 30px auto;
	    border-radius: 8px;
        background: #ddd;
	}
	.tag{
		background: #ddd;
		line-height: 20px;
		padding:3px 5px;
		border-radius: 6px;
		font-size: 12px;
	}
	.iconfont.position{
		color: #888;
	}
	.thumb-wrap{
		margin: 10px 0;
	}
</style>