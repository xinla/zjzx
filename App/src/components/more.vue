<template>
	<div class="more-wrapper">
		<!-- <div class="mask"></div> -->
		<div class="more-container">
			
			<div class="more-content">
				<div class="more-content-item">
					<div class="more-content-title clearfix">
						<div class="title fl">
							<h4>我的频道</h4>
							<span>点击进入频道</span>
						</div>
						<button class="more-button fr" @click="handleEdit">{{editText}}</button>
					</div>
					<ul class="more-list clearfix">
						<li class="more-item">关注</li>
						<li class="more-item" v-for="(item,index) in newList" :key="item.classifycode">
							{{item.classifyname}}
							<i class="iconfont remove-icon" v-show="removeShow">&#xe68c;</i>
						</li>
					</ul>
				</div>
				<div class="more-content-item">
					<div class="more-content-title">
						<div class="title">
							<h4>频道推荐</h4>
							<span>点击添加频道</span>
						</div>
					</div>
					<ul class="more-list clearfix">
						<li class="more-item more-add-item" v-for="(item,index) in newList" :key="item.classifycode">
							<i class="iconfont add-icon">&#xe603;</i>
							{{item.classifyname}}		
						</li>
					</ul>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		name:'homeMore',
		props:{
		},
		data() {
			return{
				removeShow:false,
				editText:'编辑',
				newList:[
					{classifycode:1, classifyname:'视频'},
					{classifycode:2, classifyname:'热点'},
					{classifycode:3, classifyname:'社会'},
					{classifycode:4, classifyname:'娱乐'},
					{classifycode:5, classifyname:'军事'},
					{classifycode:6, classifyname:'科技'},
					{classifycode:7, classifyname:'汽车'},
					{classifycode:8, classifyname:'体育'},
					{classifycode:9, classifyname:'财经'},
					{classifycode:10, classifyname:'国际'},
					{classifycode:11, classifyname:'时尚'},
					{classifycode:12, classifyname:'游戏'},
					{classifycode:13, classifyname:'旅游'},
					{classifycode:15, classifyname:'历史'},
					{classifycode:16, classifyname:'历史'},
					{classifycode:17, classifyname:'历史'},
					{classifycode:18, classifyname:'历史'},
					{classifycode:19, classifyname:'历史'},
					{classifycode:20, classifyname:'历史'},
					{classifycode:21, classifyname:'历史'},
					{classifycode:22, classifyname:'历史'},
					{classifycode:23, classifyname:'历史'}
				]
			}
		},
		methods:{
			handleEdit(){
				this.removeShow = !this.removeShow;
				if(this.removeShow == false) {
					this.editText = "编辑";
				}else{
					this.editText = "成功";
				}
			},
		}
	}
</script>
<style lang="less" scoped>
	.more-container {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		.more-content {
			margin-top: .87rem;
			padding: 0 .3rem;
			height: calc(100vh - .87rem);
			overflow-x: hidden;
			background-color: #fff;
			.more-content-title{
				height: .7rem;
				line-height: .7rem;
				h4{
					display: inline-block;
					font-weight: normal;
					font-size: .3rem;
					margin-right: .22rem;
				}
				span{
					font-size: .2rem;
					color: #999;
				}
				.more-button {
					background-color: #fff;
					padding: .06rem .19rem;
					border: .02rem solid @mainColor;
					margin-top: .06rem;
					color:@mainColor;
					border-radius: .28rem;
				}
			}
			.more-list {
				width: 100%;
				padding: .16rem 0;
				.more-item {
					position: relative;
					float: left;
					width: 22%;
					margin-right: 4%;
					margin-bottom: 4%;
					height: .8rem;
					line-height: .8rem;
					text-align: center;
					border-radius: .18rem;
					background-color: #f4f5f6;
					white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
					&:nth-child(4n){
						margin-right: 0;
					}
					&:first-child{
						color: #999;
					}
					.remove-icon {
						position: absolute;
						top: 0;
						right: 0;
						width: .36rem;
						height: .36rem;
						line-height: .36rem;
						border-radius: 50%;
						font-size: .24rem;
						background-color: #cacaca;
						color: #fff;
					}
				}
				.more-add-item{
					background-color: #fff;
					box-shadow: 0 -.01rem .04rem .04rem #f1f1f1;
					.add-icon {
						color: #000;
					}

				}
			}
		}
	}

</style>