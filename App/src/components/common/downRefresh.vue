<template>
	<div class="scroll-wrap" @scroll="$emit('scrolling',$event)">
		<div class="refresh ac" :class="{animate:animate}" :style="{'height':lineHeight + 'px',lineHeight: lineHeight + 'px',}">
			{{ tipText }}
		</div>
		<slot ref="list"></slot>
	</div>
</template>

<script>
export default {
	data(){
		return {
			lineHeight:0,
	        animate:false,
	        tipText: '',
			startX: '',
	        endX: '',
	        startY: '',
	        endY: '',
	        moveDistance: 0,
		}
	},
	mounted(){
		this.bindTouchEvent();
	},
	methods:{
		bindTouchEvent(){ 
		  this.$el.addEventListener('touchstart', this._touchStart);         
		  this.$el.addEventListener('touchmove', this._touchMove);         
		  this.$el.addEventListener('touchend', this._touchEnd);   
		},
		_touchStart(e){
			this.animate = false;
			let touch = e.changedTouches[0];
	        this.tipText = '下拉刷新';
	        this.startX = touch.clientX;
	        this.startY = touch.clientY;
		},
		_touchMove(e){         
			let touch = e.changedTouches[0]; 
	        // 获取下拉的距离
			let move = touch.clientY - this.startY;
	         //这里主要是让内容区随着下拉操作而往下滚动 
	         //_move>0是指往下滑动(下拉),_move<100是给一个上限,不然一直下拉的话整个内容区就会随着下拉距离一直增大,用户体验不是很好         //这里下拉操作主要是显示出顶上的一层tipText         
			if (move > 0 && move < 100) {           
				//滑动时需禁止页面滚动，否则会导致滑动事件转换为页面滚动事件
				this.$el.style.overflow = "hidden";
				this.$store.commit("setSwiperThreshold",500);
				this.lineHeight = move;           //记录下下拉的距离
				this.moveDistance = move;           
				if (move > 50) {             
					this.tipText = '松开即可刷新';       
				}else{
					this.tipText = "下拉刷新";
				}       
			}
			console.log(this.$store.state.swiperThreshold) 
		},
		_touchEnd(e){        
			let touch = e.changedTouches[0];        
			this.endX = touch.clientX;        
			this.endY = touch.clientY;        
			if (this.moveDistance > 50) {          
				this.tipText = '数据加载中...';
				this.$emit("refresh");
				this.tipText = "加载完毕";
			}
			this.animate = true;
			this.lineHeight = 0;
			//解除禁止页面滚动
			this.$el.style.overflow = "auto";
			this.$store.commit("setSwiperThreshold",0);
			console.log(this.$store.state.swiperThreshold) 
			
			// this.tipText = "";
		},
	}
	
}
</script>

<style rel="stylesheet" scoped>
	.scroll-wrap{
		overflow-y: auto;
	}
	.refresh{
		background: #fafafa;
		overflow: hidden;
	}
	.animate{
		transition: all .5s;
	}
</style>