import axios from 'axios';
import qs from 'qs';
import config from './config';

const url = config.api.url;
let apiType = config.option.apiType;
let baseUrl = url.protocol + url.host + ':' +url.port + url.basePath + apiType + '/';


//预设提示
const tipText = {
	networkErr:'网络出现异常',
	noLogin: '您尚未登录',
	needLogin: '登录已失效'
};

const Request = {
	/*
    * 服务器请求
    * Data 为body内传的值  Object格式
    * params 为query 内传的值  Object格式
    * needToken 为是否需要登录 Boolean 格式
    * path 为接口中{id} Object格式
    * type String类型
    *  */
    APIServer(url,Info){
      let Url = config.api[url];
      let Data = Info.Data || {};
      let params = Info.params || {};
      let needToken = Info.needToken || false;
      let type = Info.type || 'post';
      let path = Info.path || {};
      if(typeof Url !== 'string'){return};
      if(typeof Data !== 'object'){return};
      if(typeof params !== 'object'){return};
      if(typeof path !== 'object'){return};
      if(typeof type !== 'string'){return};
      if(typeof needToken !== 'boolean'){return};
      let api = new Promise((resolve,reject)=>{
        //判断网络是否链接
        if(!navigator.onLine){reject({msg:tipText.networkErr});return;}
        //判断是否有字段未设置值
        for(let i in Data){
          if(Data[i]===''){delete Data[i]};
        }
        for(let i in params){
          if(params[i]===''){delete params[i]};
        }
        //修改path
        let pathKeys = Object.keys(path);
        if(pathKeys.length){
          for (let i=0;i<pathKeys.length;i++){
            let key = pathKeys[i];
            Url = Url.replace('{'+key+'}',path[key])
          }
        }
        let Header = {};
        //需要登录时，添加Bearer（auth认证的一种凭据类型）
        if(needToken){
          Header = {
            Authorization:'Bearer '+Request.isLogin(),
          }
        };
        //请求
        axios({
          method: type,
          data: Data,
          params:params,
          baseURL: baseUrl,
          timeout: 60000,
          headers: Header,
          responseType: 'json',
          url: Url,
        }).then((suc)=>{
          // console.log('suc',suc)
          let result = suc.data;
          if(result){
            if(result.data){
              resolve(result.data)
              return;
            }
          }
          resolve(result)
        }).catch((err)=>{
          // console.log('err',err.response)
          if(err.response){
            if(err.response.status === 401){
              Request.quitLogin(true);
              reject({msg:tipText.needLogin});
              return;
            }
            if(err.response.data && err.response.data.msg){
              reject({msg:err.response.data.msg});
              return;
            }
          }
          reject(err.response)
        })
      });
    },
}

export default {
	install: function(Vue) {
		Vue.prototype.$Request = Request;
	}
}