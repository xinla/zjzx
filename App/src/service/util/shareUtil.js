var shares = {

	shareTo(type,msg,call){
		
		var resMap = {};
		var result = {};
		resMap.result = result;
		var s = shares[type];
		if(!s) {
			console.log("授权失败");
			return;
		}
		//var msg = {};
		
		//msg.href = "http://192.168.2.101:8080/zjzx/user/getCode?mobile=18556528201";
		//msg.title = "分享测试";
		//msg.content = "ddd";
		//msg.thumbs= thumbs;
		//msg.pictures = pictures;
		if(s.authenticated){
			shareMsg(s,msg,call)
			
		}else{
			s.authorize(function(){
				shareMsg(s,msg,call);
			}, function(e){
				resMap.status = "error";
				result.e = e;
				if(call){
					call(resMap);
				}
				console('认证授权失败：'+e.code+' - '+e.message);
			});
		}		
	},

	shareMsg(s,msg,call){
		var resMap ={};
		var result = {};
		resMap.result = result;
		s.send(msg, function() {
				resMap.status = "success";
				result.msg = '分享到"' + s.description + '"成功！';
				console.log('分享到"' + s.description + '"成功！');
				if(call){
						
					call(resMap);
				}
			}, function(e) {
				resMap.status = "error";
				result.msg = '分享到"' + s.description + '"失败: ';
				result.e = e;
				console.log('分享到"' + s.description + '"失败: ' + JSON.stringify(e));
				if(call){
						
					call(resMap);
				}
			});
	}

};

export default shares;