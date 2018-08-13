<template>
	<div>
		<div class="swiperBox">
			<swiper :options="swiperOption" ref="mySwiper" :class>
				<swiper-slide><img src="../assets/vue.jpg"></swiper-slide>
				<swiper-slide><img src="../assets/vue.jpg"></swiper-slide>
				<swiper-slide><img src="../assets/vue.jpg"></swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
		</div>
	</div>
</template>
<script>
	import {swiper, swiperSlide} from 'vue-awesome-swiper';
	export default {
		components: {
			swiper,
			swiperSlide
		},
		data() {
			return {
				swiperOption: {
					notNextTick: true,
					pagination: {
						el: '.swiper-pagination'
					},
					loop: true,
					disableOnInteraction: true,
					autoplay: 2000,
					slidesPerView: 'auto',
					centeredSlides: true,
					paginationClickable: true,
					spaceBetween: 30,
					onSlideChangeEnd: swiper =>{
						this.page = swiper.realIndex+1;
						this.index = swiper.realIndex;
					}
				}
			}
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper;
			}
		},
		mounted () {
			let that = this;
			this.swiper.slideTo(0,0,false);
			setInterval(function(){
				that.swiper.slideNext()
			},2000)
		}
	}
</script>

<style lang="css" scoped>
	.swiperBox {
		padding-top: 33px;
	}

</style>