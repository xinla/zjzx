import config from '@/lib/config/config'
import axios from 'axios'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/feedback';
const service ={}

let userid = localStorage.getItem('id');
let	token = localStorage.getItem('token');
// 提交反馈
service.submitFeedback = function(content,image,call){
	let params = {
		userid,//:"当前用户id",
		token,//:"令牌"
		content,//："内容",
		image,//:"图片" // base64编码
	}
	if (call) {
		commonUtil.ajax(controller+'/submitFeedback',params,call);
		return;
	}
	let res = commonUtil.ajaxAsync(controller+'/submitFeedback',params);

	return res;
}
//获取反馈
service.getUserFeedBack = function(call){
	let params = {
		userid,//:"当前用户id",
	}
	if (call) {
		commonUtil.ajax(controller+'/getUserFeedBack',params,call);
		return;
	}
	let res = commonUtil.ajaxAsync(controller+'/getUserFeedBack',params);

	return res;
}
export default service