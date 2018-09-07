<template>
	<div class="prompt-blank ac">
		{{mes}}
	</div>
</template>

<script>
export default{
	props:{
		mes:{
			type:String,
			default:"啥都没有哦"
		}
	}
}
</script>

<style rel="stylesheet" scoped>
	.prompt-blank{
		padding: 100px 0;
	}
</style>