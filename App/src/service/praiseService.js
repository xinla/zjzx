import config from '@/lib/config/config'
import axios from 'axios'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/praise';
const service ={}

const token = localStorage.getItem('token');
const userid =  localStorage.getItem('id');
//点赞量
service.getPraiseCount = function(itemid,type,call){
	var params = {
		itemid,//:"文章/评论/回复id",
		type,//:"1"
	};
	if(call){
		commonUtil.ajax(controller+'/getPraiseCount',params,call);
		return ;
	}

	var resMap = commonUtil.ajaxAsync(controller+'/getPraiseCount',params);

	return resMap;
	
}

//是否点赞
service.testPraise = function(itemid,type,call){
	var params = {
		userid,//:"用户id",
		itemid,//:"对象id",
		type,//:"点赞类型", //1:文章，2:评论
	};
	if (call) {
		commonUtil.ajaxAsync(controller+'/testPraise',params,call);	
		return;	
	}

	var resMap = commonUtil.ajaxAsync(controller+'/testPraise',params);

	return resMap; 
}

//执行点赞
service.doPraise = function(itemid,type){
	var params = {
		token,
		userid,//:"用户id",
		itemid,//:"对象id",
		type,//:"点赞类型", //1:文章，2:评论
	};

	var resDoPraise = commonUtil.ajaxAsync(controller+'/doPraise',params);

	return resDoPraise;
}

//点赞列表
service.getPraiseList = function(itemid,type,page,size){
	var params = {
		itemid,//:"项目id",
		type,//:"项目类型"//1:文章，2:评论
		page,//:"当前页"
		size,//:"分页大小"
	};

	var resMap = commonUtil.ajaxAsync(controller+'/getPraiseList',params);

	return resMap;
}
export default service

