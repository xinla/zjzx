$(function(){
	$(".article").click(function(){
		$(".publish").addClass("current").siblings().removeClass("current");
		$(".article-wrap").show().siblings().hide();
		$(".publish-wrap").show().siblings().hide();
	})
	$(".publish").click(function(){
		$(this).addClass("current").siblings().removeClass("current");
		$(".publish-wrap").show().siblings().hide();
	})
	$(".collect").click(function(){
		$(this).addClass("current").siblings().removeClass("current");
		$(".collect-wrap").show().siblings().hide();
	})
	$(".focus").click(function(){
		$(".focus-s").addClass("current").siblings().removeClass("current");
		$(".ff-wrap").show().siblings().hide();
		$(".focus-wrap").show().siblings().hide();
	})
	$(".fans").click(function(){
		$(".fans-s").addClass("current").siblings().removeClass("current");
		$(".ff-wrap").show().siblings().hide();
		$(".fans-wrap").show().siblings().hide();
	})
	$(".focus-s").click(function(){
		$(this).addClass("current").siblings().removeClass("current");
		$(".focus-wrap").show().siblings().hide();
	})
	$(".fans-s").click(function(){
		$(this).addClass("current").siblings().removeClass("current");
		$(".fans-wrap").show().siblings().hide();		
	})

});


