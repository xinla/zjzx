<template>
	<div>
		<!-- 文章动态通知 -->
		<div class="article">
			
		</div>
	</div>
</template>

<script>
import messageService from '@/service/messageService'
export default {
	data(){
		return {

		}
	},
	mounted:{

	},
	methods:{

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

<style scoped>
	
</style>