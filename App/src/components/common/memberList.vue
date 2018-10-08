<template>
	<div>
		<ul class="member" v-if="list.length">
			<li class="member-list" v-for="item in userList">
				<img class="uname" :src="item.imageurl?(fileRoot+item.imageurl):imgurl">
				{{ item.username }}
			</li>
		</ul>
		<prompt-blank v-if="!list.length" :mes="mes"></prompt-blank>
	</div>
</template>

<script>
import config from '@/lib/config/config'
import userService from '@/service/userService'
export default{
	data(){
		return{	
			imgurl:require('@/assets/images/userPhoto.jpg'),
			fileRoot:config.fileRoot+'/',
			userList:[
				{
					username:'',
					imageurl:'',
				}
			],		
		}
	},
	props:{
		list:{
			type:Array,
			default:[],
			// { id :"记录id", userid :"点赞用户id", type:"点赞类型"，praisetime:"点赞时间", itemid:"项目id"}
		},
		mes:{
			type:String,
			default:"",
		},
	},
	methods:{
		init(){
			//获取列表人信息
			let temp = [];
			for (var i = 0,len = this.list.length; i < len; i++) {
				userService.getUserById(this.list[i].id,data=>{
					if (data && data.status == "success") {
						temp.push(data.result.user);
					}					
				});
			}
			this.userList = temp;
		}
	},
	watch:{
		list(){
			this.init();
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