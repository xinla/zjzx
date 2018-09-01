import config from '@/lib/config/config'
import axios from 'axios'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/article';
const service ={}


var userid = localStorage.getItem('id'),
	token = localStorage.getItem('token');

service.publishArticle = function(record,record_file) {
	var params = {
		userid,
		token,
		record:JSON.stringify(record),
		record_file:JSON.stringify(record_file)
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

service.getArticleClassifyList = function(){
	var params = {
		
	};

	var resArticleClassifyList = commonUtil.ajaxAsync(controller+'/getArticleClassifyList',params);

	return resArticleClassifyList;
}

export default service

