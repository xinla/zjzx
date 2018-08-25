<template>
	<dl>	
		<dt>分类</dt>
		<dd>
			<select name="sort">
			<option value="">一线</option>
			<option value="">揭秘</option>
			<option value="">悬疑</option>
			<option value="">历史</option>
			<option value="">诈骗</option>
			</select>
		</dd>	
		<dt>标题</dt>
		<dd><input type="text" name="title"></dd>
		<dt>内容</dt>
		<dd><textarea id="contents" name="contents"></textarea></dd>
		<dt>封面图片</dt>
		<dd>
			<label for="upimg" class="upimg iconfont">&#xe800;</label>
			<input type="file" name="file" id="upimg" value="" accept="image/*" placeholder="上传图片" multiple>
			<div class="thumb">
				<img src="http://wallpapers1.hellowallpaper.com/animal_nature--20_24-1920x1200.jpg" alt="">
				<img src="http://wallpapers1.hellowallpaper.com/animal_nature--20_24-1920x1200.jpg" alt="">
			</div>
		</dd>
		<dd colspan="2"><button type="submit">发送</button></dd>
	</dl>
</template>

<script>

</script>

<style rel="stylesheet" scoped>
	dl {
		background: #fff;
	    line-height: 40px;
		padding: 0 10px 150px;
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
	}
	.upimg {
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
	#upimg {
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