<template>
	<dl>	
		<dt>分类</dt>
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
		<dt>标题</dt>
		<dd><input type="text" name="title"></dd>
		<fieldset class="imgText" v-if="sort==0?1:0">		
			<dt>内容</dt>
			<dd><textarea id="contents" name="contents"></textarea></dd>
			<dt>上传图片</dt>
			<dd>
				<label for="upimg" class="uplab iconfont">&#xe800;</label>
				<input type="file" name="file" id="upimg" value="" accept="image/*" multiple>
			</dd>
		</fieldset>
		<fieldset class="video" v-if="sort==1?1:0">
			<dt>上传视频</dt>
			<dd>
				<label for="upvideo" class="uplab iconfont">&#xe800;</label>
				<input type="file" name="file" id="upvideo" value="" accept="video/*" >
			</dd>
		</fieldset>
		<div class="thumb">
			<img src="http://wallpapers1.hellowallpaper.com/animal_nature--20_24-1920x1200.jpg" alt="">
			<img src="http://wallpapers1.hellowallpaper.com/animal_nature--20_24-1920x1200.jpg" alt="">
		</div>

		<dd colspan="2"><button type="submit">发布</button></dd>
	</dl>
</template>

<script>
export default{
	data(){
		return {
			sort:0,
		}
	},
	mounted(){
		let sort = this.$route.query.sort;
		this.sort = sort;
		console.log(this.sort)
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
   	    border: 1px solid #aaa;
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
	    border: 1px solid #666;
	    line-height: 65px;
	    text-align: center;
	    font-size: 30px;
	    margin-bottom: 10px;
	    color: #666;
	}
	input[type="file"] {
	    height: 0;
	    width: 0;
	}
	.thumb img {
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
	}
</style>