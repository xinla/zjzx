import config from '@/lib/config/config'
import axios from 'axios'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/interlocution';
const service ={}

// 问题发布
service.publicQuestion = function(title,description,userid,images){
	let params = {
		title,//:"标题",
		description,//:"描述"
		userid,//："用户id"
		images,//:"图片地址集合"  格式：url，url2,..........
	}
	// if (call) {
	// 	commonUtil.ajax(controller+'/publicQuestion',params,call);
	// 	return;
	// }
	let resMap = commonUtil.ajaxAsync(controller+'/publicQuestion',params);

	return resMap;
}
// 问题列表
service.getQuestionPage = function(page,size,userid){
	let params = {
		page,//:"当前页",
		size,//:"分页大小"
		userid,//:"用户id"
	}
	// if (call) {
	// 	commonUtil.ajax(controller+'/getQuestionPage',params,call);
	// 	return;
	// }
	let resMap = commonUtil.ajaxAsync(controller+'/getQuestionPage',params);

	return resMap;
}

export default service
