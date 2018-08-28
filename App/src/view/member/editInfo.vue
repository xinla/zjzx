<template>
	<div class="editInfo-wrap">
		<div class="editInfo-body">	
			<ul class="editInfo-modal">
				<li class="editInfo-modal-item clearfix">
					<input type="file" accept="image/*" class="uploadInput"  @change="uploadAvatar">
					<span class="fl">头像</span>
					<div class="editInfo-right fr clearfix">
						<div class="editInfo-head-img fl">	 
							
							<img :src="src" alt="">
						</div>
						<i class="iconfont icon-arrow fr">&#xe628;</i>
					</div>
				</li>	
				<li class="editInfo-modal-item clearfix">
					<span class="fl">用户名</span>
					<div class="editInfo-right fr clearfix">
						<div class="editInfo-head-tip fl">	
							<span>用户13213123</span>
						</div>
						<i class="iconfont icon-arrow fr">&#xe628;</i>
					</div>
				</li>	
				<li class="editInfo-modal-item clearfix">
					<span class="fl">介绍</span>
					<div class="editInfo-right fr clearfix">
						<div class="editInfo-head-tip fl">	
							<span>用户介绍000000届世界</span>
						</div>
						<i class="iconfont icon-arrow fr">&#xe628;</i>
					</div>
				</li>	
			</ul>
			<ul class="editInfo-modal">
				<li class="editInfo-modal-item clearfix">
					<span class="fl">性别</span>
					<div class="editInfo-right fr clearfix">
						<div class="editInfo-head-tip fl">	
							<span>男</span>
						</div>
						<i class="iconfont icon-arrow fr">&#xe628;</i>
					</div>
				</li>	
				<li class="editInfo-modal-item clearfix">
					<span class="fl">生日</span>
					<div class="editInfo-right fr clearfix">
						<div class="editInfo-head-tip fl">	
							<span style="color:#2a90d7;">待完善</span>
						</div>
						<i class="iconfont icon-arrow fr">&#xe628;</i>
					</div>
				</li>	
				<li class="editInfo-modal-item clearfix">
					<span class="fl">地区</span>
					<div class="editInfo-right fr clearfix">
						<div class="editInfo-head-tip fl">	
							<span style="color:#2a90d7;">待完善</span>
						</div>
						<i class="iconfont icon-arrow fr">&#xe628;</i>
					</div>
				</li>	
				<li class="editInfo-modal-item clearfix">
					<span class="fl">手机号</span>
					<div class="editInfo-right fr clearfix">
						<div class="editInfo-head-tip fl">	
							<span>绑定手机号</span>
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
	</div>
</template>

<script>

	import config from '@/lib/config/config'
	import top from '@/components/common/top'
	import fileService from '@/service/fileService'
	import zSwitch from '@/components/common/switch'
	export default {
		components:{
			top,
			zSwitch
		},
		data(){
			return {
				title:'编辑资料',
				value1:false,
				src:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1535080568&di=0e17819bea67852954d3619418c91dbe&src=http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png'
			}
		},
		created(){
			
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
		          	this.src=src;
					console.log(this.src);
					console.log(data);
				})
			},
			show() {
				console.log(this.value1);
			}

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