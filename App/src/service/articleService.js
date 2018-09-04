import config from '@/lib/config/config'
import axios from 'axios'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/article';
const service ={}



let userid = localStorage.getItem('id');
let	token = localStorage.getItem('token');

// 文章发布
service.publishArticle = function(record,record_file) {
	
	let params = {
		userid:userid,
		token:token,
		record:JSON.stringify(record),
		record_file:JSON.stringify(record_file)
	};

	let resArticle = commonUtil.ajaxAsync(controller+'/publishArticle',params);
	return resArticle;
}

// 获取用户的文章
service.getArticleByUser = function(page,size){
let userid = localStorage.getItem('id');

	let params = {
		page,
		size,
		userid,
	}

	let resArticleAllList = commonUtil.ajaxAsync(controller+'/getArticleByUser',params);

	return resArticleAllList;
}

// 获取用户的文章数量
service.getUserArticleCount = function(){
let userid = localStorage.getItem('id');

	let params = {
		userid,
	}

	let resArticleCount = commonUtil.ajaxAsync(controller+'/getUserArticleCount',params);

	return resArticleCount;
}

// 获取文章列表
// service.articlePage = function(){

// 	let params = {
// 		page,
// 	size,
// 	state:"3",  审核通过
// 	keyword,// 根据 title或者content 进行模糊匹配
// 	author,//:"发布人id",
// 	authorname,//:"发布人姓名" //模糊匹配
// 	type,//："文章类型" //1：图文，2:视屏
// 	publisharea,//:"发布地区" code
// 	}

// 	let resArticleCount = commonUtil.ajaxAsync(controller+'/articlePage',params);

// 	return resArticleCount;
// }


export default service

