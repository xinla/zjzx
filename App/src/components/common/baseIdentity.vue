<template>
	<div>
		<top @hrefTo="this.$Tool.goBack" :showNav="true">
			<template slot="title">{{ title ||'个人认证' }}</template>
			<span slot="nav" @click="$Tool.goPage({name:'idenComQuestion',query:{title:'常见问题'}})">常见问题</span>
		</top>
		<div  class="top-margin">			
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return{
			title:'',
		}
	},
	watch:{
		$route(to,from){
			let par = this.$route.query.title;
			this.title = par;
		}		
	},
	mounted(){
		let par = this.$route.query.title;
		this.title = par;	
	}
}
</script>

<style rel="stylesheet" scoped>
	.top-margin{
			padding-top: 50px;
		}
</style>