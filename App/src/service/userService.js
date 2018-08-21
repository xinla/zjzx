
import config from '@/lib/config/config'
import axios from 'axios'
const controller =config.successServer+'/user';
const service ={
	// test: controller+'/test'
}




service.getCode = function(mobile,call){
	// debugger;
	// debugger;
	axios.get(controller+'/getCode',{params:{
		mobile:mobile
	}}).then(function(res){
		call(res.data);
	})

}
service.loginByMobile = function(mobile,code,call){
	// debugger;
	// debugger;
	axios.get(controller+'/loginByMobile',{params:{
		mobile:mobile,
		code:code
	}}).then(function(res){
		call(res.data);
	})

}



export default service

