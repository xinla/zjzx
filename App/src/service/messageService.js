import config from '@/lib/config/config'
import axios from 'axios'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/message';
const service ={}

const userid = localStorage.getItem('id');
const token = localStorage.getItem('token');

//保存关键字
service.getMessagePage = function(page,size){
	var params = {	
		page,//:"当前页",
		size,//:"分页大小"，
		userid,//:"当前用户id"	
	};
	
	commonUtil.ajax(controller+'/getMessagePage',params,call);

}
//根据输入的关键字获取关键字列表
service.getKeywordList = function(keyword,call){
	var params = {
		keyword,//:"关键字"	
	};
	
	commonUtil.ajax(controller+'/getKeywordList',params,call);

}

export default service
