<template>
	<div>
		<top></top>
		<router-view></router-view>
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

</style>