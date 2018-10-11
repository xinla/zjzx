import config from '@/lib/config/config'
import axios from 'axios'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/article_comment';
const service ={}

let userid = localStorage.getItem('id');
let	token = localStorage.getItem('token');
// 获取文章评论数量
service.getArticleCommentCount = function(articleid,call){
	var params = {
		articleid,
	};

	commonUtil.ajax(controller+'/getArticleCommentCount',params,call);

}

// 获取文章评论列表
service.getArticleCommentPage = function(articleid,page,size){
	var params = {
		articleid,
		page,
		size,
		type:1
	};

	var resArticleCommentList = commonUtil.ajaxAsync(controller+'/getArticleCommentPage',params);

	return resArticleCommentList;
}

// 获取评论回复数量
service.getReplyCount = function(commentid,call){
	var params = {
		commentid,
	};

	if(call){
		commonUtil.ajax(controller+'/getReplyCount',params,call);
		return;
	}
	var resMap = commonUtil.ajaxAsync(controller+'/getReplyCount',params);

	return resMap;

}

// 获取文章评论回复列表
service.getReplyList = function(commentid,page,size){
	var params = {
		commentid,
		page,
		size,
	};

	var resReplyList = commonUtil.ajaxAsync(controller+'/getReplyList',params);

	return resReplyList;
}

// 文章评论
service.articleComment = function(articleid,content,douserid,targetuserid,type,commentid){
	let record = {
			articleid,//:"文章id",
			content,//:"评论内容",
			douserid,//:"评论人id",
			targetuserid,//:"被评论人id",
			type,//:"评论类型" ,//1:评论，2：回复
			commentid,//:"评论id" //如果type =2 该字段不能为空
			commenttime:Number,//:"评论时间" // 后台设置
		};
	var params = {
		userid,//:"当前用户id",
		token,//:"令牌",
		record:JSON.stringify(record),
	};

	var resArticleComment = commonUtil.ajaxAsync(controller+'/articleComment',params);

	return resArticleComment;
}

// 删除文章评论/回复
service.deleteArticleConmon = function(itemid){
	var params = {
		userid,//:"当前用户id",
		token,//:"令牌",
		itemid,//:"评论/回复id"
	};

	var resDeleteArticleCommon = commonUtil.ajaxAsync(controller+'/deleteArticleConmon',params);

	return resDeleteArticleCommon;
}
//获取评论/回复详情
service.getCommentById = function(itemid){
	var params = {
		itemid,//:"评论/回复id"
	};

	var res = commonUtil.ajaxAsync(controller+'/getCommentById',params);

	return res;
}
export default service
