import config from '@/lib/config/config'
import axios from 'axios'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/article';
const service ={}

const userid = localStorage.getItem('id');
const token = localStorage.getItem('token');

// 文章发布
service.publishArticle = function(record,record_file) {
	
	let params = {
		userid,
		token,
		record:JSON.stringify(record),
		record_file:JSON.stringify(record_file)
	};

	let resArticle = commonUtil.ajaxAsync(controller+'/publishArticle',params);
	return resArticle;
}

// 获取用户的文章
service.getArticleByUser = function(userid,page,size,type){

	let params = {
		userid,
		page,
		size,
		type,
	}

	let resArticleAllList = commonUtil.ajaxAsync(controller+'/getArticleByUser',params);

	return resArticleAllList;
}

// 获取用户的发布文章数量
service.getUserArticleCount = function(userid,call){

	let params = {
		userid,
	}
	commonUtil.ajax(controller+'/getUserArticleCount',params,call);
}

// // 获取用户的收藏文章
// service.getCollectArticlePage = function(page,size,targetuserid){

// 	let params = {
// 		page,
// 		size,
// 		userid:targetuserid || userid,
// 	}

// 	let resCollectArticleList = commonUtil.ajaxAsync(controller+'/getCollectArticlePage',params);

// 	return resCollectArticleList;
// }

// 获取文章列表
service.articlePage = function(page,size,classify,type){
	let params = {
		page,
		size,
		classify,//:"文章分类"
		type,//："文章类型" //1：图文，2:视屏
		state:"3",//  审核通过
		// keyword:"",// 根据 title或者content 进行模糊匹配
		// author:"",//:"发布人id",
		// authorname:"",//:"发布人姓名" //模糊匹配
		// publisharea:"",//:"发布地区" code
	}

	let resArticlePage = commonUtil.ajaxAsync(controller+'/articlePage',params);

	return resArticlePage;
}
// 搜索文章列表
service.searchArticlePage = function(page,size,keyword){
	let params = {
		page,
		size,
		keyword,// 根据 title或者content 进行模糊匹配
		state:"3",//  审核通过
		// classify,//:"文章分类"
		// type,//："文章类型" //1：图文，2:视屏
		// author:"",//:"发布人id",
		// authorname:"",//:"发布人姓名" //模糊匹配
		// publisharea:"",//:"发布地区" code
	}
	
	let resArticlePage = commonUtil.ajaxAsync(controller+'/articlePage',params);

	return resArticlePage;
}
// 获取文章详情
service.getArticleById = function(recordid){
	var params = {
		recordid:parseInt(recordid),
	};

	var resArticleDetail = commonUtil.ajaxAsync(controller+'/getArticleById',params);

	return resArticleDetail;
}
// 文章删除
service.deleteArticleById = function(articleid){
	var params = {
		userid,//:"用户id",
		token,//:"令牌"
		articleid,//:"文章id"
	};

	var resDelete = commonUtil.ajaxAsync(controller+'/deleteArticleById',params);

	return resDelete;
}
//文章推荐
service.recommendArticle = function(articleid){
	var params = {
	};

	var resMap = commonUtil.ajaxAsync(controller+'/recommendArticle',params);

	return resMap;
}
export default service

