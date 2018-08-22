<template>
	<div>
		<top>
			{{title}}
		</top>
		<router-view class="top-margin"></router-view>
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
			title:'',
		}
	},
	methods:{
		
	},
	mounted(){
		let par = this.$route.query.title1;
		this.title = par;
	}
	
}
</script>

<style rel="stylesheet" scoped>
	.top-margin{
		margin-top: 40px;
	}
</style>