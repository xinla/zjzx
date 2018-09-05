<template>
	<div>
		<ul class="province-wrap">
            <li class="province-li" v-for="(item,index) in cityList" @click="cityBack(item.city)">
        		{{ item.city }}        	  				
			</li>
        </ul>
	</div>
	</div>
</template>

<script>
import cityService from '@/service/cityService'
export default{
	data(){
		return {
			cityList:[],
			address:{},
		}
	},
	mounted(){
		this.$nextTick(()=>{
			let provinceid = this.$route.query.provinceid;
			this.address.province = this.$route.query.title;
			let resMap = cityService.getCityByProvince(provinceid);
			this.cityList = resMap.result.cityList;
		})
	},
	methods:{
		cityBack(c){
			this.address.city = c;
			localStorage.choiceAddress = JSON.stringify(this.address);
			window.history.go(-2);			
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
</style>