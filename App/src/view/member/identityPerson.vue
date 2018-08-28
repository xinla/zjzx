<template>
	<div>
		<div class="main-a">
			<router-link :to="path.info" exact>
				<div class="identity bfc-o">
					<span>绑定手机号</span>
					<button type="button" class="fr to achieved" v-if="achieved.ifBind">已完成</button>
					<button type="button" class="fr to" v-if="!achieved.ifBind">去完成</button>
				</div>
			</router-link>
			<router-link :to="path.release" exact>			
				<div class="identity bfc-o">
					<span>发布文章</span>
					<button type="button" class="fr to achieved" v-if="achieved.ifRelease">已完成</button>
					<button type="button" class="fr to" v-if="!achieved.ifRelease">去完成</button>
				</div>
			</router-link>
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
export default{
	data(){
		return {
			achieved:{
				ifBind:false,
				ifRelease:true,
			},
			path:{
				info:{},
				release:{},
			}
		}
	},
	mounted(){
		if (!this.achieved.ifBind) {
			this.path.info={path:'/memberBase/editInfo',query:{title:'资料编辑'}};
		}else{
			this.path.info={path:'/member/identityBase/identityPerson',query:{title:'个人认证'}};
		}
		if (!this.achieved.ifRelease) {
			alert(1)
			this.path.release={path:'/memberBase/release',query:{title:'发布图文'}};
		}else{
			this.path.release={path:'/member/identityBase/identityPerson',query:{title:'个人认证'}};
		}
	},
	methods:{

	},
	watch:{

	},
	
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