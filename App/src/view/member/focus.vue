<template>
	<memberList :list="list" :mes="proMes" :ifFocus="true"></memberList>
</template>

<script>
import memberList from '@/components/common/memberList'
import followService from '@/service/followService'
export default{
	components:{
		memberList,
	},
	data(){
		return{
			list:[],
			proMes:'',
		}
	},
	// mounted(){
	// 	this.init();
	// },
	activated(){
		this.init();
		// console.log(1)
	},
	methods:{
		init(){
			let res = followService.getUserFollow(1,10);
			if (res && res.status == "success") {
				this.list = res.recordPage.list;
				if (this.list.length == 0) {
					this.proMes = "您想要的真相消失啦~~~";
				}
			} else {
				this.proMes = "请求失败，请稍后再试！"
			}
		}
	}
}	
</script>

<style scoped>

</style>