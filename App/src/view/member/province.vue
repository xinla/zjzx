<template>
	<div>
		<ul class="province-wrap" v-show="true">
			<router-link :to="{path:'/memberBase/city',query:{title:'选择城市',provinceid:item.provinceid}}" tag="li" class="province-li" v-for="(item,index) in provinceList" :key="item.provinceid" @click.native="provinFn(item)">
        		{{ item.province }}
            	<i class="iconfont fr">&#xe7f2;</i>	            	  				
			</router-link>
        </ul>
	</div>
</template>

<script>
import {Bus} from '@/store/eventBus'
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
			this.provinceList = resMap.result.provinceList;
		})
	},
	methods:{
		provinFn(item){
			Bus.$emit('add',item)
			console.log(item.provinceid);
		}
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
