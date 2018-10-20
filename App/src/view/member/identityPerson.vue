<template>
	<div>
		<div class="main-a">
				<div class="identity bfc-o" @click="$Tool.goPage(path.info)">
					<span>绑定手机号</span>
					<button type="button" class="fr to achieved" v-if="achieved.ifBind">已完成</button>
					<button type="button" class="fr to" v-else>去完成</button>
				</div>			
				<div class="identity bfc-o" @click="$Tool.goPage(path.release)">
					<span>发布文章</span>
					<button type="button" class="fr to achieved" v-if="achieved.ifRelease">已完成</button>
					<button type="button" class="fr to" v-else>去完成</button>
				</div>
		</div>
		<div class="main-a">
			<div class="power">
				<p>个人认证</p>
				<span class="idespan">个人真实身份认证</span>
			</div>
			<div class="power">
				<p>个人认证</p>
				<span class="idespan">个人真实身份认证</span>
			</div>
			<div class="power">
				<p>个人认证</p>
				<span class="idespan">个人真实身份认证</span>
			</div>
			<div class="power">
				<p>个人认证</p>
				<span class="idespan">个人真实身份认证</span>
			</div>
		</div>
	</div>
</template>

<script>
import articleService from "@/service/articleService"
export default{
	data(){
		return {
			achieved:{
				ifRelease:false,
				ifBind:localStorage.userMobile,
			},
			path:{
				info:{},
				release:{},
			}
		}
	},
	mounted(){
		this.init();
	},
	methods:{
		init(){
			articleService.getUserArticleCount(localStorage.id,data=>{
				if (data.result.count) {
					this.achieved.ifRelease = true;
				}
			});
			if (this.achieved.ifBind) {
				this.path.info={name:'identityPerson',query:{title:'个人认证'}};
			}else{
				this.path.info={name:'editInfo',query:{title:'资料编辑'}};
			}
			if (this.achieved.ifRelease) {
				this.path.release={name:'identityPerson',query:{title:'个人认证'}};
			}else{
				this.path.release={name:'release',query:{title:'发布图文'}};
			}
		}
	}
}
</script>

<style rel="stylesheet" scoped>
	.main-a{
		padding:0 10px;
		background: #fff;
		margin-bottom: 5px;
	}
	.identity,.power{
		position: relative;
		padding: 10px 0;
	}
	.identity{
		border-bottom:1px solid #eee;	
	}
	.identity span{
		line-height: 26px;
	}
	.idespan{
		font-size: 12px;
		color: #aaa;
	}
	.to,.achieved{
		color: #fff;
		border-radius: 8px;
		background: #f40;
		padding: 5px 10px;
		font-size: 12px;
	}
	.achieved{
		background: #ccc;
	}
</style>