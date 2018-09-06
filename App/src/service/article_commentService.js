import config from '@/lib/config/config'
import axios from 'axios'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/article_comment';
const service ={}

// 获取文章评论数量
service.getArticleCommentCount = function(articleid){
	var params = {
		articleid:articleid
	};

	var resArticleCommentCount = commonUtil.ajaxAsync(controller+'/getArticleCommentCount',params);

	return resArticleCommentCount;
}

// 获取文章评论列表
service.getArticleCommentCount = function(articleid,page,size){
	var params = {
		articleid,
		page,
		size,
		type:1
	};

	var resArticleCommentCount = commonUtil.ajaxAsync(controller+'/getArticleCommentCount',params);

	return resArticleCommentCount;
}
export default service