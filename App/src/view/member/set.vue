<template>
	<div class="system-setup">
		<div class="system-box">
			<ul class="system-list">
				<router-link class="system-item clearfix" v-if="notlogin" :to="{path:'/topBase/login',query:{title:'用户登录'}}" tag="li">
					<!-- <li class="system-item clearfix" v-if="notlogin"> -->
						<label class="system-tit fl">访客</label>
						<div class="system-wrap fr clearfix">
							<i class="iconfont icon-arrow-right fr"></i>
							<span class="system-desc fr">点击登录</span>
						</div>
					<!-- </li> -->
				</router-link>
				<li class="system-item clearfix" v-if="logined" @click="handleExit">
					<label class="system-tit fl">{{username}}</label>
					<div class="system-wrap fr clearfix">
						<i class="iconfont icon-arrow-right fr"></i>
						<span class="system-desc fr" :class="{loginClass:loginClass}">退出登录</span>
					</div>
				</li>
				<router-link class="system-item clearfix" v-if="setupShow" :to="{path:'editInfo',query:{title:'账号设置'}}" tag="li">
					<label class="system-tit fl">账户设置</label>
					<div class="system-wrap fr clearfix">
						<i class="iconfont icon-arrow-right fr"></i>
					</div>
				</router-link>
			</ul>
			<ul class="system-list">
				<li class="system-item clearfix">
					<label class="system-tit fl">字体大小</label>
					<div class="system-wrap fr clearfix">
						<i class="iconfont icon-arrow-right fr"></i>
						<span class="system-desc fr">大号字体</span>
					</div>
				</li>
				<li class="system-item clearfix">
					<label class="system-tit fl">图片选项</label>
					<div class="system-wrap fr clearfix">
						<i class="iconfont icon-arrow-right fr"></i>
						<span class="system-desc fr">始终显示大图(效果更佳)</span>
					</div>
				</li>
				<li class="system-item clearfix">
					<label class="system-tit fl">推荐给好友</label>
					<div class="system-wrap fr clearfix">
						<i class="iconfont icon-arrow-right fr"></i>
						<span class="system-desc fr">一键分享给好友</span>
					</div>
				</li>
				<li class="system-item clearfix">
					<label class="system-tit fl">我的二维码</label>
					<div class="system-wrap fr clearfix">
						<i class="iconfont icon-arrow-right fr"></i>
					</div>
				</li>
			</ul>
			<div class="setup">
				<group>
		    		<x-switch title="通知推送" v-model="value"></x-switch>
		    		<x-switch title="WiFi视频自动播放" v-model="value"></x-switch>
		    		<x-switch title="夜间模式" v-model="value"></x-switch>
		  		</group>
			</div>
			<ul class="system-list">
				<li class="system-item clearfix">
					<label class="system-tit fl">清除缓存</label>
					<div class="system-wrap fr clearfix">
						<i class="iconfont icon-arrow-right fr"></i>
						<span class="system-desc fr">10.00MB</span>
					</div>
				</li>
				<li class="system-item clearfix">
					<label class="system-tit fl">评分</label>
					<div class="system-wrap fr clearfix">
						<i class="iconfont icon-arrow-right fr"></i>
					</div>
				</li>
				<li class="system-item clearfix" @click="appUpdate()">
					<label class="system-tit fl">检查版本</label>
					<div class="system-wrap fr clearfix">
						<i class="iconfont icon-arrow-right fr"></i>
						<span class="system-desc fr" style="color: #66b3ff; font-weight: bold;">{{$store.state.currentVersion}}</span>
					</div>
				</li>
				<router-link class="system-item clearfix" :to="{path:'about',query:{title:'关于我们'}}" tag="li">
					<label class="system-tit fl">关于我们</label>
					<div class="system-wrap fr clearfix">
						<i class="iconfont icon-arrow-right fr"></i>
					</div>
				</router-link>
			</ul>

		</div>
	</div>
</template>

<script>
import userService from '@/service/userService'
import versionService from "@/service/versionService"
import { XSwitch, Group} from 'vux'
export default{
	components:{
		XSwitch,
		Group
	},
	data(){
		return {
			username:'',
			value:false,
			setupShow:true,
			loginClass:true,
			notlogin:true,
			logined:true
		}
	},
	mounted(){
		this.$nextTick(()=>{
			if(!localStorage.id) {
				this.notlogin = true;
				this.logined = false;
				this.setupShow= false;
				return;
			}
			let data = userService.getCurentUser();
			if(data && data.status == "success") {
				this.username = data.result.user.username;
				this.notlogin = false;
				this.logined = true;
			}

		});
	},
	methods:{
		handleExit(){
			let thiz = this;
			this.$vux.confirm.show({
				content:'确定要退出吗？',
				onConfirm(){
					temp.call(thiz);
				}
			})
			function temp (){
				let resLogOut = userService.logOut();
				if (resLogOut && resLogOut.status=="success") {
					this.$store.dispatch("userLogout")
					this.$Tool.goPage({name:"home"});
					this.$vux.alert.show({
						content:'退出成功',
					});
					this.notlogin = true;
					this.logined = false;
					this.setupShow= false;
					setTimeout(()=>{
						this.$vux.alert.hide();
					},1000)			
				} else {
					this.$vux.alert.show({
						content:'退出失败',
					})	
				}				
			}
		},
		appUpdate(){
			this.$vux.loading.show({
			 text: '正在检查更新',
			})
			let _this = this;
			try{
				plus.runtime.getProperty(plus.runtime.appid, function (info) {
	            let version = info.version;
	            versionService.compareVersion(version,data=>{
	            	_this.$vux.loading.hide();
	              if (data && data.status == "success") {
	                if (data.result.isnew == 0) {
	                  _this.$store.dispatch("setNewVersion",1);
	                  _this.$vux.confirm.show({
	                    title:"升级提示",
	                    content:`发现新版本${data.result.versionnum}`,
	                    confirmText:"立即体验",
	                    cancelText:"忍痛放弃",
	                    onConfirm () {                    	
	                      setTimeout(()=>{
		                      _this.$vux.toast.show({
		                        type:"text",
	                            time:1000,
		                        position:"middle",
		                        text:"开始为您拼命下载...",
		                        width:"auto",
		                      },1000);       
		                    })
	                      dtask.start();
	                      let dtask = plus.downloader.createDownload(data.result.newlink, {
	                      }, function (down, status) {
	                          if (status == 200) {
                                let path = down.filename;//下载apk
                                plus.runtime.install(path); // 自动安装apk文件
	                            // _this.$store.dispatch("setNewVersion",0);
	                          } else {
	                              _this.$vux.alert.show({
	                                title:'版本更新失败' + status,
	                              });
	                          }
	                      });
	                    }
	                  });
	                }else {
	                  _this.$vux.alert.show({
	                    title:'当前已是最新版本',
	                  });
	                }                  
	              }else {
	              	_this.$vux.loading.hide();
	                _this.$vux.alert.show({
	                  title:'网络异常，请稍候再试',
	                });
	              }
	            });          
	         });				
			} catch(e) {
              	_this.$vux.loading.hide();
              	_this.$vux.alert.show({
                  title:'手机配置太低，请稍候再试',
                });	
			}
		},
	}
	
}
</script>
<style lang="less" scoped>
	.system-setup{
		width: 100%;
		height: calc( 100vh - .87rem );
		overflow: hidden;
		overflow-y: auto;
		.system-box{
			margin-top: .35rem;
			padding-bottom: .35rem;
			.system-list {
				margin-bottom: .2rem;
				border-top: .02rem solid @borderColor;
				border-bottom: .02rem solid @borderColor;
				background-color: #fff;
				padding: 0 .2rem;
				.system-item {
					width: 100%;
					height: .8rem;
					line-height: .8rem;
					border-bottom : .02rem solid @borderColor;
					&:last-child{
						border-bottom: none;
					}
					.system-tit {
						width: 2rem;
						max-width: 2rem;
						font-size: .3rem;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.system-wrap{
						width: calc(100% - 2rem);
						height: 100% ;
						text-align: right;
						color: #999;
						.system-desc {
							height: 100%;
							line-height: .8rem;
							vertical-align: middle;
							font-size: .24rem;
							margin-right: .2rem;
							letter-spacing: .02rem;
						}
						.loginClass{
							color: @mainColor;
						}
						.iconfont{
							font-size: .4rem;
						}
					}
				}
			}
		}
		.setup{
			margin-bottom: .2rem;
		}
	}

</style>
<style>
	.vux-no-group-title{
		margin-top: 0 !important;
	}
	.weui-cells{
		margin-top: 0 !important;
	}
	.weui-cell {
		padding: 0 .2rem !important;
		height: .8rem;
		line-height: .8rem;
	}
	.weui-label {
		font-size: .3rem;
	}
	.weui-switch:before, .weui-switch-cp__box:before{
		width: .9rem !important;
		height: .5rem !important;
	}
	.weui-switch, .weui-switch-cp__box{
		width: .94rem !important;
		height: .54rem !important;
	}
	.weui-switch:after, .weui-switch-cp__box:after{
		width: .5rem !important;
		height: .5rem !important;
	}
</style>