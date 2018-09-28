<template>
	<div>
		<div class="tabbar bfc-o">
			<div :class="['tablist', {'current-tab':showF}]" @click="showFeedback()">意见反馈</div>
			<div :class="['tablist', {'current-tab':showQ}]" @click="showQuestion()">常见问题</div>
		</div>
		<div class="main">
			<div class="feedback-box" v-show="showF">
					<p>问题和意见</p>
					<textarea name="" placeholder="描述" required ></textarea>
					<div class="thumb-wrap">
						<img v-for="(item,index) in record_file" :src="fileRoot+item.url" alt="">
						<label for="upimg" class="icon-plus iconfont"></label>
						<input type="file" id="upimg" accept="image/*" multiple @change="uploadFile">
					</div>
					<button type="button" @click="publish">提交</button>
					
			</div>
			<table class="qa" v-show="showQ">
				<tr class="qa-list">
					<td class="qa-left">
						Q：
					</td>
					<td class="q">常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题</td>
				</tr>
				<tr class="qa-list">
					<td class="qa-left">
						A：
					</td>
					<td>回答回答回答回答回答回答回答回答回答回答回答回答回答回答</td>
				</tr>
				<tr class="qa-list">
					<td class="qa-left">
						Q：
					</td>
					<td class="q">常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题</td>
				</tr>
				<tr class="qa-list">
					<td class="qa-left">
						A：
					</td>
					<td>回答回答回答回答回答回答回答回答回答回答回答回答回答回答</td>
				</tr>
				<tr class="qa-list">
					<td class="qa-left">
						Q：
					</td>
					<td class="q">常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题</td>
				</tr>
				<tr class="qa-list">
					<td class="qa-left">
						A：
					</td>
					<td>回答回答回答回答回答回答回答回答回答回答回答回答回答回答</td>
				</tr>
				<tr class="qa-list">
					<td class="qa-left">
						Q：
					</td>
					<td class="q">常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题</td>
				</tr>
				<tr class="qa-list">
					<td class="qa-left">
						A：
					</td>
					<td>回答回答回答回答回答回答回答回答回答回答回答回答回答回答</td>
				</tr>
				<tr class="qa-list">
					<td class="qa-left">
						Q：
					</td>
					<td class="q">常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题</td>
				</tr>
				<tr class="qa-list">
					<td class="qa-left">
						A：
					</td>
					<td>回答回答回答回答回答回答回答回答回答回答回答回答回答回答</td>
				</tr>
				<tr class="qa-list">
					<td class="qa-left">
						Q：
					</td>
					<td class="q">常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题</td>
				</tr>
				<tr class="qa-list">
					<td class="qa-left">
						A：
					</td>
					<td>回答回答回答回答回答回答回答回答回答回答回答回答回答回答</td>
				</tr>
			</table>		
		</div>
		<div class="clip-wrap mask">
			<div class="cc">
				
			</div>
		</div>
	</div>
</template>

<script>
import config from '@/lib/config/config'
import fileService from '@/service/fileService'

export default{
	data(){
		return {
			fileRoot:config.fileRoot +'/',
			showF:true,
			showQ:false,
			record:{
				content:"",
			},
			record_file:[],
		}
	},
	methods:{
		showFeedback(){
			this.showF = true;
			this.showQ = false;
		},
		showQuestion(){
			this.showF = false;
			this.showQ = true;
		},
		uploadFile(e){
			let file = e.target.files[0];           
		    if (!this.$Tool.checkPic(file.name)) {
		    	this.$vux.alert.show({
				  content:'格式错误',
				})
			    return;
			 }
			this.$loading.open(2);
		    let param = new FormData(); //创建form对象        	
		    param.append('file',file,file.name);//通过append向form对象添加数据
		    fileService.uploadPic(param,(data)=>{
		    	let obj = {};
	          	obj.url = data.result.url;
	          	obj.filename = data.result.filename;
	          	this.record_file.push(obj);
	          	this.$loading.close();
			})

		},
		publish(){
			if(!localStorage.id){
				this.$vux.alert.show({
				  content:'你还未登录，亲先登录再反馈',
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
			let reg = /[^\w\s\u4e00-\u9fa5\(\)\（\）\-\+]/g;
			if (reg.test(this.record.content)) {
					this.record.content = this.record.content.replace(reg,'');
					this.$vux.alert.show({
					  content:'内容含有非法字符，已为您删除，请确认',
					})
				}
			this.record.author = Number(localStorage.id || 0);
			let res;
				res = articleService.publishArticle(this.record,this.record_file);	
			// debugger;
			if(res.status=="success") {
				this.record_file.length=0;
				this.record.content = "";
				this.$vux.alert.show({
				  content:'反馈成功',
				})
				setTimeout(()=>{
					this.$vux.alert.hide();
				},1000)
			}else{
				// alert("错误提示：" +res.result.tip + "错误代码：" + res.result.errorcode)
				this.$vux.alert.show({
				  content:'反馈失败',
				})
			}
		},
	}
	
}
</script>

<style rel="stylesheet" scoped>
	.tabbar {
	    background: #ddd;
	    margin-right: -1px;
        position: absolute;
	    width: 100%;
	}
	.tablist{
		width: 50%;
		float: left;
		border-right: 1px solid #eee;
		text-align: center;
		padding: 10px 0;
	}
	.current-tab{
		background: #eee;
	}
	.main{
		margin: 0 10px;
		padding-top: 50px;
	}
	.qa-list{
		line-height: 20px;
	}
	.qa-left{
		vertical-align: top;
	}
	.q{
		font-weight: 600;
	}
	.qa td{
		padding-bottom: 10px;
	}
	.feedback-box {
	    line-height: 30px;
	}
	.feedback-box p{
	    text-indent: 6px;
	}
	textarea{
	    width: 100%;
	    min-height: 100px;
	    color: #666;
	    text-indent: 6px;
	    border: 1px solid #bbb;
	}
	.thumb-wrap{
		margin: 10px 0;
	}
	.thumb-wrap img{
		width: 100px;
		height: 100px;
		margin-right: 5px;
	}
	button {
	    display: block;
	    width: 70px;
	    line-height: 30px;
	    margin: 15px auto;
	    border-radius: 8px;
	    background: #ddd;
	}
	.icon-plus{
	    width: 65px;
	    height: 65px;
	    display: inline-block;
		background: #eee;
		border: 1px solid #666;
	    line-height: 65px;
	    text-align: center;
	    font-size: 30px;
	    margin-bottom: 10px;
	    color: #666;
	}
	#upimg{
		height: 0;
		width: 0;
	}
	.mask{
		display: none;
	}
	.cc{
		width: 300px;
		height: 300px;
	}
</style>