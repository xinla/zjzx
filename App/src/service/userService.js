import config from '@/lib/config/config'
import axios from 'axios'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/user';
const service ={}

const token = localStorage.getItem('token');
const userid =  localStorage.getItem('id');

//获取手机验证码
service.getCode = function(mobile,call){
	// debugger;
	axios.get(controller+'/getCode',{params:{
		mobile:mobile
	}}).then(function(res){
		call(res.data);
	})
}

//用户登录
service.loginByMobile = function(mobile,code,call){

	axios.get(controller+'/loginByMobile',{params:{
		mobile:mobile,
		code:code
	}}).then(function(res){
		call(res.data);
		console.log(res.data);
	}).catch(function(error){
		console.log(error);
	})
}

//获取用户的信息
service.getUserById = function(targetuserid,call) {
	
	var params = {
		token:token || 13,
		userid:userid || 13,
		targetuserid,
	};
	if (call) {
		commonUtil.ajax(controller+'/getUserById',params,call);
		return;
	}
	var resUserInfo = commonUtil.ajaxAsync(controller+'/getUserById',params);

	return resUserInfo;
}

//更新用户信息
service.updateUser = function(user) {
	// debugger;
	let params = {
		token,
		userid,
		record: JSON.stringify(user)
	}
	let userMap = commonUtil.ajaxAsync(controller+'/updateUser',params);

	return userMap;
}

service.getCurentUser = function(call){

	var resMap = service.getUserById(userid,call);

	return resMap;
}

//用户退出
service.logOut = function(){
	let logid = localStorage.getItem('logid');
	let params = {
		logid,
		token,
		userid,
	}
	let resLogOut = commonUtil.ajaxAsync(controller+'/logOut',params);

	return resLogOut;
}

export default service

