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
					<label for="upimg" class="upimg iconfont">&#xe800;</label>
					<input type="file" name="file" id="upimg" value="" accept="image/*" placeholder="上传图片">
					<div class="thumb">
						<img src="http://wallpapers1.hellowallpaper.com/animal_nature--20_24-1920x1200.jpg" alt="">
						<img src="http://wallpapers1.hellowallpaper.com/animal_nature--20_24-1920x1200.jpg" alt="">
					</div>
					<button type="submit">发送</button>
					
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
			</table>		
		</div>
		<div class="clip-wrap mask">
			<div class="cc">
				
			</div>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return {
			showF:true,
			showQ:false,
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
	.thumb img{
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
	}
	.upimg{
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