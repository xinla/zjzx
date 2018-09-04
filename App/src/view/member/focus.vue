<template>
	<ul class="focus">
		<li class="focus-list"><img class="uname" src="http://wallpapers1.hellowallpaper.com/animal_nature--20_24-1920x1200.jpg" alt="">xinxing辛幸</li>
	</ul>
</template>

<script>
import userService from '@/service/userService'
export default{
	data(){
		return{
			list:{},
		}
	},
	mounted(){
		let resFocus = userService.getUserFollow(1,10);
		this.list = resFocus.recordPage;
		// console.log(resFocus.recordPage.list)
		console.log(this.list)
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