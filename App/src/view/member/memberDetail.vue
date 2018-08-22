<template>
	<div>
		<top>
			{{title}}
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
	.top-margin{
		padding-top: 50px;
	}
</style>