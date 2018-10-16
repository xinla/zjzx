<template>
	<div @scroll="loadMore">
		<memberList :list="list" :mes="proMes" :ifFocus="true"></memberList>
		<load-more :show-loading="ifLoad"></load-more>
	</div>
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
			page:1,
			lock:false,
			ifLoad:true,
		}
	},
	// mounted(){
	// 	this.init();
	// },
	activated(){
		this.page = 1;
		this.list = [];
		this.init();
		// console.log("focu")
	},
	methods:{
		init(){
			this.lock = true;
			this.ifLoad = true;
			let res = followService.getUserFollow(this.page,10);
			if (res && res.status == "success") {
				if (res.recordPage.list.length) {
					this.page++;						
					this.list = this.list.concat(res.recordPage.list);
				}else if (this.list.length == 0) {
					this.proMes = "您想要的真相消失啦~~~";
				}
			} else {
				this.proMes = "请求失败，请稍后再试！"
			}
			this.lock = false;
			this.ifLoad = false;
		},
		loadMore(e){
			if (!this.lock && ($(e.target).scrollTop() + $(e.target).height()) > e.target.scrollHeight-350) {
				this.init();
				// console.log(1)
			}
		},
	}
}	
</script>

<style scoped>

</style>