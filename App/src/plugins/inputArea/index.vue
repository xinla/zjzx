<template>
	<div class="inputArea">
		<div class="mask"></div>
		<div class="area">
			<div class="areaBox">
				<textarea></textarea>
			</div>
		</div>
	</div>
</template>

<style>
	.inputArea {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 100%;
	}

	.mask {
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.4);
		position: absolute;
		left: 0;
		top: 0;
		z-index: 0;
		display: block;
	}
	.area {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		z-index: 99;
		background-color: #f4f5f6;
		padding: 15px;
	}
	.areaBox {
		width: 100%;
		height: 120px;
		border: 1px solid #d8d8d8;
		border-radius: 8px;
		padding: 10px;
	}
	.areaBox textarea {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>