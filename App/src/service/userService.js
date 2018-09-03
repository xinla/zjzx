
import config from '@/lib/config/config'
import axios from 'axios'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/user';
const service ={}



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
	
	debugger;
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

//获取用户的Id和token令牌
service.getUserById = function(targetuserid,call) {
	let token = localStorage.getItem('token');
	let id =  localStorage.getItem('id');
	let username = localStorage.getItem('username');
	// axios.get(controller+'/getUserById',{params:{
	// 	token:token,
	// 	userid:id,
	// 	targetuserid:targetuserid
	// }}).then(function(res){
	// 	call(res.data);
	// })
	var params = {
		token:token,
		userid:id,
		username:username,
		targetuserid:targetuserid,

	};

	var resMap =	commonUtil.ajaxAsync(controller+'/getUserById',params);
//	$.post
	///call(resMap);
	// $.post(controller+'/getUserById',params,function(data){
	// 	debugger;
	// 	call(data);
	// });

	return resMap;
}

//更新用户名
service.updateUser = function(user) {
	let token = localStorage.getItem('token');
	let userid = localStorage.getItem('id');
	// debugger;
	let params = {
		token:token,
		userid:userid,
		record: JSON.stringify(user)
	}
	let userMap = commonUtil.ajaxAsync(controller+'/updateUser',params);

	return userMap;
}







service.getCurentUser = function(call){

	let id =  localStorage.getItem('id');

	var resMap = service.getUserById(id,call);

	return resMap;
}



export default service

