import config from '@/lib/config/config'
import axios from 'axios'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/article';
const service ={}





service.publishArticle = function() {
	
	var params = {
		userid:userid,
		token,
		record:{
			title,
			content,
			author,
			type,   //1：图文，2:视屏
			publishtime,  // 后台设置
			classify,
			latitude,
			longitude,
			publishaddresses,
			publishprovince,
			publishcity,
			publisharea,
			publishstreet,
			streetnum,
			citycode,
			poiname,
			selectedpublishaddress,
			selectedpublishname,
		},
		
	};

	var resArticle = commonUtil.ajaxAsync(controller+'/publishArticle',params);
//	$.post
	///call(resMap);
	// $.post(controller+'/getUserById',params,function(data){
	// 	debugger;
	// 	call(data);
	// });

	return resArticle;
}








export default service

