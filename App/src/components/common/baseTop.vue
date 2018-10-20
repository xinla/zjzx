<template>
	<div>
		<top @hrefTo="this.$Tool.goBack">
			<template slot="title">{{title}}</template>
		</top>
		 <transition :name="transitionName">
		 	<keep-alive v-if="!$route.meta.keepAlive">
		        <router-view  class="router-view"></router-view> 
	     	</keep-alive>      
		      	<router-view v-else class="router-view"></router-view>
		</transition>
	</div>
</template>

<script>
export default{
	data(){
		return{
			title:'title',
			transitionName:''
		}
	},
	mounted(){
		this.title = this.$route.query.title;
	},
	watch:{
		$route(to,from){
			let par = this.$route.query.title;
			this.title = par;		
			if (this.$router['isBack'] == undefined) {
				this.$router['isBack'] = false;return;
			}
			this.transitionName = this.$router['isBack'] ? 'slide-right' : 'slide-left';
			this.$router['isBack'] = false;	
		}
	},	
}
</script>

<style rel="stylesheet" scoped>
	.hreficon{
		width: 30px;
	}
	.router-view {
		width: 100%;
	    height: calc(100vh - 0.87rem);
		position: absolute;
		transition: all .3s cubic-bezier(.55,0,.1,1);
	}
	.slide-left-enter, .slide-right-leave-active {
		opacity: 0;
		transform: translate(200px, 0);
	}
	.slide-left-leave-active, .slide-right-enter {
		opacity: 0;
		transform: translate(-200px, 0);
	}
</style>