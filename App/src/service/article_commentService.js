import config from '@/lib/config/config'
import axios from 'axios'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/article_comment';
const service ={}

let userid = localStorage.getItem('id');
let	token = localStorage.getItem('token');
// 获取文章评论数量
service.getArticleCommentCount = function(articleid){
	var params = {
		articleid:articleid
	};

	var resArticleCommentCount = commonUtil.ajaxAsync(controller+'/getArticleCommentCount',params);

	return resArticleCommentCount;
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

// 文章评论
service.articleComment = function(articleid,content,douserid,targetuserid,type,commentid){
	var params = {
		userid,//:"当前用户id",
		token,//:"令牌",
		articleid,//:"文章id",
		content,//:"评论内容",
		douserid,//:"评论人id",
		targetuserid,//:"被评论人id",
		type,//:"评论类型" ,//1:评论，2：回复
		commentid,//:"评论id" //如果type =2 该字段不能为空
		commenttime:Number,//:"评论时间" // 后台设置
	};

	var resArticleComment = commonUtil.ajaxAsync(controller+'/articleComment',params);

	return resArticleComment;
}
export default service
