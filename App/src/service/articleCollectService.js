import config from '@/lib/config/config'
import axios from 'axios'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/article_collect';
const service ={}

const token = localStorage.getItem('token');
const userid =  localStorage.getItem('id');

//收藏文章
service.articleCollect = function(articleid){
	var params = {
		token,//:"令牌"
		userid,//:"用户id",
		// userid,
		// token,
		articleid,//:"文章id",
	};

	var resArticleCollect = commonUtil.ajaxAsync(controller+'/articleCollect',params);

	return resArticleCollect;
}
//获取收藏列表
service.getCollectPage = function(page,size){
	var params = {
		page,//:"当前页",
		size,//:"分页大小"
		userid,//"当前用户id",
	};

	var resArticleCollect = commonUtil.ajaxAsync(controller+'/getCollectPage',params);

	return resArticleCollect;
}
//收藏列表清除
service.deleteCollect = function(ids){
	var params = {
		token,//:"令牌"
		userid,//:"用户id",
		"ids[]":ids,//[]"文章id数组"
	};

	var resArticleCollect = commonUtil.ajaxAsync(controller+'/deleteCollect',params);

	return resArticleCollect;
}
service.testCollect = function(articleid,call){
	var params = {
		userid,//:"用户id",
		articleid,//:"文章id",
	};

	commonUtil.ajax(controller+'/testCollect',params,call);

}

export default service;

