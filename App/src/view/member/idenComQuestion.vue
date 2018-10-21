<template>
	<table class="qa">
		<template v-for="(item,index) of qaList">
				<tr class="qa-list" @click="showAnswer(index)">
					<td class="qa-left">
						Q：
					</td>
					<td class="q">
						{{item.q}} 
						<transition name="dowm-up">
							<i class="iconfont fr icon-down" v-if="index==which?toggle:0"></i>
							<i class="iconfont fr icon-up" v-else></i>							
						</transition>
					</td>
				</tr>
				<transition name="qa" mode='out-in'>					
					<tr class="qa-list" v-show="index==which?toggle:0">
						<td class="qa-left">
							A：
						</td>
						<td>{{item.a}}</td>
					</tr>		
				</transition>
		</template>
	</table>
</template>

<script>
export default{
	data(){
		return {
			which:-1,
			toggle:true,
			qaList:[
				{
					q:'常见问题常见问题常见问题常见问题常',
					a:'回答回答回答回答回答回答回答回答回答回答回答回答回答回答',
				},
				{
					q:'常见问题常见问题常见问题常见问题常',
					a:'回答回答回答回答回答回答回答回答回答回答回答回答回答回答',
				},
				{
					q:'常见问题常见问题常见问题常见问题常',
					a:'回答回答回答回答回答回答回答回答回答回答回答回答回答回答',
				},
				{
					q:'常见问题常见问题常见问题常见问题常',
					a:'回答回答回答回答回答回答回答回答回答回答回答回答回答回答',
				},
				{
					q:'常见问题常见问题常见问题常见问题常',
					a:'回答回答回答回答回答回答回答回答回答回答回答回答回答回答',
				},
				{
					q:'常见问题常见问题常见问题常见问题常',
					a:'回答回答回答回答回答回答回答回答回答回答回答回答回答回答',
				},
				{
					q:'常见问题常见问题常见问题常见问题常',
					a:'回答回答回答回答回答回答回答回答回答回答回答回答回答回答',
				},
			]
		}
	},
	methods:{
		showAnswer(index){
			if(this.which!=index){
				this.which=index;
				this.toggle=true;				
			}else{
				this.toggle=!this.toggle
			}
		}
	}
}
</script>

<style rel="stylesheet" scoped>
	.qa{
		display: block;
		padding: 10px;
		background: #fff;
	}
	.qa-list{
		line-height: 20px;
	}
	.qa-left{
		vertical-align: top;
	}
	.q{
		font-weight: 600;
		width: 100%;
	}
	.qa td{
		padding-bottom: 10px;
	}
	.qa-enter-active,.qa-leave-active{
		transition: all .3s ease-in;
	}
	.qa-enter,.qa-leave-to{
		transform:scaleY(0);
		opacity: 0;
	}
	.iconfont{
		color: #ccc;
		font-weight: normal;
	}
	/*.dowm-up-enter-active,.dowm-up-leave-active{
		transition: all 1s;
	}
	.dowm-up-enter,.dowm-up-leave-to{
		transform: rotate(30deg);
	}*/
</style>
