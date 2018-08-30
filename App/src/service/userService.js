
import config from '@/lib/config/config'
import axios from 'axios'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/user';
const service ={}




service.getCode = function(mobile,call){
	// debugger;
	axios.get(controller+'/getCode',{params:{
		mobile:mobile
	}}).then(function(res){
		call(res.data);
	})

}
service.loginByMobile = function(mobile,code,call){
	// debugger;
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
service.getUserById = function(targetuserid,call) {
	let token = localStorage.getItem('token');
	let id =  localStorage.getItem('id');
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
		targetuserid:targetuserid
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




service.getCurentUser = function(call){

	let id =  localStorage.getItem('id');

	var resMap = service.getUserById(id,call);

	return resMap;
}



export default service

