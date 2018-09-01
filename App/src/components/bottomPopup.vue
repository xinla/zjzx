<template>
	<div class="bottomPopup" v-show="show">
		<div class="mask" @click="cancel"></div>
		<div class="popup">
			<ul>
				<li v-for="(item,index) in list" @click="clickfn(item)" v-text="item"></li>
			</ul>
			<button type="button" @click="cancel">取消</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return{
				show:false,
			}
		},
		props:['list'],
		methods:{
			cancel(){
				this.$emit('handleCancel');
				document.addEventListener('touchmove', function(event) {
					window.event.returnValue = true;
				},{passive:true});
				this.show=false;

			},
			clickfn(item){
				this.$emit('handleSex',item);
				this.cancel();

			}
		}
	}
</script>

<style>
	.bottomPopup{
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
		width: 100%;
		height: 100%;
	}

	.bottomPopup .mask {
		position: absolute;
		display: block;
		width: 100%;
		height: 100%;
		z-index: 0;
		background-color: rgba(0,0,0,.4);
	}

	.bottomPopup .popup {
		position: absolute;
		bottom: 16px;
		left: 0;
		right: 0;
		width: 90vw;
		margin: 0 auto;
		animation: slideInD .6s;
		z-index: 99;
	}

	.bottomPopup .popup ul{
		border-radius: 12px;
		background-color: #fff;
		overflow: hidden;
		margin-bottom: 16px;
	}
	.bottomPopup .popup ul li{
		width: 100%;
		height: 54px;
		background-color: #ffffff;
		box-shadow: inset 0 -1px 0 0 #ebebeb;
		font-size: 18px;
		font-weight: 500;
		line-height: 54px;
		text-align: center;
		color: #008CFF;
		position: relative;
	}
	.bottomPopup .popup ul li:active{
    	background-color: #f9f9f9;
  	}
 	.bottomPopup .popup button{
	    width: 100%;
	    height: 54px;
	    border-radius: 12px;
	    background-color: #ffffff;
	    font-size: 18px;
	    font-weight: 500;
	    color: #6b6b6b;
  	}
  @keyframes slideInD {
    from{
      transform: translate(0,100%);
    }
    to{
      transform: translate(0,0);
    }
  }
</style>