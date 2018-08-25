import Vue from 'vue';
import lF from 'localforage';
Vue.use(lF);
const localForage = {
  //设置数据
  set(key,value){
    return lF.setItem(key,value).then(function () {
        return lF.getItem(key);
    })
  },
  //获取数据
  get(key){
   return lF.getItem(key)
  },
  //删除某一条数据
  remove(key){
    return lF.removeItem(key);
  },
  //清除所有
  clear(){
   return lF.clear()
  }
}


export default {
  install: function (Vue) {
    Vue.prototype.$lF = localForage;
  }
};
