<template>
	<div class="nav">
		<div class="empty">		
		</div>
		<ul class="nav-list al">
			<li class="nav-item ac">
				<span>推荐</span>
			</li><li v-for="(item,index) in classfyList" class="nav-item ac">
				<span>{{item.classifyname}}</span>
			</li>
		</ul>
		<router-link to="/topBarBox">
			<div class="add-nav">
				<i class="iconfont">&#xe800;</i>
			</div>
		</router-link>
	</div>
</template>
<script>
import articleClassifyService from '@/service/article_classifyService'
	export default {
		data() {
			return {
		        classfyList:[],
			}
		},
		mounted(){
			articleClassifyService.getArticleClassifyList(data=>{
				if (data && data.status == "success") {
					this.classfyList = data.result.classfyList;					
				}
			});
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
	}
	.nav-list {
		overflow-x: auto;
		white-space: nowrap;
	    border-bottom: 1px solid #ddd;
	    background: #eee;
	    width: calc(100% - 3em);
	}
	.nav-item {
	    display: inline-block;
	    width: 3.5em;
	    height: 2.5em;
	    line-height: 2.5em;
	}
	.nav-item span{
	    font-size:1.2em;
	    vertical-align: sub;
	}
	::-webkit-scrollbar {
	    display: none;
	}
	.add-nav {
		position: absolute;
		right: 0;
		top: 3.5em;
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