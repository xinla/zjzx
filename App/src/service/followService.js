import config from '@/lib/config/config'
import axios from 'axios'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/follow';
const service ={}

let token = localStorage.getItem('token');
let userid = localStorage.getItem('id'); 

// 获取用户粉丝数量
service.getUserVermicelliCount = function(userid,call){
	var params = {
		userid,
	};
	
	if (call) {
		commonUtil.ajax(controller+'/getUserVermicelliCount',params,call);
		return;
	}
	var resFansCount = commonUtil.ajaxAsync(controller+'/getUserVermicelliCount',params);

	return resFansCount;
}

// 获取用户关注数量
service.getUserFollowCount = function(userid,call){
	var params = {
		userid,
	};

	if (call) {
		commonUtil.ajax(controller+'/getUserFollowCount',params,call);
		return;
	}
	var resFocusCount = commonUtil.ajaxAsync(controller+'/getUserFollowCount',params);

	return resFocusCount;
}

// 关注/取消关注
service.doFollow = function(followuserid,call){
	var params = {
		token,
		userid,
		followuserid,
	};

	if (call) {
		commonUtil.ajax(controller+'/doFollow',params,call);
		return;
	}
	var resFocusState = commonUtil.ajaxAsync(controller+'/doFollow',params);

	return resFocusState;
}
// 是否关注
service.testFollow = function(targetuserid,call){
	var params = {
		userid,//:"当前用户id",
		targetuserid,//:"关注的用户id"
	};

	commonUtil.ajax(controller+'/testFollow',params,call);
}

//获取用户关注
service.getUserFollow = function(page,size){

	let params = {
		userid,//:"用户id" 
		page,//："当前页数",
		size,//:"每一页大小",
	}
	let resFocus = commonUtil.ajaxAsync(controller+'/getUserFollow',params);

	return resFocus;
}

//获取用户粉丝
service.getVermicelliList = function(page,size){

	let params = {
		userid,//:"用户id" 
		page,//："当前页数",
		size,//:"每一页大小",
	}
	let resFans = commonUtil.ajaxAsync(controller+'/getVermicelliList',params);

	return resFans;
}
export default service
