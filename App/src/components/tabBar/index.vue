<template>
	<div class="nav">
		<ul class="nav-list">
			<li v-for="(item,index) in navList" class="nav-item">
				{{item.title}}
			</li>
		</ul>
		<div class="add-nav">
			<i class="iconfont icon-add"></i>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				navList :[
					{
						title: '推荐',
					},
					{
						title: '热点',
					},
					{
						title: '社会',
					},
					{
						title: '娱乐',
					},
					{
						title: '科技',
					},
					{
						title: '汽车',
					},
					{
						title: '体育',
					},
					{
						title: '财经',
					},
					{
						title: '军事',
					},
					{
						title: '国际',
					},
					{
						title: '时尚',
					},
					{
						title: '纪实',
					}

				]
			}
		}
	}
</script>

<style lang="css" scoped>
	.nav {
		margin-top: 0.44rem;
		width: 100%;
		overflow: hidden;
		
		text-align: center;
		position: fixed;
		left: 0;
		z-index: 999;
		font-size: 0;
		background-color: #fff;
		white-space: nowrap;
	}
	.nav-list {
		overflow-x: auto;
	}
	.nav-item {
		display: inline-block;
		height: 0.36rem;
		line-height: 0.36rem;
		font-size: 0.16rem;
		width: 0.54rem;
	}
	::-webkit-scrollbar {
	    display: none;
	}
	.add-nav {
		position: absolute;
		right: 0;
		top: 0;
		width: .4rem;
		height: .36rem;
		line-height: .36rem;
		text-align: center;
		background-color: #fff;
		box-shadow:-4px 0px 6px #cccccc;
	}
	.add-nav i {
		font-size: 0.20rem;
		color: #ec414d;
	}
</style>