import config from '@/lib/config/config'
import axios from 'axios'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/province';
const service ={}





service.getProvinceList = function() {
	
	var params = {
		
	};

	var resMap =	commonUtil.ajaxAsync(controller+'/getProvinceList',params);
//	$.post
	///call(resMap);
	// $.post(controller+'/getUserById',params,function(data){
	// 	debugger;
	// 	call(data);
	// });

	return resMap;
}








export default service

