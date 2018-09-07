import config from '@/lib/config/config'
import axios from 'axios'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/follow';
const service ={}

let token = localStorage.getItem('token');
let userid = localStorage.getItem('id'); 
// 获取用户粉丝数量
service.getUserVermicelliCount = function(){
	var params = {
		userid,
	};

	var resFansCount = commonUtil.ajaxAsync(controller+'/getUserVermicelliCount',params);

	return resFansCount;
}

// 获取用户关注数量
service.getUserFollowCount = function(){
	var params = {
		userid,
	};

	var resFocusCount = commonUtil.ajaxAsync(controller+'/getUserFollowCount',params);

	return resFocusCount;
}

// 关注/取消关注
service.doFollow = function(followuserid){
	var params = {
		token,
		userid,
		followuserid,
	};

	var resFocusState = commonUtil.ajaxAsync(controller+'/doFollow',params);

	return resFocusState;
}

export default service
