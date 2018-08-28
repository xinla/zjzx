import appInputArea from './index.vue';

const inputArea = {};

inputArea.install = function(Vue,options) {
	const inputAreaControl = Vue.extend(appInputArea);

	const instance = new inputAreaControl;

	let inputAreaDom = document.createElement('div');
	instance.$mount(inputAreaDom);

	document.body.appendChild(instance.$el);

	Vue.prototype.$inputArea = {
		open(obj) {
			//默认参数
			instance.show = true;

			document.addEventListener('touchmove',function(event){
				if(instance.show) {
					window.event.returnValue = false;
				}else{
					window.event.returnValue = true;
				}
			},{passive: false});
		},
		//关闭
		close() {
			instance.show = false;
		}
	}
}


export default inputArea