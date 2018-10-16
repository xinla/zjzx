<template>
	<div class="invite ac">
		<pre class="invite-title">
扫描二维码，注册登录
即可邀请好友一起看真相！
（自动绑定您的邀请码）
		</pre>
		<canvas class="qr-code cc" ref="QRCode"></canvas>
	</div>
</template>

<script>
import QRCode from 'qrcode' 
export default {
	data(){
		return {
			inviteCode:localStorage.inviteCode || 66,
		}
	},
	mounted(){
		this.creatQRCode();
	},
	methods:{
		//动态生成二维码
	    creatQRCode(){ 
	      	//生成的二维码内容，添加变量
	　　　　	let url ='https://www.baidu.com?inviteCode='+this.inviteCode;
			let canvas = this.$refs.QRCode;
	        QRCode.toCanvas(canvas, url, function (error) {
	        if (error) console.error(error);
	        })
	    }
	},
}
</script>

<style rel="stylesheet" scoped>
	#qr-code{
	    width: 90%!important;
	    height: auto!important;
  	}
  	.invite-title{
  		margin: 1rem 0;
  		line-height: 24px;
  	}
  	.invite {
  		min-height: 500px;
  	}
  	.cc{
  		position: fixed;
  	}
</style>