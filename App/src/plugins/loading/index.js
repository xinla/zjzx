import appLoading from './index.vue';
import appLoadText from './loadText.vue';

const Loading = {};

//注册Loading
Loading.install = function (Vue,options) {
  //生成一个Vue的子类,这个子类也就是组件
  const LoadingControl = Vue.extend(appLoading);
  //生成一个该子类的实例
  const instance = new LoadingControl();
  //将这个实例挂载在我创建的div上
  let LoadingDom = document.createElement('div');
  instance.$mount(LoadingDom);
  //并将此div加入全局body内部
  document.body.appendChild(instance.$el);

  //声明一个定时器
  let timer = null;

  //通过Vue的原型注册方法,让所有实例共享这个方法
  Vue.prototype.$loading = {
    //显示Loading
    open(type='page') {
      //显示Loading
      instance.type = type;
      instance.show = true;
      //禁止页面滚动，兼容ios和安卓
      document.addEventListener('touchmove', function (event) {
        if(instance.show){
          window.event.returnValue = false;
        }else{
          window.event.returnValue = true;
        }
      },{passive: false});
    },
    //关闭Loading
    close() {
      instance.show = false;
    }
  }

}

const LoadText = {};

//注册Loading
LoadText.install = function (Vue,options) {
  //生成一个Vue的子类,这个子类也就是组件
  const vLoadText = Vue.extend(appLoadText);
  //生成一个该子类的实例
  const instance = new vLoadText();

  //将这个实例挂载在我创建的div上,(vue不能直接$mount到body或html上，只能$mount到普通的element)
  let LoadingDom = document.createElement('div');
  // let LoadingDom = document.body;
  instance.$mount(LoadingDom);
  //并将此div加入全局body内部
  document.body.appendChild(instance.$el);

  //声明一个定时器
  let timer = null;

  //通过Vue的原型注册方法,让所有实例共享这个方法
  Vue.prototype.$LoadText = {
    //显示Loading
    open(type='page') {
      //显示Loading
      instance.type = type;
      instance.show = true;

      //禁止页面滚动，兼容ios和安卓
      document.addEventListener('touchmove', function (event) {
        if(instance.show){
          window.event.returnValue = false;
        }else{
          window.event.returnValue = true;
        }
      },{passive: false});
    },
    //关闭Loading
    close() {
      instance.show = false;
    }
  }

}

export { Loading,LoadText } 
