$(function(){
	$("#files").change(function(){
		var files =this.files;
		for(var i = 0; i < files.length; i++){
			var reader = new FileReader();
			reader.onload = function () {
				var imgs = $(`<img  alt="" class="thumb">`);
				$("#files").after(imgs);
				imgs.attr("src",this.result);
			}	
			reader.readAsDataURL(files[i]);	
		}
	})

})
