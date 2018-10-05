import config from '@/lib/config/config'
import axios from 'axios'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/message';
const service ={}

const userid = localStorage.getItem('id');
const token = localStorage.getItem('token');

//获取消息分页
service.getMessagePage = function(page,size){
	var params = {	
		page,//:"当前页",
		size,//:"分页大小"，
		userid,//:"当前用户id"	
	};
	
	commonUtil.ajax(controller+'/getMessagePage',params,call);

}
//发送关注消息
service.sendFocusMessage = function(targetuserid,content,itemid,type,call){
	var params = {
		userid,//:"当前用户id",
		token,//:"令牌"
		douserid:userid,//:"发送者id",
		targetuserid,//:"接受者id"， 
		content,//："消息内容",
		itemid,//:"项目id"，
		type,//："消息类型"	
	};
	if (call) {
		commonUtil.ajax(controller+'/sendMessage',params,call);
		return;
	}
	
	var res = commonUtil.ajaxAsync(controller+'/sendMessage',params);

	return res;

}
//发送文章动态相关消息
service.sendArticleMessage = function(targetuserid,content,itemid,type,call){
	var params = {
		userid,//:"当前用户id",
		token,//:"令牌"
		douserid:userid,//:"发送者id",
		targetuserid,//:"接受者id"， 
		content,//："消息内容",
		itemid,//:"项目id"，
		type,//："消息类型"	
	};
	if (call) {
		commonUtil.ajax(controller+'/sendMessage',params,call);
		return;
	}
	
	var res = commonUtil.ajaxAsync(controller+'/sendMessage',params);

	return res;

}
//发送文章评论的回复相关消息
service.sendReplyMessage = function(targetuserid,content,itemid,type,call){
	var params = {
		userid,//:"当前用户id",
		token,//:"令牌"
		douserid:userid,//:"发送者id",
		targetuserid,//:"接受者id"， 
		content,//："消息内容",
		itemid,//:"项目id"，
		type,//："消息类型"	
	};
	if (call) {
		commonUtil.ajax(controller+'/sendMessage',params,call);
		return;
	}
	
	var res = commonUtil.ajaxAsync(controller+'/sendMessage',params);

	return res;

}
export default service
