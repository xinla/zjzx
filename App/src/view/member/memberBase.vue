<template>
	<div>
		<top @hrefTo="this.$TooL.goBack">
			<template slot="title">{{title}}</template>
		</top>
		<div  class="top-margin">			
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import top from '@/components/common/top'
export default{
	components:{
		top,
	},
	data(){
		return{
			title:'title',
		}
	},
	watch:{
		$route(to,from){
			let par = this.$route.query.title;
			this.title = par;			
		}
	},
	methods:{
	},
	mounted(){
		let par = this.$route.query.title;
		this.title = par;	
	}
	
}
</script>

<style rel="stylesheet" scoped>
	.hreficon{
		width: 30px;
	}
	.top-margin{
		padding-top: 50px;
	}
</style>