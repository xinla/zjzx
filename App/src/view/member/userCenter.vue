<template>
	<div class="userCenter-wrapper">
		<top>{{title}}</top>
		<div class="top-bg"></div>
		<div class="userCenter-head">
			<div class="userCenter-headimg">
				<img src="@/assets/images/header.jpeg" alt="">
			</div>
		</div>
	</div>
</template>

<script>
	import top from '@/components/common/top'
	export default {
		components:{
			top
		},
		data(){
			return{
				title:'',
			}
		}
	}
</script>

<style lang='css'>
	.top {
		background-color: #555 !important;
	}
	.iconfont{
		color:#fff !important;
	}
	.top-bg{
		padding-top: 50px;
		width: 100%;
		height: 150px;
		background:url('../../assets/images/topbg.jpg');
		background-position: 0 0;
		background-size: cover;
		background-repeat: no-repeat;
	}
	.userCenter-head{
		width: 100%;
		padding: 0 15px;
		height: auto;
		background-color: #fff;
	}
	.userCenter-headimg {
		width: 96px;
		height: 96px;
		position: relative;
		top: -48px;
	}
	.userCenter-headimg img{
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 2px solid #ccc;
	}
</style>