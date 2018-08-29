
import config from '@/lib/config/config'
import axios from 'axios'
const controller =config.successServer+'/user';
const service ={}




service.getCode = function(mobile,call){
	// debugger;
	axios.get(controller+'/getCode',{params:{
		mobile:mobile
	}}).then(function(res){
		call(res.data);
	})

}
service.loginByMobile = function(mobile,code,call){
	// debugger;
	axios.get(controller+'/loginByMobile',{params:{
		mobile:mobile,
		code:code
	}}).then(function(res){
		call(res.data);
		console.log(res.data);
	}).catch(function(error){
		console.log(error);
	})

}
service.getUserById = function(token,userid,targetuserid,call) {
	axios.get(controller+'/getUserById',{params:{
		token:token,
		userid:userid,
		targetuserid:targetuserid
	}}).then(function(res){
		call(res.data);
	})
}



export default service

