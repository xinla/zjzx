<template>
	<div>
		<memberList :list="list" :mes="proMes"></memberList>
	</div>
</template>

<script>
import memberList from '@/components/common/memberList'
import userService from '@/service/userService'
export default{
	components:{
		memberList,
	},
	data(){
		return{
			list:[],
			proMes:'',
			proIf:false,
		}
	},
	mounted(){
		let res = userService.getUserVermicelli(1,10);
		if (res&&res.status == "success") {
			this.list = res.result.recordPage.list;
			if (this.list.length == 0) {
				this.proMes = "您想要的真相消失啦~~~";
			}
		} else {
			this.proMes = "请求失败，请稍后再试！"
		}
		// console.log(resFocus)
	}
}	
</script>

<style scoped>

</style>