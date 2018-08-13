/*$('#files').upImgThumb()
缩略图结构：<img src="..." alt="" class="x-thumb">
图片缩略的用<div class="x-thumb-wrap"></div>包裹，
可通过css控制缩略图显示效果
*/
;(function ($) {
	$.fn.extend({
		upImgThumb:function(options){
			var defaultVal = {
				el:"upfile"
			};
			var newObj={};
			$.extend(newObj,defaultVal,options);
			this.change(function(){
				var that = this,
					files = this.files,
					imgWrap = $(`<div class="x-thumb-wrap"></div>`);
				for (var i = 0; i < files.length; i++) {
					 var reader = new FileReader();
					 reader.readAsDataURL(files[i]);
					 reader.onload = function(){
					 	var img = $(`<img  alt="" class="x-thumb">`);
					 	img.attr("src",this.result);
					 	imgWrap.append(img);
					 }
				}
				$(that).after(imgWrap);
			})
		}
	})
}(jQuery))