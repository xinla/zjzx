<template>
	<div>
		<top @hrefTo="this.$TooL.goBack">
			<template slot="title">{{ title||'个人认证' }}</template>
			<template slot="nav"><router-link :to="{ path:'/memberBase/idenComQuestion',query:{title:'常见问题'}}">常见问题</router-link></template>
		</top>
		<div  class="top-margin">			
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import top from '@/components/common/top'
export default {
	components:{
		top,
	},
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