import config from '@/lib/config/config'
const controller =config.successServer+'/home';
const service ={
	// test: controller+'/test'
}

var requestUtil = null;

const  request ={};


request.test = function(call){
	// debugger;
	requestUtil.get(controller+'/test').then(function(res){
		call(res);
	})

}

service.use = function (reqUtil) {
	requestUtil = reqUtil;
	return request;
}


export default service

