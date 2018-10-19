<template>
	<div>
		<ul class="member" v-if="list.length">
			<li class="member-list" v-for="(item,index) in userList">
				<img class="uname" :src="item.imageurl?(fileRoot+item.imageurl):imgurl">
				{{ item.username }}
				<div class="fr ac" v-if="ifFocus" @click="doFocus(item.id,index);">
					<span v-if="index == currentFocus?focus:1" class="focused">已关注</span>
					<span v-else class="focus">关注</span>					
				</div>
			</li>
		</ul>
		<prompt-blank v-if="!list.length" :mes="mes"></prompt-blank>
	</div>
</template>

<script>
import config from '@/lib/config/config'
import userService from '@/service/userService'
import followService from '@/service/followService'
export default{
	data(){
		return{	
			imgurl:require('@/assets/images/userPhoto.jpg'),
			fileRoot:config.fileRoot+'/',
			userList:[
				// {
				// 	username:'',
				// 	imageurl:'',
				// 	id:'',
				// }
			],	
			focus:1,
			currentFocus:0,	
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
		ifFocus:{
			type:Boolean,
			default:false,
		},
	},
	// mounted(){
	// 	this.init();
	// },
	methods:{
		init(){
			//获取列表人信息
			let temp = [];
			this.userList = [];
			for (var i = 0,len = this.list.length; i < len; i++) {
				let data = userService.getUserById(this.list[i].userid);
					if (data && data.status == "success") {
						temp.push(data.result.user);
					}					
			}
			this.userList = temp;
		},
		doFocus(targetid,index){
			if (!targetid) {return false;}
			this.currentFocus = index;
			followService.doFollow(targetid,data=>{
				if (data && data.status == "success") {
					this.focus = Number(data.result);
					// console(this.focus)
					return;
				}
				if (data && data.status == "error") {
					if (data.result == 1) {
						this.$vux.alert.show({
						  content:'登录失效,请重新登录！',
						})
					}else{
						this.$vux.alert.show({
						  content:'非法访问！',
						})
					}
				}
			})
		}
	},
	watch:{
		list(){
			this.init();
			// console.log(this.list)
		}
	}
}	
</script>

<style scoped>
	.member{
		background: #fff;
	}
	.member-list{
		padding: 15px 0.3rem;
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
	.focused,.focus{
		display: inline-block;
		width: 52px;
	    border-radius: 6px;
	    line-height: 24px; 
	}
	.focused{
		color:#ddd;
	    /*background: #ddd;*/
	    border:1px solid #eee;
	}
	.focus{
	    color: #fff;
	    background: #f25d5d;	    
	}
</style>