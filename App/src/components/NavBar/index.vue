<template>
	<div class="nav">
		<ul class="nav-list">
			<li class="item" v-for="(item,index) in navList" :class="{'active': nowIndex===index}">
				{{item.title}}
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				navList: [
					{title: "头条"},
					{title: "推荐"},
					{title: "财经"},
					{title: "寻人"},
					{title: "娱乐"},
					{title: "体育"},
					{title: "军事"},
					{title: "教育"},
				],
				nowIndex:0
			}
		}
	}
</script>

<style lang="css" scoped>
	.nav {
		margin-top: 0.88rem;
		font-size: 0.28rem;
		height: 0.66rem;
	}
	.nav-list {
		width: 100%;
		overflow: hidden;
	}
	.item {
		width: 20%;
		height: 0.66rem;
		line-height: 0.66rem;
		display: inline-block;
		text-align: center;

	}
</style>