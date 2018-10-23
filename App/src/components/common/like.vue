<template>
	<div class="bfc-d">
		<i class="iconfont icon-heart"></i>
		<i class="iconfont icon-heart like-animate" :class="[{'like-animate-up':likeStatus}]"></i>	
	</div>
</template>

<script>
export default {
	props:{
		likeStatus:false,
	},
}
</script>

<style lang="less" scoped>
	
.icon-heart{
	font-size:.35rem;
	 vertical-align: top;
}
.like-animate{
	position: absolute;
	left: 0;
	bottom: 0;
	opacity: 1;
	color: transparent;
}
.like-animate-up {
 	opacity: 0;
    transform: scale(2);
    color: #f40;
    transition: opacity 1s,bottom 1s,transform 1s;
}

/* .icon-weizan {
    font-size: 22px;
    vertical-align: sub;
    cursor: pointer;
    color: inherit;
}
.like-animate {
	position: absolute;
	left: 0;
	bottom: 0px;
	opacity: 1;
	color: rgba(0,0,0,0);
}
.like-animate-up {
    bottom: 20px;
    opacity: 0;
    transform: scale(2);
    color: #f40;
    transition: opacity 1s,bottom 1s,transform 1s;
} */
</style>