<template>
	<div class="test cc" v-show="show">
		直击真相
		<div class="move">				
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return {
			show:false,
		}
	}
}
</script>

<style rel="stylesheet" scoped>
	.test{
	    font-size: 1.4em;
	    height: 1.4em;
	    width: 4.2em;
	    color: #ddd;
	    overflow: hidden;
	}
	.move{
	    position: absolute;
	    height: 100%;
	    width: 0.3em;
	    background: rgba(244, 245, 246,1);
	    top: 0;
	    animation: move 1.2s linear infinite;
	    transform: skew(-22deg,0);
	}
	@keyframes move {
		0% {left: -10px;}
		100% {left: calc(100% + 50px);}
	}
</style>