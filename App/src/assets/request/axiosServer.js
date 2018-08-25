import axios from 'axios';
import qs from 'qs';
import config from './config';

const url = config.api.url;
let baseUrl = url.protocol + url.host + ':' + url.port + url.basePath + '/';


//预设提示
const tipText = {
	networkErr:'网络出现异常',
	noLogin: '您尚未登录',
	needLogin: '登录已失效'
};

const Request = {

  //判断是否登录
  isLogin() {
    return GoTruth.$store.state.userInfo.token;
  },

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

      //错误时，提示
      api.catch((err)=>{
        // GoTruth.$loading.close();
        if(err && err.msg) {
          // GoTruth.$toast.open({msg:err.msg,type:'err',timer:2000})
        }
      });
      return api;
    },

    //从本地缓存获取用户信息
    getUserInfoByLocal() {
      let str = localStorage.getItem('userInfo');
      if(!str){return;};
      let Obj = JSON.parse(str);
      let personal = Obj.personal || {};
      let userInfo = {
        personal:personal,
        token:Obj.token
      };
      //判断是否登录过
      if(userInfo && userInfo.token) {
        Request.setUserInfo(userInfo);
      }
    },

    //记录登录信息
    setUserInfo(data) {
      data.personal.faceUrl = GoTruth.$TooL.fitImg(data.personal.faceUrl);
      localStorage.setItem('userInfo',JSON.stringify(data));
      GoTruth.$store.commit('setStateData',{name:'userInfo',value:data});
    },

    //退出登录
    quitLogin(needLogin, isQuit) {
      //清除用户信息
      localStorage.removeImg('userInfo');
      if(isQuit){localStorage.removeItem('oldPage');}
      //清空数据库用户信息
      GoTruth.$store.commit('setStateData',{name:'userInfo',value:{personal:{},token:''}});
      if(needLogin) {
        let route = {
          name:GoTruth.$route.name,
          meta:GoTruth.$route.meta,
          fullPath:GoTruth.$route.fullPath,
          query:GoTruth.$route.query,
          path:GoTruth.$route.path,
        };
        if(!isQuit) {
          if(route.name || route.path) {
            localStorage.setItem('oldPage',JSON.stringify(route));
          }
        }
        GoTruth.$TooL.goPage({name:'welcome'});
      }
    },

    //从服务器获取用户信息
    getUserInfoBySerVer() {
      Request.APIServer('Personals',{
        needToken:true,
        type:'get'
      }).then((suc)=>{
        GoTruth.$store.state.userInfo.personal = suc;
        Request.setUserInfo(GoTruth.$store.state.userInfo);
        // GoTruth.$loading.close();
      })
    }
}

export default {
	install: function(Vue) {
		Vue.prototype.$Request = Request;
	}
}