$(function(){
	$(".show-nav").hover(
		function(){
		$("nav").slideDown(200);
	},function(){
		$("nav").stop(true).slideUp(200);
	});

	$("nav").on("click"," a.nav-item",function(){
		$("#current-nav").text($(this).text());
		return false;
	})

	/*nav*/
	$(window).scroll(function(){
		if ($(window).scrollTop()>=80) {
			$(".show-nav").css({
				"position":"fixed",
				"top":-6,
				"transform":"translateX(-45px)"
			});
		}else{
			$(".show-nav").css({
				"position":"relative",
				"transform":"translateX(0)"
			})
		}
	});
	/*search input check*/
	$("input").keyup(function(){
		var reg = /[^\w\u4e00-\u9fa5\(\)\（\）\-]/g;
		if(reg.test($(this).val())){
			this.value=this.value.replace(reg,"");
			alert("你输入的字符含有非法字符，已为您清除，请确认");
		}else if (this.value.length>25) {
			this.value=this.value.slice(0,25);
			alert('你输入的字符长度过长，已为您清除多余文字,请确认');
		}
	});

	/*gotop*/
	$(".gotop").click(function(){
		$("html,body").animate({scrollTop:"0"},"slow")
	})

	/*createCode(element,length)*/
	function createCode(element,length) {
		var code = '';
      	var el = document.getElementById(element);
		var codeChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
      'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      	for(var i = 1;i <= (length||4);i++){
      		code += codeChars[Math.floor(Math.random() * 52)];
      	}
      	if (el) {
	      	el.innerHTML = code;     		
      	}
	}
	/*verCode(inputCode-id,createCode-id)*/
	function verCode(inputId,createId) {
		let iCode = $("#"+inputId).val();
		let	cCode = $("#"+createId).text();
		if(iCode == "" || iCode.toUpperCase() != cCode.toUpperCase()){
			$("#"+inputId).css("borderColor","#f40");
			return false;
		}else{
			$("#"+inputId).css("borderColor","#eee");
			return true;
		}
	}

	/*phone login*/
	createCode('createcode');
	if (document.getElementById('createcode')) {		
		document.getElementById('createcode').onclick = function(){
			createCode('createcode');
		}
	};

	/*phone login check*/
	$('.usephone').keyup(function(){
		this.value=this.value.replace(/[^\d]+/g,"");		
	})
	$('.usephone').blur(function(){
		if (this.value.length!=11) {
			$(this).css("borderColor","#f40");
		} else {
			$(this).css("borderColor","#eee");
		}
	})
	$("#inputcode").blur(function(){
		verCode('inputcode', 'createcode');
	})
	$(".submit").click(function(){
		if(!verCode('inputcode', 'createcode') || $('.usephone').val().length!=11 || !$(":checkbox").attr("checked")){
			return false;
		}else{
			$('form').submit();
		}
	})

	/*phone account switch*/
	$("#accountlogin").hide();
	$(".phone").hide();
	$(".account").click(function(){
		$(this).hide();
		$(".phone").show();
		$("#phonelogin").hide();
		$("#accountlogin").show()
	});
	$(".phone").click(function()
	{
		$(this).hide();
		$(".account").show();
		$("#phonelogin").show();
		$("#accountlogin").hide()
	})

	/*account login check*/


	/*content reply*/
	$(".comment-wrap").on("click"," .reply-btn",function(){
		if($(this).parent().next("form").length==0){
			var input =$(`<form action="" method="get" accept-charset="utf-8" class="comment-form">
							<input type="text" class="input-commnet-content" name="" maxlength="100" placeholder="留下你的高见，一百字以内">
							<input type="submit" name="submit" class="submit-comment" value="回复">
						</form>`);
			$(".comment-list-wrap").find("form").remove();
			$(this).parent("div").after(input);
		}
	})
	$(".comment-wrap").on("click"," .reply-sh",function(){
		// $(this).parent().next("ul").toggle(200);不好使
		var sh = $(this).parent().next("ul").css("display");
		if (sh == "none") {
			$(this).parent().next("ul").slideDown(200);
			$(this).find(".rep-show").show();
			$(this).find(".rep-hide").hide();
		} else {
			$(this).parent().next("ul").slideUp(200);
			$(this).find(".rep-hide").show();
			$(this).find(".rep-show").hide();
		}
	})
	$(".report-article-btn").click(function(){
		$("html,body").addClass("bfc-o");
		$(".report-wrap").fadeIn(100);
		$(".report-comment").fadeOut(100);		
		$(".report-article").fadeIn(100);
		var uId = $(this).parents(".content-wrap").find(".uname").text()	
		var aTitle = $(this).parents(".content-wrap").find(".content-title").text()
		$(".report-article .uid").val(uId);
		$(".report-article .atitle").val(aTitle);

	})
	$(".report-comment-btn").click(function(){
		$("html,body").addClass("bfc-o");
		$(".report-wrap").fadeIn(100);
		$(".report-article").fadeOut(100);
		$(".report-comment").fadeIn(100);
		var uId = $(this).parents(".comment-detail").find(".uname").text()	
		var uCom = $(this).parents(".comment-detail").find(".ucomment").text()
		$(".report-comment .uid").val(uId);
		$(".report-comment .ucom").val(uCom);
	})
	$(".close,.report-wrap,cancel").on("click",function(){
		$("html,body").removeClass("bfc-o");
		$(".report-wrap").fadeOut(100);
	})

	$(".like-btn").on("click",function(){
		if (!$(this).attr("disabled")) {
			var num = $(this).prev("var").text();
			$(this).prev().text(++num);
			$(this).attr("disabled","disabled");
			$(this).children(".like-animate").addClass("like-animate-up");
		}
	})
})