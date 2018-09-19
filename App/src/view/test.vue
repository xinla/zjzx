<template>
	<div>
		<div class="test cc">
			直击真相
			<div class="move">
				
			</div>
		</div>
	</div>
</template>

<script>

</script>

<style rel="stylesheet" scoped>
	.test{
		font-size: 20px;
	    height: 26px;
	    width: 80px;
	    color: #ddd;
	}
	.move{
	    position: absolute;
	    height: 100%;
	    width: 6px;
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