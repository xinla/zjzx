<template>
	<div>
		<ul class="focus" v-if="!proIf">
			<li class="focus-list" v-for="item in list"><img class="uname" src="http://wallpapers1.hellowallpaper.com/animal_nature--20_24-1920x1200.jpg" alt="">{{ item.username }}</li>
		</ul>
		<prompt-blank v-if="proIf" :mes="proMes"></prompt-blank>
	</div>
</template>

<script>
import userService from '@/service/userService'
export default{
	data(){
		return{
			list:[],
			proMes:'',
			proIf:false,
		}
	},
	mounted(){
		let resFocus = userService.getUserFollow(1,10);
		if (resFocus&&resFocus.status == "success") {
			this.list = resFocus.result.recordPage.list;
			if (this.list.length == 0) {
				this.proIf = true;
				this.proMes = "啥都没有啊";
			}
		} else {
			this.proIf = true;
			this.proMes = "请求失败，请稍后再试！"
		}
		// console.log(resFocus)
	}
}	
</script>

<style scoped>
	.focus-list{
		padding: 15px 0;
		border-bottom: 1px solid #eee;
	}
	.focus-list:last-child{
		border: 0;
	}
	.uname{
		width: 10%;
		max-width: 75px;
		border-radius: 50%;
		margin-right: 2%;
	}
</style>