<template>
	<div class="level">
		<div class="level-header">
			<div class="level-top">
				<div class="level-bg">
					<img src="@/assets/images/header.jpeg">
					<h4 class="level-name">真相官方</h4>
				</div>
			</div>
		</div>
		<div class="level-mine level-list" style="margin-top: 0; padding-bottom: 0;">
			<table class="level-tab">
				<tbody>
					<tr>
						<td>
							<div class="level-num-img"><span class="level-num">66</span></div>
						</td>
						<td>
							<div class="level-user">
								<div class="level-img">
									<img src="@/assets/images/vue.jpg" class="level-userPhoto level-user-item">
								</div>
								<div class="level-desc">
									<h5>夏Alex</h5>
									<span>爱心值：66</span>
								</div>
							</div>
						</td>
						<td>爱心楷模</td>
						<td><i class="iconfont icon-shangsheng" ></i></td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="level-list">
			<table class="level-tab">
				<thead>
					<tr>
						<th>排名</th>
						<th>用户</th>
						<th>称号</th>
						<th>综合指数</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<div class="level-num-img"><img src="@/assets/images/no-1.png"></div>
						</td>
						<td>
							<div class="level-user">
								<div class="level-img level-img1">
									<img src="@/assets/images/login-header.png" class="level-userPhoto">
								</div>
								<div class="level-desc">
									<h5>Deepbooty</h5>
									<span>爱心值：1000</span>
								</div>
							</div>
						</td>
						<td>首善</td>
						<td><i class="iconfont icon-shangsheng"></i></td>
					</tr>
					<tr>
						<td>
							<div class="level-num-img"><img src="@/assets/images/no-2.png"></div>
						</td>
						<td>
							<div class="level-user">
								<div class="level-img level-img2">
									<img src="@/assets/images/login-header.png" class="level-userPhoto">
								</div>
								<div class="level-desc">
									<h5>Deepbooty</h5>
									<span>爱心值：1000</span>
								</div>
							</div>
						</td>
						<td>爱心天使</td>
						<td><i class="iconfont icon-xiajiang"></i></td>
					</tr>
					<tr>
						<td>
							<div class="level-num-img"><img src="@/assets/images/no-3.png"></div>
						</td>
						<td>
							<div class="level-user">
								<div class="level-img level-img3">
									<img src="@/assets/images/login-header.png" class="level-userPhoto">
								</div>
								<div class="level-desc">
									<h5>Deepbooty</h5>
									<span>爱心值：1000</span>
								</div>
							</div>
						</td>
						<td>爱心大使</td>
						<td><i class="iconfont icon-icon--"></i></td>
					</tr>
					<tr v-for="(item, index) in tabList">
						<td>
							<div class="level-num-img"><span class="level-num">{{item.id}}</span></div>
						</td>
						<td>
							<div class="level-user">
								<div class="level-img">
									<img :src="item.userImg" class="level-userPhoto level-user-item">
								</div>
								<div class="level-desc">
									<h5>{{item.username}}</h5>
									<span>爱心值：{{item.userLove}}</span>
								</div>
							</div>
						</td>
						<td>{{item.userTitle}}</td>
						<td><i class="iconfont" :class="item.icon"></i></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return {
			tabList:[
				{
					id:4,
					userImg:require('@/assets/images/userPhoto.jpg'),
					username:'Deepbooty',
					userLove:1000,
					userTitle:'慈善家',
					icon:'icon-shangsheng'

				},
				{
					id:5,
					userImg:require('@/assets/images/userPhoto.jpg'),
					username:'Deepbooty',
					userLove:1000,
					userTitle:'慈善家',
					icon:'icon-icon--'

				},
				{
					id:6,
					userImg:require('@/assets/images/userPhoto.jpg'),
					username:'Deepbooty',
					userLove:1000,
					userTitle:'慈善大使',
					icon:'icon-shangsheng'

				},
				{
					id:7,
					userImg:require('@/assets/images/userPhoto.jpg'),
					username:'Deepbooty',
					userLove:1000,
					userTitle:'慈善大使',
					icon:'icon-xiajiang'

				},
				{
					id:8,
					userImg:require('@/assets/images/userPhoto.jpg'),
					username:'Deepbooty',
					userLove:1000,
					userTitle:'慈善大使',
					icon:'icon-icon--'

				},
				{
					id:9,
					userImg:require('@/assets/images/userPhoto.jpg'),
					username:'Deepbooty',
					userLove:1000,
					userTitle:'慈善楷模',
					icon:'icon-xiajiang'

				},
				{
					id:10,
					userImg:require('@/assets/images/userPhoto.jpg'),
					username:'Deepbooty',
					userLove:1000,
					userTitle:'慈善楷模',
					icon:'icon-xiajiang'

				},
				{
					id:11,
					userImg:require('@/assets/images/userPhoto.jpg'),
					username:'Deepbooty',
					userLove:1000,
					userTitle:'慈善之星',
					icon:'icon-icon--'

				},
			]
		}
	}
}	
</script>

<style lang="less" scoped>
	.level{
		height: calc(100vh - .87rem);
		overflow: hidden;
		overflow-y: auto;
		// background-color: #fff;
		.level-header{
			width: 100%;
			height: 3.2126rem;
			background-image: url('../../assets/images/level-bg.png');
			background-position: 0 0;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			.level-top{
				display: flex;
				justify-content: center;
				padding-top: 5%;
				.level-bg{
					width: 2.175rem;
					height: 1.9rem;
					position: relative;
					background-image: url('../../assets/images/topBg.png');
					background-position: 0 0;
					background-size: 100% 100%;
					img{
						display: block;
						width: 1.305rem;
						height: 1.305rem;
						position: absolute;
						left: .44rem;
						top: .35rem;
						border-radius: 50%;
						object-fit: cover;
						border: .04rem solid #ffcb42;
					}
					.level-name{
						position: absolute;
						left: .5rem;
						bottom: -.6rem;
						font-size: .3rem;
						letter-spacing: .02rem;
						color: #fff;
					}
				}
			}
		}
		.level-list{
			background: #fff;
			margin-top: .5rem;
			padding-bottom: .3rem;
			.level-tab{
				width: 100%;
				padding: 0 .2rem;
				border-top: .02rem solid @borderColor;
				border-bottom: .02rem solid @borderColor;
				font-size: .24rem;
				thead{
					tr{
						height: 1rem;
						background-color: #fff;
						th{
							font-weight: 700;
							letter-spacing: .02rem;
							text-align: center;
							color: #10aeff;
						}
					}
				}
				tbody{
					tr{
						border-bottom: .02rem solid @borderColor;
						text-align: center;
						td{
							padding: .2rem 0;
							text-align: center;
							.level-num-img{
								display: inline-block;
								width: .56rem;
								height: .79rem;
								img{
									display: inline-block;
									width: 80%;
									text-align: center;
								}
								span{
									line-height: .79rem;
									font-size: .28rem;
									color: #777;
								}
							}
							.level-user{
								display: flex;
								align-items: center;
								justify-content: center;
								.level-img{
									position: relative;
									width: 1.22rem;
									height: .97rem;
									margin-right: .2rem;
									border-radius: 50%;
									background-position: 0 0;
									background-size: 100% 100%;
									.level-userPhoto{
										position: absolute;
										display: block;
										top: -.05rem;
										left: .19rem;
										width: .85rem;
										height: .85rem;
										border-radius: 50%;
										border: .04rem solid #ffcb42;
									}
									.level-user-item{
										top: 0;
										left: .06rem;
										width: 1rem;
										height: 1rem;
									}
								}

								.level-img1{background-image: url('../../assets/images/1.png')}
								.level-img2{background-image: url('../../assets/images/2.png')}
								.level-img3{background-image: url('../../assets/images/3.png')}
								.level-desc{
									h5{
										width:1.1rem;
										max-width: 1.1rem;
										font-size: .3rem;
										overflow:hidden;
										text-overflow: ellipsis;
										white-space: nowrap; 
										text-align: left;
										padding-bottom: .2rem;
									}
									span{
										color: #999;
									}
								}
							}
							.icon-shangsheng{
								color:#12bd12;
							}
							.icon-xiajiang{
								color: #f23f40;
							}
							.icon-icon--{
								color: #999;
							}
						}
					}
				}
			}
		}
	}
	
</style>