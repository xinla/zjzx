<template>
	<div>
		<top></top>
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

		}
	}
}
</script>

<style rel="stylesheet" scoped>
	.top-margin{
		margin-top: 40px;
	}
</style>