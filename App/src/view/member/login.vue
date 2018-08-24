<template>
	<div class="login-wrap">
		<div class="login-body">
			<div class="login-logo">
				<img src="@/assets/images/login-logo.png" alt="">
			</div>
			<div class="login-form">
				<h2>手机号登录注册</h2>
				<p>
					<i class="iconfont">&#xe632;</i>
					<input type="tel" :maxlength="maxlength"   @input="mobileInput" placeholder="请输入手机号" v-model="mobile">
					<span class="login-code" @click="getCode" v-text="phoneNum" :class="{codeColor:codeColor}"></span>
				</p>
				<span class="user-error login-error" v-text="mobileErrText"></span>
				<p>
					<i class="iconfont">&#xe637;</i>
					<input type="tel" @input="codeInput" :maxlength="maxCode" v-model='code' placeholder="请输入验证码" >
				</p>
				<span class="code-error login-error" v-text="codeText"></span>
				<button class="login-btn" :class="{isOpacity: isOpacity}" :disabled="disabled"  @click="login">进入真相</button>
			<!-- 	<div class="login-see"> 
					点击查看<span>“用户协议”</span>和<span>“隐私政策”</span>
				</div> -->
				
			</div>

		</div>
		<div class="login-foot">
			<h2>一键登录</h2>
			<ul class="login-foot-list clearfix">
				<li class="login-foot-item">
					<img src="@/assets/images/login-qq.png" alt="">
				</li>
				<li class="login-foot-item">
					<img src="@/assets/images/login-wechat.png" alt="">
				</li>
				<li class="login-foot-item">
					<img src="@/assets/images/login-sina.png" alt="">
				</li>
				<li class="login-foot-item">
					<img src="@/assets/images/login-taobao.png" alt="">
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import userService from '@/service/userService'
	export default {
		data() {
			return {
				mobile:'',
				code:'',
				btnModel:'',
				phoneNum:'获取验证码',
				codeText:'',
				codeTimer: null,
				maxCode:4,
				maxlength:13,
				length:13,
				mobileErrText:'',
				disabled:true
			}
		},
		created(){
			console.log(userService);
		},
		watch:{
		},
		computed: {
			//检测是否错误
          mobileErr(){
              return !this.$TooL.isPhoneNumber(this.mobile.replace(/\s/g,""));
          },
          //判断账户名和验证码格式是否正确，再决定登录按钮是否亮起
			isOpacity: function () {
				if(this.mobile.length != 13 || this.code.length < 4) {
					this.disabled=true;
					return false;
				} else {
					this.disabled=false;
					return true;
				}
			},
			codeColor :function() {
				if(!this.mobile.length != 13) {
					return false;
				} else {
					return true;
				}
			}

		},

		
		methods: {
			//输入事件
			mobileInput() {
				this.mobile = this.$TooL.mobileInput(this.mobile);
			},
			codeInput() {
				this.code = this.code.replace(/[^0-9]/g,'');
			},
			//获取验证码
			getCode() {
				if(this.codeTimer) {return}
				if(!this.mobile){
					this.mobileErrText="请输入手机号";
					return;
				}else{
					this.mobileErrText="";
				}

				if(this.mobileErr){this.mobileErrText="请填写正确的手机号";return;}
				userService.getCode(this.$data.mobile,(data)=>{
					console.log(data);
					if(data.result.code){
						this.phoneNum = "60秒后重发";
						let i = 60;
						this.codeTimer = setInterval(()=>{
							if(i>0) {
								i--;
								this.phoneNum = i +'秒后重发'
							}else {
								clearInterval(_this.codeTimer);
								this.codeTimer = null;
								this.phoneNum = '获取验证码'
							}
						},1000);
					}
				})
			},

			//点击登录按钮触发
			login() {
				//登录按钮亮起代表信息格式填写正确
				if(this.isOpacity == true) {
					if(this.mobileErr){this.mobileErrText="请填写正确的手机号";return;}else{
						this.mobileErrText='';
					}

					userService.loginByMobile(this.$data.mobile,this.$data.code,(data)=>{
						console.log(data);
						if(data.status == 'error') {
							this.code = '';
							this.codeText=data.result.tip;
						}else{
							this.codeText="";
							return;
						}
					})
				}
			},
		}
	}
</script>

<style lang="css" scoped>
	.login-wrap {
		position: relative;
		height: 100vh;
		background-color: #fff;
	}
	.login-body {
		padding: 0 40px;
	}
	.login-logo {
		width: 50%;
		margin: 0 auto;
		padding: 25px 0;
		text-align: center;
	}
	.login-form {
		padding: 20px 0;
	}
	.login-form h2 {
		font-size: 16px;
		padding: 10px 0;
	}
	.login-form p {
		height: 55px;
		line-height: 55px;
		position: relative;
		border-bottom: 1px solid #9b9b9b;
	}
	.login-form input{
		position: absolute;
		width: 100%;
		height: 100%;
		padding-left:25px;
		padding-right: 100px; 
	}
	.login-form i {
		display: block;
		width: 20px;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		color: #999;
		z-index: 99;
	}
	.login-form .login-code {
		position: absolute;
		top: 10px;
		right: 0;
		width: 90px;
		height:35px;
		line-height: 35px;
		text-align: center;
		border-radius: 16px;
		border: 1px solid #edeff3;
		color: #999;
	}

	.login-error {
		line-height: 25px;
		color: #ec414d;
		height: 25px;
		display: block;
	}

	.login-btn {
		display: block;
		width: 100%;
		height: 45px;
		line-height: 45px;
		margin-top: 25px;
		text-align: center;
		border-radius: 10px;
		color: #fff;
		background-color:#ec414d;
		opacity: 0.5;
	}

	/*.login-see {
		text-align: center;
		line-height: 35px;
		color: #333;
	}
	.login-see span {
		color: #406599;
		font-weight: bold;
	}*/

	.login-reg {
		text-align: center;
		line-height: 45px;
		margin: 25px 0;
	}

	.login-reg a {
		color: #406599;
		font-size: 14px;
	}
	.login-reg span {
		color: #999;
		padding: 0 10px;
		vertical-align: top;
	}
	
	.login-foot {
		width: 100%;
		padding: 0 40px;
		position: absolute;
		bottom: 30px;
		left: 0;
	}
	.login-foot h2 {
		position: relative;
		line-height: 45px;
		text-align: center;
		color: #878787;
		font-size: 15px;
		letter-spacing: 1px;
		margin-bottom: 10px;
	}
	.login-foot h2:after,
	.login-foot h2:before {
		display: block;
		position: absolute;
		top: 22px;
		content: '';
		height: 1px;
		width: 35%;
		background-color: #d8d8d8;
	}

	.login-foot h2:after {
		right: 0;
	}
	.login-foot h2:before {
		left: 0;
	}
	
	.login-foot-item {
		float: left;
		width: 25%;
		text-align: center;
	}

	.login-foot-item img{
		width: 50%;
	}

	.login-form .isOpacity {
		opacity: 1;
	}
	.login-form .codeColor{color: #666;}
</style>