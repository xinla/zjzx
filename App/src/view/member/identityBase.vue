<template>
	<div>
		<top>
			<template slot="title">用户认证</template>
			<template slot="nav"><i class="iconfont r-navicon bfc-d">&#xe7f9;</i></template>
		</top>
	</div>
</template>

<script>
import top from '@/components/common/top'
export default {
	components:{
		top,
	}
}
</script>

<style rel="stylesheet" scoped>
	.r-navicon{
		font-size: 20px;
		width: 30px;
		vertical-align: top;
	}
</style>