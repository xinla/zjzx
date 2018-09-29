import config from '@/lib/config/config'
import axios from 'axios'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/search';
const service ={}

const userid = localStorage.getItem('id');
const token = localStorage.getItem('token');

//保存关键字
service.addSearchRecord = function(keyword,call){
	var params = {	
		token,//:"令牌",
		userid,//:"用户id",
		keyword,//:"关键字"	
	};
	
	commonUtil.ajax(controller+'/addSearchRecord',params,call);

}
//根据输入的关键字获取关键字列表
service.getKeywordList = function(keyword,call){
	var params = {
		keyword,//:"关键字"	
	};
	
	commonUtil.ajax(controller+'/getKeywordList',params,call);

}
//获取最热关键字
service.getHotKeyword = function(call){
	var params = {
	};
	if (call) {
		commonUtil.ajax(controller+'/getHotKeyword',params,call);
		return;
	}

}
export default service
