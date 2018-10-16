<template>
	<div>
		<div class="main-a">
				<div class="identity"  @click="$Tool.goPage({name:'identityPerson',query:{title:'个人认证'}})">
					<i class="iconfont icon-arrow-right to fr"></i>
					<p>个人认证</p>
					<span class="idespan">个人真实身份认证</span>
				</div>	
				<div class="identity"  @click="$Tool.goPage({name:'identityEenterprise',query:{title:'企业认证'}})">
					<i class="iconfont icon-arrow-right to fr"></i>
					<p>企业认证</p>
					<span class="idespan">企业认证企业认证</span>
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
	.idespan{
		font-size: 12px;
		color: #aaa;
	}
	.to{
		color: #aaa;
		position: relative;
		top: 10px;
	}
</style>