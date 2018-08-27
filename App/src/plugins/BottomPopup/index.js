import appBottomPopup from './index.vue';

const BottomPopup = {};

//注册Confirm
BottomPopup.install = function (Vue,options) {
  //生成一个Vue的子类,这个子类也就是组件
  const BottomPopupControl = Vue.extend(appBottomPopup);
  //生成一个该子类的实例
  const instance = new BottomPopupControl();

  //将这个实例挂载在我创建的div上
  let BottomPopupDom = document.createElement('div');
  instance.$mount(BottomPopupDom);
  //并将此div加入全局挂载点内部
  document.body.appendChild(instance.$el);

  //通过Vue的原型注册方法,让所有实例共享这个方法
  Vue.prototype.$bottomPopup = {
    //打开BottomPopup
    open(obj) {
      //默认参数
      let {arr=[],sure=()=>{},cancel=()=>{}} = obj;

      instance.arr = arr;
      
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
    //关闭BottomPopup
    close() {
      instance.show = false;
    }
  }

}
export default BottomPopup
