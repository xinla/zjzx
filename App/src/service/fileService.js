import config from '@/lib/config/config'
import axios from 'axios'
const controller =config.fiieServer+'/file';
const service ={
	// test: controller+'/test'
}

 let fileConfig = {
    headers:{'Content-Type':'multipart/form-data'}
  }; 

service.uploadHeadImage = function(params,call){
	axios.post(controller+'/uploadHeadImage',params,fileConfig).then(function(res){
		call(res.data)
	})
}


export default service

