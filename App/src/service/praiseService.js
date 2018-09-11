import config from '@/lib/config/config'
import axios from 'axios'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/praise';
const service ={}

//点赞量
service.getPraiseCount = function(itemid,type){
	var params = {
		itemid,//:"文章/评论/回复id",
		type,//:"1"
	};

	var resGetPraiseCount = commonUtil.ajaxAsync(controller+'/getPraiseCount',params);

	return resGetPraiseCount;
}

//是否点赞
service.testPraise = function(itemid,type){
	var params = {
		userid:config.userid,//:"用户id",
		itemid,//:"对象id",
		type,//:"点赞类型", //1:文章，2:评论
	};

	var resTestPraise = commonUtil.ajaxAsync(controller+'/testPraise',params);

	return resTestPraise;
}

//执行点赞
service.doPraise = function(itemid,type){
	var params = {
		token:config.token,
		userid:config.userid,//:"用户id",
		itemid,//:"对象id",
		type,//:"点赞类型", //1:文章，2:评论
	};

	var resDoPraise = commonUtil.ajaxAsync(controller+'/doPraise',params);

	return resDoPraise;
}
export default service

