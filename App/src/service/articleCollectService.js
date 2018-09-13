import config from '@/lib/config/config'
import axios from 'axios'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/article_collect';
const service ={}

service.articleCollect = function(articleid){
	var params = {
		token:config.token,//:"令牌"
		userid:config.userid,//:"用户id",
		// userid,
		// token,
		articleid,//:"文章id",
	};

	var resArticleCollect = commonUtil.ajaxAsync(controller+'/articleCollect',params);

	return resArticleCollect;
}

service.testCollect = function(articleid,call){
	var params = {
		userid:config.userid,//:"用户id",
		articleid,//:"文章id",
	};

	commonUtil.ajaxAsync(controller+'/testCollect',params,call);

}

export default service

