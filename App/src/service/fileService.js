import config from '@/lib/config/config'
import axios from 'axios'
const controller =config.fileServer+'/file';
const service ={
	// test: controller+'/test'
}

 let fileConfig = {
    headers:{'Content-Type':'multipart/form-data'}
  }; 

service.uploadHeadImage = function(params,call){
	// debugger;
	axios.post(controller+'/uploadHeadImage',params,fileConfig).then(function(res){
		call(res.data)
	})
}

service.uploadPic = function(params,call){
	axios.post(controller+'/uploadPic',params,fileConfig).then(function(res){
		call(res.data)
	})
}
service.uploadVideo = function(params,call){
	axios.post(controller+'/uploadVideo',params,fileConfig).then(function(res){
		call(res.data)
	})
}

export default service

