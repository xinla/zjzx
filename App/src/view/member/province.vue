<template>
	<div>
		<ul class="province-wrap" v-show="true">
			<li class="province-li" v-for="(item,index) in provinceList" @click="$Tool.goPage({name:'city',query:{title:item.province,provinceid:item.provinceid}})">
        		{{ item.province }}
            	<i class="iconfont fr">&#xe7f2;</i>	            	  				
			</li>
        </ul>
	</div>
</template>

<script>
// import {Bus} from '@/store/eventBus'
import provinceService from '@/service/provinceService'
export default {
	data(){
		return {
			provinceList:[
				{
					provinceid:"",
					province:""
				}
			],
		}
	},
	mounted(){
		this.$nextTick(()=>{
			let resMap = provinceService.getProvinceList();
			if (resMap && resMap.status == "success") {
				this.provinceList = resMap.result.provinceList;				
			}
		})
	},
	methods:{
		// provinFn(item){
		// 	Bus.$emit('add',item)
		// 	// console.log(item.provinceid);
		// }
	}

}

</script>

<style rel="stylesheet" scoped>
.province-wrap{
    line-height: 40px;
    border-top: 5px solid #eee;
    padding: 0px 10px;
    background: #fff;
}
.province-li{
    border-bottom: 1px solid #ddd;   
}
.iconfont{
	color: #aaa;
}
</style>
