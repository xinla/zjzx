import appConfirm from './index.vue';

const Confirm = {};

//注册Confirm
Confirm.install = function (Vue,options) {
	//生成一个Vue的子类,这个子类也就是组件
  const ConfirmControl = Vue.extend(appConfirm);
  //生成一个该子类的实例
  const instance = new ConfirmControl();

  //将这个实例挂载在我创建的div上
  let ConfirmDom = document.createElement('div');
  instance.$mount(ConfirmDom);
  //并将此div加入全局挂载点内部
  document.body.appendChild(instance.$el);

	//通过Vue的原型注册方法,让所有实例共享这个方法
  Vue.prototype.$confirm = {
  	//打开Confirm
  	open(obj) {
      //默认参数
      let {msg='',title='',time=2000,sureText='确定',cancelText='取消',sure=()=>{},cancel=()=>{}} = obj;

      //必传项：title
      //如果没传入title就return
      if(!title) {
        return;
      }

      instance.msg = msg;
      instance.title = title;
      instance.time = time;
      instance.sureText = sureText;
      instance.cancelText = cancelText;
      instance.sure = sure;
      instance.cancel = cancel;

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
  	//关闭Confirm
  	close() {
      instance.show = false;
  	}
  }

}

export default Confirm
