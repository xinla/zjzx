<template>
	<div>
		invite
	</div>
</template>

<script>
export default {
	data(){
		return {

		}
	},
	beforeRouteEnter (to, from, next) {
		if (!localStorage.id ) { 
            GoTruth.$Tool.loginPrompt(); 
        }else{
          next();
        } 
	}
}
</script>

<style rel="stylesheet" scoped>

</style>