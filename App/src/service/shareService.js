import shareUtil from '@/service/util/shareUtil'
const service ={}
/**
 * 初始化
 */
service.init = function() {

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
service.shareToWxPyq = function(msg,call) {
	shareUtil.shareTo("weixin",msg,call);
	
}
/**
 * 微信好友分享
 */
service.shareToWxHy = function(msg,call){
	msg.extra= {scene:'WXSceneSession'};
	service.shareToWxPyq(msg,call);
}
/**
 * 分享qq
 * @param {Object} msg
 * @param {Object} call
 */
service.shareToQQ = function(msg,call){
		shareUtil.shareTo("qq",msg,call);
}

service.shareToXl = function(msg,call){
	
	shareUtil.shareTo("sinaweibo",msg,call);
}

export default service;