<template>
	<div class="inputArea" v-show="show">
		<transition name="fade">
			<div class="mask" @click="cancel"></div>
		</transition>
		<transition name="slide-fade">
			<div class="area">
				<div class="areaBox">
					<textarea :placeholder="placeholder" :maxlength="maxlength" @input="descArea" v-model.trim="desc" ref="desc"  autofocus>{{desc}}</textarea>
					<span class="num" :class="{colorChange:colorChange}">{{this.maxlength - this.desc.length}}</span>
				</div>
				<div class="areaTip clearfix">
					<span class="explain fl">{{explain}}</span>
					<button type="button" class="areaBtn fr" :class="{btnChange:btnChange}" @click="send">确定</button>
				</div>
			</div>
		</transition>
		<!-- " -->
	</div>
</template>

<script>
	export default {
		data(){
			return {
				desc:'',
				colorChange:false,
				btnChange:false,
				show:false,

			}
		},
		props:["explain", "placeholder", "maxlength"],
		watch:{
			desc(val){
				this.$emit('userNameFn',val);
			}
		},
		methods:{
			descArea(){
				let cont = this.maxlength - this.desc.length;
				if(cont >= this.maxlength) {
					this.colorChange = false;
					this.btnChange = false;
				}else{
					this.colorChange = true;
					this.btnChange = true;
				}
			},
			cancel() {
				this.$emit('handleCancel');
				document.addEventListener('touchmove',function(event) {
					window.event.returnValue = true;
				},{passive:true});
				this.show = false;
			},
			send(){
				this.$emit('handleSend',this.desc);
				document.addEventListener('touchmove',function(event){
					window.event.returnValue = true;
				},{passive:true});
				this.show = false;
			},
		}
	}
</script>
<style scoped>
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
		animation: slideInD .6s;
	}
	.areaBox {
		position: relative;
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
	.areaBox span {
		position: absolute;
		bottom: 10px;
		right: 10px;
		color: #999;
	}
	.areaTip {
		/*padding: 10px 0;*/
		height: 50px;
		line-height: 50px;
	}
	.explain {
		color: #999;
	}
	.areaBtn {
		width: 80px;
		height: 40px;
		margin-top: 5px;
		border-radius: 12px;
		background-color: #cacaca;
		color: #fff;
		 pointer-events: none;
	}

	.areaBox .colorChange{
		color: #333;
	}
	.area .btnChange {
		color: #fff;
		background-color: #ec414d;
		 pointer-events: auto;
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
