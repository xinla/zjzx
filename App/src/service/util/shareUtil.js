var shareUtil = {};

var shares = {};

//var thumbs = ['_www/logo.png'];
//var pictures = ['_www/logo.png'];
/**
 * 初始化
 */
shareUtil.init = function() {

	plus.share.getServices(function(s) {

		for(var i in s) {
			var t = s[i];
			shares[t.id] = t;
		}
	}, function(e) {
		outSet('获取分享服务列表失败：' + e.message);
	});
}

/**
 * 微信朋友圈分享
 */
shareUtil.shareToWxPyq = function(msg,call) {
	shareTo("weixin",msg,call);

	
}
/**
 * 微信好友分享
 */
shareUtil.shareToWxHy = function(msg,call){
	msg.extra= {scene:'WXSceneSession'};
	shareUtil.shareToWxPyq(msg,call);
	
	
}
/**
 * 分享qq
 * @param {Object} msg
 * @param {Object} call
 */
shareUtil.shareToQQ = function(msg,call){
		shareTo("qq",msg,call);
}

shareUtil.shareToXl = function(msg,call){
	
	shareTo("sinaweibo",msg,call);
}

function shareTo(type,msg,call){
	
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
	
	
}

function shareMsg(s,msg,call){
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

export default shareUtil