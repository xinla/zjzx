<template>
	<div>
		<top @hrefTo="this.$Tool.goBack">
			<template slot="title">{{title}}</template>
		</top>
		<div>			
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			title:'title',
		}
	},
	mounted(){
		let par = this.$route.query.title;
		this.title = par;	
	},
	methods:{
	},
	watch:{
		$route(to,from){
			let par = this.$route.query.title;
			this.title = par;			
		}
	},
	
}
</script>

<style rel="stylesheet" scoped>
	.hreficon{
		width: 30px;
	}
</style>