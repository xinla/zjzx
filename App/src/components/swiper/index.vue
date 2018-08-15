<template>
	<div class="swiper-box">
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item,index) in list">
					<keep-alive>
						<component :is="item.component"></component>
					</keep-alive>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import one from '@/components/news/one'
	import two from '@/components/news/two'
	import three from '@/components/news/three'
	import four from '@/components/news/four'
	import five from '@/components/news/five'
	import six from '@/components/news/six'
	import seven from '@/components/news/seven'
	import eight from '@/components/news/eight'
	import '@/assets/css/swiper.css'
	import Swiper from 'swiper'

	export default {
		components: {
			one,two,three,four,five,six,seven,eight
		},
		data() {
			return {
				list: [
					{path:'/one',component:one},
					{path:'/two',component:two},
					{path:'/three',component:three},
					{path:'/four',component:four},
					{path:'/five',component:five},
					{path:'/six',component:six},
					{path:'/seven',component:seven},
					{path:'/eight',component:eight},
				]
			}
		},
		mounted() {
			let mySwiper = new Swiper(".swiper-container",{
				//设定初始化时slide的索引
				initialSlide: this.$route.oath === '/one' ? 0 : this.$route.path === '/two' ? 1 : this.$route.path === '/three' ? 2 : this.$route.path === '/four' ?3 : this.$route.path === '/five' ? 4 : this.$route.path ==='/six' ? 5 : this.$route.path === '/seven' ? 6 : this.$route.path === 'eight' ? 7 : 0
			});
			mySwiper.on('slideChange', () =>{
				//左右滑动时将当前slide的索引发送到nav组件
				this.$root.eventHub.$emit('slideTab', mySwiper.activeIndex);
			});
			
			//接收nav组件传过来的导航按钮索引值，跳转到相应内容区
			this.$root.eventHub.$on('changeTab', (index) =>{
				mySwiper.slideTo(index, 0, false);
			});
			console.log(mySwiper);
		}
	}
</script>
<style>
	div{
		font-size: 0.14rem;
	}
	.swiper-box{
		background-color: #fff;
	}
</style>