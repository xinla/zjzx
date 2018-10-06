<template>
	<div class="editInfo-wrap">
		<div class="editInfo-body">	
			<ul class="editInfo-modal">
				<li class="editInfo-modal-item clearfix">
					<input type="file" id="uphoto" name="file" accept="image/*" class="uploadInput"  @change="uploadAvatar">
					<span class="fl">头像</span>
					<label for="uphoto">						
						<div class="editInfo-right fr clearfix">
							<div class="editInfo-head-img fl"> 								
								<img :src="imgurl" alt="">
							</div>
							<i class="iconfont icon-arrow fr">&#xe628;</i>
						</div>
					</label>
				</li>	
				<li class="editInfo-modal-item clearfix" @click="userNameFn">
					<span class="fl">用户名</span>
					<div class="editInfo-right fr clearfix">
						<div class="editInfo-head-tip fl">	
							<span>{{user.username}}</span>
						</div> 
						<i class="iconfont icon-arrow fr">&#xe628;</i>
					</div>
				</li>	
				<li class="editInfo-modal-item clearfix" @click="userMsgFn">
					<span class="fl">介绍</span>
					<div class="editInfo-right fr clearfix">
						<div class="editInfo-head-tip fl">	
							<span>{{user.introduce}}</span>
						</div>
						<i class="iconfont icon-arrow fr">&#xe628;</i>
					</div>
				</li>	
			</ul>
			
			
			<ul class="editInfo-modal">
				<li class="editInfo-modal-item clearfix" @click="userSexFn">
				<span class="fl">性别</span>
				<div class="editInfo-right fr clearfix">
					<div class="editInfo-head-tip fl">	
						<span>{{user.sex}}</span>
					</div>
					<i class="iconfont icon-arrow fr">&#xe628;</i>
				</div>
			</li>	
				<li class="editInfo-modal-item clearfix" @click="userBirthFn"> 
					<span class="fl">生日</span>
					<div class="editInfo-right fr clearfix">
						<div class="editInfo-head-tip fl">	
							<span :class="dateColor">{{user.birthday}}</span>
						</div>
						<i class="iconfont icon-arrow fr">&#xe628;</i>
					</div>
				</li>	
				<router-link :to="{path:'province',query:{title:'选择城市'}}" class="editInfo-modal-item clearfix" tag="li">
					<span class="fl">地区</span>
					<div class="editInfo-right fr clearfix">
						<div class="editInfo-head-tip fl">	
						<span :class="areaColor">{{address}}</span>
						</div>
						<i class="iconfont icon-arrow fr">&#xe628;</i>
					</div>
				</router-link>	
				<li class="editInfo-modal-item clearfix">
					<span class="fl">手机号</span>
					<div class="editInfo-right fr clearfix" @click="showPhone=!showPhone">
						<div class="editInfo-head-tip fl">	
							<span>{{this.$Tool.mobileInput(user.mobile)}}</span>
						</div>
						<i class="iconfont icon-arrow fr">&#xe628;</i>
					</div>
				</li>	
			</ul>
			<h4 class="editInfo-tit">开启后，可以让你的好友找到你</h4>
			<ul class="editInfo-switch">
				<li class="editInfo-switch-item clearfix">
					<span class="fl">允许将我推荐给好友</span>
					<z-switch class="switch-btn fr" v-model='value1' @click.native='show'></z-switch>
				</li>
			</ul>
			<h4 class="editInfo-tit">开启后，可以向你推荐好友</h4>
			<ul class="editInfo-switch">
				<li class="editInfo-switch-item clearfix">
					<span class="fl">允许给我推荐可能认识的人</span>
					<z-switch class="switch-btn fr" v-model='value1' @click.native='show'></z-switch>
				</li>
			</ul>
			<h4 class="editInfo-tit">开启后，分享到微信QQ等平台的页面会展示你的头像</h4>
			<ul class="editInfo-switch">
				<li class="editInfo-switch-item clearfix">
					<span class="fl">分享页显示我的头像</span>
					<z-switch class="switch-btn fr" v-model='value1' @click.native='show'></z-switch>
				</li>
			</ul>
			<h4 class="editInfo-tit">社交平台账号绑定</h4>
			<ul class="editInfo-switch">
				<li class="editInfo-switch-item clearfix">
					<span class="fl">微信</span>
					<z-switch class="switch-btn fr" v-model='value1' @click.native='show'></z-switch>
				</li>
				<li class="editInfo-switch-item clearfix">
					<span class="fl">新浪微博</span>
					<z-switch class="switch-btn fr" v-model='value1' @click.native='show'></z-switch>
				</li>
				<li class="editInfo-switch-item clearfix">
					<span class="fl">腾讯QQ</span>
					<z-switch class="switch-btn fr" v-model='value1' @click.native='show'></z-switch>
				</li>
			</ul>

			<h4 class="editInfo-tit">高级设置</h4>
			<ul class="editInfo-switch">
				<li class="editInfo-switch-item ac">
					<span style="color: #f40;">敬请期待</span>
				</li>
			</ul>
		</div>
		<!-- 用户名 -->
		<text-area 
			v-show="showObj.showName"
			:explain="explain" 
			:placeholder="placeholder.p1" 
			:maxlength="maxlength.m1"
			ref="getInput"
			@handleSend="handleSend1"
			@handleCancel="cancel"
			@descValue="descValue"
		>
		</text-area>
		<!-- 用户介绍 -->
		<text-area 
			v-show="showObj.showMsg"
			:placeholder="placeholder.p2" 
			:maxlength="maxlength.m2"
			ref="getInput"
			@handleSend="handleSend2"
			@handleCancel="cancel"
			@descValue="descValue"
		>
		</text-area>
		<!-- 性别选项 -->
		<bottom-popup 
			v-show="showObj.showSex"
			:list="list"
			@handleCancel="cancel"
			@handleSex="handleSex">
		</bottom-popup>
		<!-- -phone change -->
		<confirm 
		v-model="showPhone"
		show-input hide-on-blur
		title="绑定手机号"
		@on-confirm="checkPhone"
		:input-attrs="{type:'number'}"
		confirm-text="验证"
		>			
		</confirm>
		<confirm 
		v-model="showVerCode"
		show-input hide-on-blur
		title="输入验证码"
		@on-confirm="checkCode"
		:input-attrs="{type:'number'}"
		>			
		</confirm>
		<alert 
		v-model="showAlert"
		hide-on-blur
		:content="alertMes"
		>
			
		</alert>
		<div class="vueCropper mask" v-if="ifCropper">
			<vueCropper
	            ref="cropper"
	            :img="photOption.img"
	            :outputSize="photOption.outputSize"
	            :outputType="photOption.outputType"
	            :info="false"
	            :full="photOption.full"
	            :canMove="photOption.canMove"
	            :canMoveBox="photOption.canMoveBox"
	            :fixedBox="photOption.fixedBox"
	            :original="photOption.original"
	            :autoCropWidth="photOption.autoCropWidth"
	            :autoCropHeight="photOption.autoCropHeight"
	            :autoCrop="photOption.autoCrop"
	            :fixed="photOption.fixed"
	            :fixedNumber="photOption.fixedNumber"
	            :centerBox="photOption.centerBox"
	            >          	
	        </vueCropper>
	        <ul class="bf ac">
	        	<li class="operate-li" @click="photoConfirm">
	        		确定
	        	</li>
	        	<li class="operate-li" @click="photoCancle">
	        		取消
	        	</li>
	        </ul>			
		</div>
	</div>
</template>

<script>
	import {Bus} from '@/store/eventBus'
	import config from '@/lib/config/config'
	import zSwitch from '@/components/common/switch'
	import vueCropper from 'vue-cropper'
	import textArea from '@/components/textarea'
	import bottomPopup from '@/components/bottomPopup'
	
	import fileService from '@/service/fileService'
	import userService from '@/service/userService'
	import provinceService from '@/service/provinceService'
	export default {
		components:{
			zSwitch,
			textArea,
			bottomPopup,
			vueCropper
		},
		data(){
			return {
				placeholder:{p1:'请输入用户名',p2:'请输入个性签名'},
				maxlength:{m1:20,m2:60},
				explain:'支持英文、数字',
				title:'编辑资料',
				value1:false,
				imgurl:require('@/assets/images/userPhoto.jpg'),
				message:'',
				user:{
					username:'',
					introduce:'',
					mobile:Number,
					sex:'',
					birthday:'',
					province:'',
					city:''
				},
				desc:"",
				showObj:{
					value1:false,
					showName:false,
					showMsg:false,
					showSex:false
				},
				list:['保密','男','女'],
				dateColor:{blue:true},
				areaColor:{blue:true},
				address:"",
				// provinceList:{				
				// 	province:'',
				// 	provinceid:''
				// },
				showPhone:false,
				showVerCode:false,
				showAlert:false,
				alertMes:'',
				verCode:'',
				inputMobile:'',
				photOption: {
	                img: '',//裁切图片的地址
	                outputSize: 0.6,//裁剪生成图片的质量 0.1-1
	                full: false,//是否输出原图比例的截图
	                outputType: 'png',//裁剪生成图片的格式
	                canMove: true,//图片是否允许滚轮缩放
	                fixedBox: true,//固定截图框大小 不允许改变
	                original: false,//上传图片按照原始比例渲染
	                canMoveBox: true,//截图框能否拖动
	                canMove:true,// 上传图片是否可以移动
		            autoCropWidth: 300,//截图框大小
		            autoCropHeight: 300,//截图框大小
	                autoCrop:true,//是否默认生成截图框
	                // 开启宽度和高度比例
	                fixed: true,
	                fixedNumber: [1, 1],
	                centerBox:true,
	            },
	            ifCropper:false,
	            upFile:{
	            	name:"",
	            	name2:"",
	            },
	            uploadImgName:"",
			}
		},
		
		mounted(){
			this.$nextTick(()=>{
				if (!localStorage.id) {return;}
				let data = userService.getCurentUser();
				if (data&&data.status == "success") {
					this.user = data.result.user;					
					localStorage.userData = JSON.stringify(data.result.user);
				}
				// console.log(this.$data.user)
				// let addData = provinceService.getProvinceList();
				// this.$data.provinceList = addData.result.provinceList;
				 // this.$data.user.username=this.userNameValue;
				// console.log(this.$data.user.username);
				//判断用户头像
				if(this.$data.user.imageurl == null) {
					// this.imgurl = '';
				}else{
					this.imgurl = config.fileRoot +'/'+ this.user.imageurl;
				}

				//个人介绍
				if(this.$data.user.introduce == null) {
					this.user.introduce = '暂无介绍';
				}
				//判断性别
				if(this.$data.user.sex == null) {
					this.user.sex='保密'
				}
				//判断生日
				if(this.$data.user.birthday == null) {
					this.user.birthday = '待完善';
				}else{
					this.dateColor.blue=false;
				}
				//判断地区					
				if(this.$data.user.province == null&&!localStorage.choiceAddress) {
					this.address = '待完善'
				}else if (localStorage.choiceAddress) {
					let temp = JSON.parse(localStorage.choiceAddress);
					this.areaColor.blue=false;
					this.user.province = temp.province;
					this.user.city = temp.city;
					if (this.user.province = this.user.city) {
						this.address = this.user.province;
					} else {
						this.address = this.user.province + this.user.city;					
					}
					userService.updateUser(this.$data.user);
					localStorage.removeItem("choiceAddress");
				} else {
					this.areaColor.blue=false;
					if (this.user.province = this.user.city) {
						this.address = this.user.province;
					} else {
						this.address = this.user.province + this.user.city;					
					}
				}
				//判断手机号
				if(this.$data.user.mobile == null) {
					this.user.mobile='未绑定'
				}
			})			
		},
		methods: {
			//上传头像
			commitUpload() {
				this.$loading.open(2);
		        let param = new FormData(); //创建form对象
					// console.log(this.upFile)
		        param.append('file',this.upFile,this.upFile.name);//通过append向form对象添加数据
		        // debugger
		        fileService.uploadHeadImage(param,(data)=>{
		          	if (data && data.status == "success") {
			          	let src = data.result.url;
			          	this.$loading.close();
			          	this.imgurl = config.fileRoot +'/'+ src;
			          	this.user.imageurl=src;
			          	// console.log(this.user)
					// debugger

			          	userService.updateUser(this.user)	          		
		          	} else {
			          	this.$loading.close();
		          		this.showAlert=true;
						this.alertMes="请求失败，请稍后再试";
						setTimeout(()=>{
							this.showAlert=false;
						},1000)
		          	}
					// console.log(this.imgurl);
					// console.log(data);
				})
			},
			uploadAvatar(e){
				let file = e.target.files[0]; 
				// console.log(file)  
				if (!file) {return;}
			    if (!this.$Tool.checkPic(file.name)) {
			    	this.$vux.alert.show({
					  content:'格式错误，仅限jpg、png、jpeg、gif格式',
					})
				    return;
				 }
				 if (!FileReader) {
				 	alert("错误提示：版本太低不支持")
				 	return;
				 }
				this.ifCropper = true;
				this.$loading.open(2);
				let fileReader = new FileReader();	
			    fileReader.readAsDataURL(file);
				fileReader.onload = (e) => {
					let data
					if (typeof e.target.result === 'object') {
						// 把Array Buffer转化为blob 如果是base64不需要
						data = window.URL.createObjectURL(new Blob([e.target.result]))
					} else {
						data = e.target.result
					}
					this.photOption.img = data;
					this.uploadImgName = file.name;
				}
				fileReader.onerror = function(){
			    	this.$vux.alert.show({
					  content:'文件读取失败，请重试',
					})
			    }
				this.$loading.close();
				//取消两次选择同一个文件是不能触发onchange事件问题
				e.target.value = "";
			},
			photoConfirm(){
				// 获取截图的blob数据
				this.$refs.cropper.getCropBlob((data) => {
					this.upFile = data;
					this.photOption.img = ''
					this.$set(this.upFile,"name",this.uploadImgName);
					// console.log(this.upFile)
					// debugger;
					this.commitUpload();
					this.ifCropper = false;
					
				});
					// console.log(this.upFile)
					// debugger;
			},
			photoCancle(){
				this.photOption.img = ''
				this.ifCropper = false;

			},
			show() {
				console.log(this.value1);
				console.log(this.user.username);

			},
			//用户名
			userNameFn(){	
				this.showObj.showName = true;
				console.log(this.$data.user.username);
			},

			handleSend1(val){
				this.$data.user.username = val;
				let data = userService.updateUser(this.$data.user);
				this.showObj.showName=false;
			},

			//用户介绍
			userMsgFn(){
				this.showObj.showMsg = true;
			},
			
			handleSend2(val){
				this.$data.user.introduce = val;
				let data = userService.updateUser(this.$data.user);
				this.showObj.showMsg=false;
			},
			//用户性别
			userSexFn(){
				this.showObj.showSex = true;
			},
			handleSex(val) {
				this.$data.user.sex = val;
				let data = userService.updateUser(this.$data.user);
				this.showObj.showSex=false;
			},
			//点击mask关闭
			cancel(){
				this.showObj.showName = false;
				this.showObj.showMsg = false;
				this.showObj.showSex = false;
			},
			descValue(data){
				this.$data.user.username = data;
			},
			//用户生日
			userBirthFn(){
				let thiz = this;
				this.$vux.datetime.show({
					value:thiz.user.birthday,
					confirmText:'确定',
					cancelText:'取消',
					startDate:"1900-01-01",
					endDate:new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+(new Date().getDay()+2),
					onConfirm (val){
						thiz.$data.user.birthday = val;
						let data = userService.updateUser(thiz.$data.user);
						
					}
				})
			},
			//用户地区
			userAreaFn(){
				this.$TooL.goPage({name:'province'});
				// Bus.$on('add',(val)=>{
					
				// 	thiz.$data.provinceList.province = val;
				// 	console.log(thiz.$data.provinceList.province);
				// 	// thiz.$data.user.province = val.provinceid;
				// 	// thiz.$data.address = val.province;
				// 	// let data = userService.getCurentUser();

					
				// 	// console.log(addData);
				// })
				// this.provinceList.province = thiz.$data.provinceList.province;	
			},
			checkPhone(val){
				if (val == this.user.mobile) {
					return;
				} else if (val.length == 11) {
					userService.getCode(val,data=>{
						if (data.status=='success') {
							this.inputMobile = val;
							this.verCode=data.result.code;
							console.log(this.verCode)
							this.showAlert=true;
							this.alertMes="发送成功";
							setTimeout(()=>{
								this.showAlert=false;
								this.showVerCode=true;
							},1000)
						} else {
							this.showAlert=true;
							this.alertMes="发送失败"
						}
						// console.log(data)
					})
				} else {
					this.showAlert=true;
					this.alertMes="号码有误";
				}
			},
			checkCode(val){
				if (val == this.verCode) {
					this.user.mobile = parseInt(this.inputMobile);
					let data = userService.updateUser(this.$data.user);
				} else {
					this.showAlert=true;
					this.alertMes="验证码错误";
					setTimeout(()=>{
						this.showAlert=false;
						this.showVerCode=true;
					},1000)
				}
			}
		},
		beforeRouteEnter (to, from, next) {
			if (!localStorage.id ) { 
	            GoTruth.$Tool.loginPrompt(); 
            }else{
              next();
            } 
		},
		beforeRouteLeave (to, from, next){
			if (JSON.stringify(this.user) != localStorage.userData) {
			}
				console.log(1)
				location.reload();
			next();
		}
	}
		
</script>

<style lang="css" scoped>
	.editInfo-body {
		/*padding-top: 50px;	*/
		margin-top: 15px;
	}
	.editInfo-modal,.editInfo-switch {
		margin-bottom: 15px;
		background-color: #fff;
		padding-left: 15px;
		border-top: 1px solid #e8e8e8;
		border-bottom: 1px solid #e8e8e8;
	}
	.editInfo-modal-item, .editInfo-switch-item {
		line-height: 50px;
		padding-right: 15px;
		border-bottom: 1px solid #e8e8e8;
		position: relative;
	}
	.editInfo-modal-item:last-child,.editInfo-switch-item:last-child {
		border-bottom: none;
	}
	.editInfo-modal-item>span,
	.editInfo-switch-item>span {
		font-size: 16px;
	}
	.editInfo-modal-item i {
		color: #999;
		font-size: 20px;
	}
	.editInfo-head-img{
		width: 30px;
		height: 30px;
		margin-top: 8px;
		margin-right: 6px;
		border-radius: 50%;
	}
	.editInfo-head-img img{
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.editInfo-head-tip {
		width: 120px;
		text-align: right;
		margin-right: 6px;
		color: #999;
		overflow: hidden;
		white-space: nowrap;
		text-overflow:ellipsis;
	}
	.uploadInput {
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.editInfo-tit{
		padding: 0 15px 15px 15px;
		color: #999;
	}
	.switch-btn {
		margin-top: 10px;
	}

	.editInfo-modal-item .blue{
		color: #2a90d7;
	}
	.editInfo-modal-item .black{
		color:#999;
	}
	.operate-li{
	    display: inline-block;
	    width: 20%;
	    color: #fff;
	    text-align: center;
	    line-height: 36px;
	    background: rgba(139, 139, 139, 0.99);
	    border-radius: 10px;
	    margin: 0 14%;
	}
</style>
<style>	
	/*vuecropper 样式修改*/
	.cropper-modal{
	    background: rgb(66, 66, 66);
	}
	.vue-cropper{
		background-image: none !important;
	}
</style>