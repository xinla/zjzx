import config from '@/lib/config/config'
import axios from 'axios'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/readhistory';
const service ={}

service.addReadHistory = function(articleid){
	var params = {
		token:config.token,//:"令牌"
		userid:config.userid,//:"用户id",
		articleid,//:"文章id",
	};

	var resAddReadHistory = commonUtil.ajaxAsync(controller+'/addReadHistory',params);

	return resAddReadHistory;
}

export default service

