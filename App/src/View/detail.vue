<template>
	<div >
		<top></top>
		<section class="content-wrap">
			<h1>各界都我届时将佛哦哦件拼接色哦你</h1>
			<div>
				<img src="" alt="" class="uphoto">
				<div class="publisher">
					
				</div>
				<button type="button" class="focus">关注</button>
			</div>
			<div class="content">
				
			</div>
			<div class="key-wrap">
				关键词：<span class="key"></span>
			</div>
			<div>
				<button type="button" class="btn-a"><i class="iconfont"></i>66</button>
			</div>
		</section>
	</div>
</template>

<script>
import top from '../components/common/top'
export default {
	components:{
		top,
	},
	data(){
		return {
			article:{
				uImg:"http://img.zcool.cn/community/0195be57cd70d90000012e7eb0dae8.jpg@1280w_1l_2o_100sh.jpg",
				uName:"小白读财经",
				time:'2018-8-14',
				sort:"财经",
				content:`小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经
				小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经

				小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经小白读财经`,
				keywoeds:['银行',"财经"],
				like:"100",
				commentNum:'66',
				comment:[{
					uName:'馨心',
					uImg:'http://img.zcool.cn/community/0195be57cd70d90000012e7eb0dae8.jpg@1280w_1l_2o_100sh.jpg',
					content:'评论评论评论评论评论评论评论评论评论评论评论',
					time:'2018-8-14',
					link:'10'
				},
				{
					uName:'xing',
					uImg:'http://img.zcool.cn/community/0195be57cd70d90000012e7eb0dae8.jpg@1280w_1l_2o_100sh.jpg',
					content:'评论评论评论评论评论评论评论评论评论评论评论',
					time:'2018-8-14',
					link:'10'
				},{
					uName:'辛幸',
					uImg:'http://img.zcool.cn/community/0195be57cd70d90000012e7eb0dae8.jpg@1280w_1l_2o_100sh.jpg',
					content:'评论评论评论评论评论评论评论评论评论评论评论',
					time:'3小时前',
					link:'10'
				}]
			}
		}
	}
}
</script>

<style scoped>
</style>