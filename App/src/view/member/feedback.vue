<template>
	<div>
		<div class="tabbar bfc-o">
			<div :class="['tablist', {'current-tab':showSwitch}]" @click="showFeedback()">意见反馈</div>
			<div :class="['tablist', {'current-tab':!showSwitch}]" @click="showQuestion()">常见问题</div>
		</div>
		<div class="main">
			<div class="feedback-box" v-show="showSwitch">
					<p>问题和意见</p>
					<textarea name="" v-model="content" placeholder="描述" required ></textarea>
					<div class="thumb-wrap">
						<div class="thumb bfc-d" v-if="image">
							<i class="iconfont icon-close-circle" @click="removeImg"></i>
							<img :src="image">							
						</div>
						<label for="upimg" class="icon-plus iconfont" v-if="!image"></label>
						<input type="file" id="upimg" accept="image/*" @change="uploadFile">
					</div>
					<button type="button" @click="publish">提交</button>
					
			</div>
			<table class="qa" v-show="!showSwitch">
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
	</div>
</template>

<script>
import feedbackService from '@/service/feedbackService'

export default{
	data(){
		return {
			showSwitch:true,
			content:"",
			image:"",
		}
	},
	methods:{
		showFeedback(){
			this.showSwitch = true;
		},
		showQuestion(){
			this.showSwitch = false;
		},
		uploadFile(e){
			let file = e.target.files[0];    
			if (!file) {return;}
		    if (!this.$Tool.checkPic(file.name)) {
		    	this.$vux.alert.show({
				  content:'格式错误，仅限jpg、png、jpeg、gif格式',
				})
			    return;
			 }
			 if (!FileReader) {
			 	alert("错误提示：版本太低不支持")
			 	return;
			 }
			this.$loading.open(2);
		    let fileReader = new FileReader();
		    fileReader.readAsDataURL(file);
		    fileReader.onload = (e) => {
		    	this.image = e.target.result;
		    }
		    fileReader.onerror = () => {
		    	this.$vux.alert.show({
				  content:'文件读取失败，请重试',
				})
		    }
			this.$loading.close();
			e.target.value = "";
			// console.log(this.image)
			// debugger;

		},
		publish(){
			if(!localStorage.id){
				this.$vux.alert.show({
				  content:'你还未登录，亲先登录再反馈',
				})
				location.href="/member";
				return;
			}
			if (!this.content) {
				this.$vux.alert.show({
				  content:'内容不能为空',
				})
				return;
			}
			if (!this.$Tool.checkInput(this.content)) {
				this.content = this.$Tool.replaceNo(this.content);
				this.$vux.alert.show({
				  content:'内容含有非法字符，已为您删除，请确认',
				})
				return;
			}
			let resFeedback = feedbackService.submitFeedback(this.content,this.image);	
			// debugger;
			if(resFeedback && resFeedback.status=="success") {
				this.image = "";
				this.content = "";
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
		removeImg(){
			this.image = "";
		}
		// getFeedback(){
		// 	feedbackService.getUserFeedBack(data=>{
		// 		if (data && data.status == "success") {
		// 			let recordList = data.recordList;
		// 			this.image = recordList[0].image;
		// 			console.log(recordList[0].image)
		// 		}
		// 	});
		// }
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
	.thumb{
		display: inline-block;
	}
	.icon-close-circle{
		position:absolute;
		top: -8px;
		right:0;
		line-height: 20px;
	}
</style>