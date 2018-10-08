<template>
	<div>
		<top @hrefTo="this.$Tool.goBack">
			<template slot="title">{{title}}</template>
		</top>
		<router-view class="router-view"></router-view>
		<!-- <div>			
		</div> -->
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
	.router-view{
	    margin-top: 1.05rem;
	    padding: 0 0.18rem 0.18rem;
	}
</style>