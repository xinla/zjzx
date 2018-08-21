import config from '@/lib/config/config'
const controller =config.successServer+'/user';
const service ={
	// test: controller+'/test'
}

var requestUtil = null;

const  request ={};


request.loginByMobile = function(mobile,code,call){
	// debugger;
	// debugger;
	requestUtil.get(controller+'/loginByMobile',{params:{
		mobile:mobile,
		code:code
	}}).then(function(res){
		call(res.data);
	})

}

service.use = function (reqUtil) {
	requestUtil = reqUtil;
	return request;
}


export default service

