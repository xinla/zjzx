<template>
	<div class="editInfo-wrap">
		<div class="editInfo-body">	
			<ul class="editInfo-modal">
				<li class="editInfo-modal-item clearfix">
					<input type="file" accept="image/*" class="uploadInput"  @change="uploadAvatar">
					<span class="fl">头像</span>
					<div class="editInfo-right fr clearfix">
						<div class="editInfo-head-img fl">	 
							
							<img :src="imgurl" alt="">
						</div>
						<i class="iconfont icon-arrow fr">&#xe628;</i>
					</div>
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
				<li class="editInfo-modal-item clearfix">
					<span class="fl">生日</span>
					<div class="editInfo-right fr clearfix">
						<div class="editInfo-head-tip fl">	
							<span style="color:#2a90d7;">{{user.birthday}}</span>
						</div>
						<i class="iconfont icon-arrow fr">&#xe628;</i>
					</div>
				</li>	
				<li class="editInfo-modal-item clearfix">
					<span class="fl">地区</span>
					<div class="editInfo-right fr clearfix">
						<div class="editInfo-head-tip fl">	
						<span style="color:#2a90d7;">{{user.area}}</span>
						</div>
						<i class="iconfont icon-arrow fr">&#xe628;</i>
					</div>
				</li>	
				<li class="editInfo-modal-item clearfix">
					<span class="fl">手机号</span>
					<div class="editInfo-right fr clearfix">
						<div class="editInfo-head-tip fl">	
							<span>{{user.mobile}}</span>
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
				<li class="editInfo-switch-item">
					<span>账号注销</span>
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
			@handleSex="handleSex"></bottom-popup>

	<!-- 		 <group title="default format: YYYY-MM-DD">
      <datetime :value.sync="value1" @on-change="change" title="Birthday"></datetime>
    </group> -->

	
	</div>
</template>

<script>

	import config from '@/lib/config/config'
	import top from '@/components/common/top'
	import fileService from '@/service/fileService'
	import zSwitch from '@/components/common/switch'
	import userService from '@/service/userService'
	import textArea from '@/components/textarea'
	import bottomPopup from '@/components/bottomPopup'

	export default {
		components:{
			top,
			zSwitch,
			textArea,
			bottomPopup
		},
		data(){
			return {
				placeholder:{p1:'请输入用户名',p2:'请输入个性签名'},
				maxlength:{m1:20,m2:60},
				explain:'支持英文、数字',
				title:'编辑资料',
				value1:false,
				imgurl:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2537627520,3119182571&fm=27&gp=0.jpg",
				message:'',
				user:{
					username:'',
					introduce:'',
					usermobile:'',
					sex:'',
					area:'',
					birthday:''    
				},
				desc:"",
				showObj:{
					value1:false,
					showName:false,
					showMsg:false,
					showSex:false

				},
				list:['保密','男','女']
				
			}
		},
		
		mounted(){
			this.$nextTick(()=>{
				let data = userService.getCurentUser();
				this.$data.user = data.result.user;
				 // this.$data.user.username=this.userNameValue;
				// console.log(this.$data.user.username);
				//判断用户头像
				if(this.$data.user.imageurl == null) {
					// this.imgurl = '';
				}else{
					this.imgurl = config.fileRoot +'/'+ data.user.imageurl;
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
				if(this.$data.birthday == null) {
					this.user.birthday = '待完善'
				}
				//判断地区
				if(this.$data.area == null) {
					this.user.area = '待完善'
				}


			})
			
			
		},
		methods: {
			//上传头像
			uploadAvatar(e) {
				this.$loading.open(2);
				let file = e.target.files[0];           
		          let param = new FormData(); //创建form对象
		          param.append('file',file,file.name);//通过append向form对象添加数据
		          fileService.uploadHeadImage(param,(data)=>{
		          	let src = config.fileRoot +'/'+ data.result.url;
		          	this.$loading.close();
		          	this.imgurl=src;
					console.log(this.imgurl);
					console.log(data);
				})
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
		height: 50px;
		line-height: 50px;
		padding-right: 15px;
		border-bottom: 1px solid #e8e8e8;
		position: relative;
	}
	.editInfo-modal-item:last-child {
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
</style>