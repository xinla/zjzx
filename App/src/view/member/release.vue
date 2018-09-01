<template>
	<dl>	
		<!-- <dt>分类</dt> -->
		<dd>
			<select name="sort" id="sort1">
				<option value="">一线</option>
				<option value="">揭秘</option>
				<option value="">悬疑</option>
				<option value="">历史</option>
				<option value="">诈骗</option>
			</select>
			<label for="sort1" class="iconfont sort-lab">&#xe7f6;</label>
		</dd>	
		<!-- <dt>标题</dt> -->
		<dd><input type="text" v-model="record.title" placeholder="标题" maxlength="25" @keyup="check('title')"></dd>
		<!-- <dt>地点</dt> -->
		<fieldset class="imgText" v-if="sort==0">		
			<!-- <dt>内容</dt> -->
			<dd><textarea id="contents" v-model="record.content" @keyup="check('content')" placeholder="内容"></textarea></dd>
			<!-- <dt>上传图片</dt> -->
			<dd>
				<div class="thumb-wrap">
					<img src="http://wallpapers1.hellowallpaper.com/animal_nature--20_24-1920x1200.jpg" alt="">
					<img src="http://wallpapers1.hellowallpaper.com/animal_nature--20_24-1920x1200.jpg" alt="">
					<label for="upimg" class="uplab iconfont">&#xe800;</label>
					<input type="file"  id="upimg" value="" accept="image/*" multiple @change="uploadFile($event)">
				</div>
			</dd>
		</fieldset>
		<fieldset class="video" v-if="sort==1">
			<!-- <dt>上传视频</dt> -->
			<dd>
				<label for="upvideo" class="uplab iconfont">&#xe800;</label>
				<input type="file"  id="upvideo" value="" accept="video/*" >
			</dd>
		</fieldset>
		<dd>
			<i class="iconfont position">&#xe868;</i>
			<router-link :to="{ path:'/memberBase/position',query:{title:'选择位置'} }" class="tag">{{ site }}</router-link>
		</dd>

		<dd colspan="2"><button type="submit" @click="publish">发布</button></dd>
	</dl>
</template>

<script>
import mapUtil from '@/service/util/mapUtil'
import mapService from '@/service/mapService'
import articleService from '@/service/articleService'
export default{
	data(){
		return {
			sort:0,
			site:'不显示',
			userid:'',
			token:'',
			record:{
				title:'',
				content:'',
				author:'',
				type:'',   //1：图文，2:视屏
				publishtime:'',  // 后台设置
				classify:'',
				latitude:'',
				longitude:'',
				publishaddresses:'',
				publishprovince:'',
				publishcity:'',
				publisharea:'',
				publishstreet:'',
				streetnum:'',
				citycode:'',
				poiname:'',
				selectedpublishaddress:'',
				selectedpublishname:'',
			},
			record_file:[
				{
				 articleid:'', //后台文章保存后设置,文章id
				 url:'',//:"附件地址",
				 filename:'',//:"附件名称"	
				 type:'',  // 1：图片，2:视屏,附件类型
				}
			]
		}
	},
	mounted(){
		let sort = this.$route.query.sort;
		this.sort = sort;
		this.site = localStorage.position?localStorage.position:this.site;

		let page_num = 0;
		mapUtil.getPosition((data)=>{
			let aa = data.citycode;
			let longitude = data.longitude;
			let latitude = data.latitude;
			mapService.getPoiList(page_num,latitude,longitude,(data2)=>{
					console.log(data2);
					page_num++;

			})

		})
	},
	methods:{
		uploadFile(event){
			this.record_file = event.target.files;
		},
		publish(){
			this.userid = localStorage.id || 1;
			this.token = localStorage.token || 1;
			console.log(this.userid)
			if (this.sort==0) {
				articleService.publishArticle(this.userid,this.token,this.record,this.record_file,(data)=>{
					console.log(data)
				})
				
			} else if (this.sort==1) {
				articleService.publishArticle(this.userid,this.token,this.record,this.record_file,(data)=>{
					console.log(data)
				})
			} else {

			} 
		},
		check(str){
			let reg = /[^\w\s\u4e00-\u9fa5\(\)\（\）\-]/g;
			if(str=="title"){
				if (reg.test(this.record.title)) {
					this.record.title = this.record.title.replace(reg,'');
				}				
			}else if (str == "content") {
				if (reg.test(this.record.content)) {
					this.record.content = this.record.content.replace(reg,'');
				}
			}
		}
	},
	watch:{

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
	.uplab {
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