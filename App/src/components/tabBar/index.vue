<template>
	<div class="nav">
		<div class="empty">		
		</div>
		<ul class="nav-list">
			<li v-for="(item,index) in navList" class="nav-item">
				{{item.title}}
			</li>
		</ul>
		<div class="add-nav">
			<i class="iconfont">&#xe800;</i>
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
	.empty{
		height: 3.5em;
	}
	.nav {
		width: 100%;
		overflow: hidden;	
		text-align: center;
		position: fixed;
		left: 0;
		z-index: 99;
		background-color: #fff;
	}
	.nav-list {
		overflow-x: auto;
		white-space: nowrap;
	    border-bottom: 1px solid #ddd;
	    background: #eee;
	}
	.nav-item {
	    display: inline-block;
	    width: 3em;
	    line-height: 2.5em;
	}
	::-webkit-scrollbar {
	    display: none;
	}
	.add-nav {
		position: absolute;
		right: 0;
		top: 3.4em;
		width: 3em;
		line-height: 2.5em;
		text-align: center;
		background-color: #fff;
		box-shadow:-.28em 0px 1em #cccccc;
	}
	.add-nav i {
		display: inline-block;
		vertical-align: top;
		font-size: 1.5em;
		color: #ec414d;
	}
</style>