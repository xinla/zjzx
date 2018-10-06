<template>
	<div>
		<ul class="member" v-if="list.length">
			<li class="member-list" v-for="item in list"><img class="uname" src="http://wallpapers1.hellowallpaper.com/animal_nature--20_24-1920x1200.jpg">{{ item.username }}</li>
		</ul>
		<prompt-blank v-if="!list.length" :mes="mes"></prompt-blank>
	</div>
</template>

<script>
import userService from '@/service/userService'
export default{
	data(){
		return{			
		}
	},
	props:{
		list:{
			type:Array,
			default:[],
		},
		mes:{
			type:String,
			default:"",
		},
	},
	watch:{
		list(){

		}
	}
}	
</script>

<style scoped>
	.member-list{
		padding: 15px 0;
		border-bottom: 1px solid #eee;
	}
	.member-list:last-child{
		border: 0;
	}
	.uname{
		width: 10%;
		max-width: 75px;
		border-radius: 50%;
		margin-right: 2%;
	}
</style>