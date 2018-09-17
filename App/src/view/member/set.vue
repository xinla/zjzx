<template>
	<div>
		<ul class="ul" v-if="login">
			<router-link :to="{path:'editInfo',query:{title:'账号设置'}}" tag="li" class="li">
				<span class="">账号设置</span><span class="fr iconfont">&#xe7f2;</span>
			</router-link>
		</ul>
		<ul class="ul">
			<li class="li" @click="clearCache()"><span class="">清楚缓存</span><span class="fr">100MB</span></li>
			<li class="li"><span class="">字体大小</span><span class="fr">中</span></li>
			<li class="li"><span class="">非WIFI网络流量</span><span class="fr">100MB</span></li>
			<li class="li"><span class="">清楚缓存</span><span class="fr">100MB</span></li>
		</ul>
		<ul class="ul">
			<li class="li"><span class="">检查版本</span><span class="fr">1.0.0</span></li>
			<router-link :to="{path:'about',query:{title:'关于我们'}}" tag="li" class="li">
				<span class="">关于我们</span><span class="fr iconfont">&#xe7f2;</span>
			</router-link>
		</ul>
		<ul class="ul exit">
			<li class="" @click="exit()">退出登录</li>
		</ul>
	</div>
</template>

<script>
import userService from '@/service/userService'
export default{
	data(){
		return {
			login:false,
		}
	},
	methods:{
		clearCache(){

		},
		exit(){
			let resLogOut = userService.logOut();
			if (resLogOut && resLogOut.status=="success") {
				localStorage.clear();
				this.$vux.alert.show({
				  	content:'退出成功',
				})
				setTimeout(()=>{
					this.$vux.alert.hide();
				},1000)			
			} else {
				this.$vux.alert.show({
				  	content:'退出失败',
				})
				setTimeout(()=>{
					this.$vux.alert.hide();
				},1000)	
			}
		}
	},
	mounted(){
		this.login=true;
	}
}
</script>

<style rel="stylesheet" scoped>
	.ul{
	    background: #fff;
	    margin-top: 10px;
	    line-height: 50px;
	    border-top: 1px solid #eee;
	    border-bottom: 1px solid #eee;
	}
	.ul .li{
	    margin: 0 10px;
	    border-bottom: 1px solid #eee;
	}
	.ul .li:last-child{
		border:0;
	}
	.exit{
		text-align: center;
		margin-top: 40px;
		color: #f40;
	}
</style>