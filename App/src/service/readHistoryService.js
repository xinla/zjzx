import config from '@/lib/config/config'
import axios from 'axios'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/readhistory';
const service ={}

let userid = localStorage.getItem('id');
let	token = localStorage.getItem('token');
service.addReadHistory = function(articleid,call){
	var params = {
		token,//:config.token,//:"令牌"
		userid,//:config.userid,//:"用户id",
		articleid,//:"文章id",
	};

	commonUtil.ajax(controller+'/addReadHistory',params,call);

}

export default service

