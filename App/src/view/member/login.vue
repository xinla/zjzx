<template>
	<div class="login-wrap">
		<div class="login-header">
			<div class="login-img">
				<img src="@/assets/images/login-header.png" alt="">
			</div>
			<span>此刻开始直击真相</span>
		</div>
		<div class="login-body">
			<!-- <h3>手机号登录注册</h3>-->
			<div class="login-form">
				<div class="login-item" :class="{loginActive1:tip.active1}">
					<i class="iconfont icon-wode"></i>
					<input
						type="tel" 
						class="mobileInput" 
						@input="handeleMobile" 
						@keydown="show($event)"
						@focus="handleFocus1"
						ref="mobileFocus"
						v-focus
						v-model="mobileDesc"
						maxlength="13"
						placeholder="请输入手机号">
					<span class="login-close" v-show="tip.close1" @click="handleClose(1)">x</span>
					<span class="login-code" @click="handlegetCodeDesc" :class="{codeColor:tip.codeColor}">{{tip.getCodeDesc}}</span>
				</div>
				<span class="login-tip" >{{tip.mobileTip}}</span>
				<div class="login-item" :class="{loginActive1:tip.active2}">
					<i class="iconfont icon-yanzhengma"></i>
					<input type="text" 
						class="codeInput" 
						@input="handeleCode" 
						v-model="codeDesc"
						maxlength="4"
						ref="codeFocus"
						placeholder="请输入验证码">
					<span class="login-close login-code-close" v-show="tip.close2" @click="handleClose(2)">x</span>
				</div>
				<span class="login-tip">{{tip.codeTip}}</span>
				<button type="button" class="login-btn" @click="handleLogin" :class="{isOpacity: isOpacity}" :disabled="disabled">探寻真相</button>
			</div>
		</div>
		<div class="login-footer" v-show="footerShow">
			<div class="login-line">一键登录</div>
			<div class="login-way">
				<ul class="login-way-list">
					<li class="login-icon-item"><i class="iconfont icon-qq"></i></li>
					<li class="login-icon-item"><i class="iconfont icon-weixin1"></i></li>
					<li class="login-icon-item"><i class="iconfont icon-weibo1"></i></li>
				</ul>
			</div>
			<p class="login-desc">登录即代表您已阅读并同意<span>服务条款</span>和<span>隐私政策</span></p>
		</div>
	</div>
</template>

<script>
import userService from '@/service/userService'
export default{
	directives: {
	  focus: {
	    // 指令的定义
	    inserted: function (el) {
	      el.focus()
	    }
	  }
	},
	data(){
		return{
			docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
			showHeight: document.documentElement.clientHeight,  //实时屏幕高度
			footerShow:true,  //显示或者隐藏footer
			disabled:true,
			tip:{
				mobileTip:'',
				codeTip:'',
				getCodeDesc:'获取验证码',
				active1:false,
				active2:false,
				close1:false,
				close2:false,
				codeColor:false,
				codeTimer:null
			},
			mobileDesc:'',
			codeDesc:''
		}
	},
	mounted(){
		window.onresize = ()=>{
			return(()=>{
				this.showHeight = document.body.clientHeight;
			})()

		}
	},
	watch:{
		showHeight(){
			if(this.docmHeight > this.showHeight){
				this.footerShow=false;
			}else{
				this.footerShow=true;
			}
		}
	},
	computed:{
		// 检测手机号是否错误
		mobileErr(){
			return !this.$Tool.isPhoneNumber(this.mobileDesc.replace(/\s/g,""));
		},
		// 判断用户名和验证码格式是否正确，再决定登录按钮是否亮起
		isOpacity(){
			if(!this.mobileDesc) return;
			
			if(this.mobileDesc.length != 13 || this.codeDesc.length < 4) {
				this.disabled = true;
				return false;
			}else {
				this.disabled = false;
				return true;
			}

		},
	},
	methods:{
		show(ev){
			if(ev.keyCode == 8) {
			}
		},

		//用户名输入事件
		handeleMobile(){
			this.mobileDesc = this.$Tool.mobileInput(this.mobileDesc);
			if(this.mobileDesc) {
				this.tip.close1 = true;
				this.tip.active1 = false;
				this.tip.mobileTip = "";
			}else{
				this.tip.close1 = false;
			}
		},

		//验证码输入事件
		handeleCode(){
			this.codeDesc = this.codeDesc.replace(/[^0-9]/g,'');
			if(this.codeDesc) {
				this.tip.close2 = true;
			}else{
				this.tip.close2 = false;
			}
		},

		// 用户名input获取焦点事件
		handleFocus1(){
			if(this.mobileDesc.length > 0){
				this.tip.close1 = true;
			}
		},

		//取消文本内容close
		handleClose(val){
			if(val == 1){
				this.$refs.mobileFocus.focus();
				this.mobileDesc = "";
				this.tip.close1 = false;
				this.disabled = true;
			}else{
				this.$refs.codeFocus.focus();
				this.codeDesc = "";
				this.tip.close2 = false;
				this.disabled = true;
			}
		},

		// 获取验证码
		handlegetCodeDesc(){
			this.$refs.mobileFocus.focus();
			if(this.tip.codeTimer) return;
			if(!this.mobileDesc) {
				this.tip.mobileTip = "手机号有误";
				this.tip.active1 = true;
				return;
			}else {
				this.tip.mobileTip = "";
			}
			if(this.mobileErr){
				this.tip.mobileTip = "手机号有误";
				this.tip.active1 = true;
				this.mobileDesc = "";
				return;
			}
			this.$vux.loading.show({text: 'Loading'});
			userService.getCode(this.$data.mobileDesc,(data)=>{
				this.$refs.codeFocus.focus();
				this.tip.codeColor = true;
				if(data && data.status == "success") {
					this.$vux.loading.hide();
					this.tip.getCodeDesc = "60秒后重发";
					let i =60;
					this.tip.codeTimer = setInterval(()=>{
						if(i>0) {
							i--;
							this.tip.getCodeDesc = i + '秒后重发';
							this.tip.close1 = false;
						}else {
							clearInterval(this.tip.codeTimer);
							this.tip.codeTImer = null;
							this.tip.getCodeDesc = "获取验证码";
							this.tip.codeColor = false;
						}
					},1000);
				}
				else if(data && data.status == "error") {
					this.tip.mobileTip = data.result.tip;
					this.tip.active1 = true;
					this.mobileDesc = "";
					this.tip.close1 = false;
				}
			});

		},
		//登录
		handleLogin(){
			if(this.isOpacity == true) {
				this.$vux.loading.show({text: '正在登录中...'});
				userService.loginByMobile(this.$data.mobileDesc,this.$data.codeDesc,(data)=>{
					if(data && data.status == "success") {
						this.$vux.loading.hide();
						let token = data.result.token;
						let id = data.result.user.id;
						let logid = data.result.user.logid;
						let userImg = data.result.user.imageurl;
						let userName = data.result.user.username;
						let userMobile = data.result.user.mobile;
						localStorage.inviteCode = data.result.user.invitecode;
						this.$store.dispatch('userLogin',token);
						this.$store.dispatch('userId',id);
						this.$store.dispatch('userLogid',logid);
						this.$store.dispatch('userImg',userImg);
						this.$store.dispatch('userName',userName);
						this.$store.dispatch('userMobile',userMobile);
						this.$Tool.goPage({name: 'home',replace:true});
						location.reload();
					}
					else if(data && data.status == "error") {
						this.tip.codeTip = data.result.tip;
						this.tip.active2 = true;
						this.tip.close2 = false;
						this.codeDesc = "";
					}
				})
			}
		}
	}
}
</script>

<style lang="less" scoped>
	.login-wrap{
		// margin-top: @topHeigth;
		height: calc(100vh - @topHeigth);
		padding: .3rem .6rem .8rem .6rem;
		overflow: hidden;
		overflow-y: auto;
		background-color: #fff;
		.login-header{
			text-align: center;
			margin-bottom: .44rem;
			.login-img {
				width: 1.1rem;
				height: 1.1rem;
				margin: 0 auto;
				img{
					display: block;
					width: 100%;
					height: 100%;
					border-radius: 50%;
					border: .04rem solid @borderColor;
				}
			}
			span{
				display: block;
				padding-top: .3rem;
				font-size: .24rem;
				color: #222;
				font-weight: bold;
				letter-spacing: .02rem;
			}
		}
		.login-body{
			h3{
				font-size: .3rem;
				color: #333;
				letter-spacing: .02rem;
			}
			.login-form{
				margin-top: .6rem;
				.login-item {
					width: 100%;
					height: .88rem;
					position: relative;
					padding: 0 .2rem;
					border-radius: .4rem;
					border: .02rem solid #999;
					background-color: #fff;
					.iconfont {
						display: inline-block;
						width: .4rem;
						height: .84rem;
						line-height: .84rem;
						color: #999;
						font-size: .32rem;
					}
					input {
						position: absolute;
						left: .6rem;
						padding: 0 .2rem;
						height: .84rem;
						line-height: .84rem\9;
					}
					.mobileInput{
						width: calc(100% - 2.6rem);
					}
					.codeInput{
						width: calc(100% - .9rem);
					}
					.login-close{
						width: .28rem;
						height: .28rem;
						position: absolute;
						top: .28rem;
						right: 2.1rem;
						border-radius: 50%;
						text-align: center;
						background-color: #f5f7f9;
						color: #ccc;
					}
					.login-code-close{
						right: .2rem;
						
					}
					.login-code {
						width: 1.8rem;
						height: .5rem;
						line-height: .5rem;
						text-align: center;
						position: absolute;
						top: .18rem;
						right: .2rem;
						border-left: .02rem solid #ccc;
						color: #666;
					}
					.codeColor{
						color: #999;
					}
				}
				.loginActive1,.loginActive2{
					border-color: @mainColor;
				}
				.login-tip{
					display: block;
					font-size: .24rem;
					padding-left: .3rem;
					width: 100%;
					height: .4rem;
					line-height: .4rem;
					opacity: 1;
					color: @mainColor;
				}
				.login-btn{
					width: 100%;
					height: .88rem;
					line-height: .88rem;
					text-align: center;
					font-size: .28rem;
					letter-spacing: .04rem;
					border-radius: .4rem;
					opacity: .3;
					background-color: @mainColor;
					color: #fff;
				}
				.isOpacity{
					opacity:1;
				}
				
			}
		}
		.login-footer{
			width: calc(100% - 1.2rem);
			position: absolute;
			left: 0.6rem;
			bottom: 0.8rem;
			.login-line{
				position: relative;
				height: .28rem;
				line-height: .28rem;
				text-align: center;
				letter-spacing: .02rem;
				color: #999;
				&::after,&::before{
					content:'';
					display: block;
					position: absolute;
					top: .13rem;
					width: 35%;
					background-color: #d8d8d8;
					height: .02rem;
				}
				&::after{right: 0;}
				&::before{left: 0;}
			}
			.login-way{
				margin-top: .4rem;
				margin-bottom: .3rem;
				.login-way-list{
					display: flex;
			      	justify-content: center;
			      	.login-icon-item{
			      		width: .8rem;
			      		height: .8rem;
			      		border: .04rem solid @borderColor;
			      		border-radius: 50%;
        				text-align: center;
        				margin-right: .8rem;
        				&:last-child{
        					margin-right: 0;
        				}
        				&:first-child i,&:last-child i{
        					line-height: .7rem;
        				}
        				&:nth-child(2) i{
        					line-height: .8rem;
        				}
        				.iconfont{
        					font-size: .5rem;
        					color: #555;
        				}
			      	}
				}
			}
			.login-desc{
				width: 100%;
				font-size: .24rem;
				text-align: center;
				color: #999;
				span{
					text-decoration: underline;
					letter-spacing: .02rem;
				}
			}
		}

	}
</style>