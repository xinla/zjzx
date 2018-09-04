import config from '@/lib/config/config'
import axios from 'axios'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/follow';
const service ={}

// 获取用户粉丝数量
let userid = localStorage.getItem('id'); 
service.getUserVermicelliCount = function(){
	var params = {
		userid,
	};

	var resFansCount = commonUtil.ajaxAsync(controller+'/getUserVermicelliCount',params);

	return resFansCount;
}

export default service
