<template>
	<div class="about-wrap">
		<div class="about-header">
			<div class="about-logo">
				<img src="@/assets/images/about.png" alt="">
			</div>
			<div class="about-img">
				<img src="@/assets/images/aboutDesc.png" alt="">
			</div>
		</div>
		<div class="about-body">
			<div class="about-desc">
				<p>直击真相是一款为兴趣而生的新一代资讯客户端！通过提供个性化的自定义频道、并以顶尖算法不断学习用户偏好，帮助用户从浩瀚的资讯中抽身而出，每天只读一点你关心的资讯即可！</p>
			</div>
			<dl class="about-list">
				<dt>关注我们</dt>
				<dl>新浪微博： @直击真相</dl>
				<dl>官方网站： www.zhijizhenxiang.com</dl>
				<dl>媒体平台： www.zhijizhenxiang.com</dl>
				<dl>广告合作： www.zhijizhenxiang.com</dl>
				<dl>微信公众号： zhijizhenxiang</dl>
			</dl>
			<dl class="about-list">
				<dt>联系我们</dt>
				<dl>商务合作： bd@yidian-inc.com</dl>
				<dl>使用反馈： bd@yidian-inc.com</dl>
				<dl>举报投诉： bd@yidian-inc.com</dl>
				<dl>本地化合作： bd@yidian-inc.com</dl>
				<dl>商务合作： bd@yidian-inc.com</dl>
				<dl>举报电话： 13666666666</dl>
			</dl>
		</div>
		<div class="about-footer">
			<div class="about-btn">
				<router-link :to="{path:'agreement',query:{title:'直击真相用户协议'}}" tag="button">
					用户协议
				</router-link>
				<router-link :to="{path:'privacy',query:{title:'直击真相隐私条款'}}" tag="button">
					隐私条款
				</router-link>
			</div>
			<p class="about-copyright">Copyright @2018 zjzx.com All Rights Reserved</p>
		</div>
	</div>
</template>

<script>

</script>

<style lang="less" scoped>
	.about-wrap{
		height: calc( 100% - .87rem );
		overflow: hidden;
		overflow-y: auto;
		padding: .4rem .2rem;
		background-color: #fff;
		.about-header {
			text-align: center;
			margin-top: .5rem;
			.about-logo {
				width: 1.5rem;
				height: 1.5rem;
				margin: 0 auto .3rem auto;
			}
			.about-img{
				width: 65%;
				height: .6rem;
				margin: 0 auto;
				img{
					display: block;
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}
		}
		.about-body {
			margin-top: .2rem;
			.about-desc{
				margin-bottom: .2rem;
				padding-bottom: .1rem;

				border-bottom: .02rem solid @borderColor;
				p{
					font-size: .3rem;
					line-height: .5rem;
					color: #4a4a4a;
				}
			}
			.about-list{
				margin-bottom: .3rem;
				dt{
					font-size: .28rem;
					color: #222;
					padding-bottom: .24rem;
				}
				dl{
					font-size: .24rem;
					line-height: .4rem;
					color: #999;
				}
			}
		}
		.about-footer{
			margin-top: .2rem;
			.about-btn{
				text-align: center;
				button{
					display: inline-block;
					padding: .2rem .6rem;
					margin-right: .4rem;
					border-radius: .2rem;
					color: #1674e9;
					border: .02rem solid #1674e9;
					&:last-child{
						margin-right: 0;
					}
				}
			}
			.about-copyright{
				position: relative;
				text-align: center;
				color: #999;
				font-size: .24rem;
				left: 0;
				bottom: 0;
				padding-top: .4rem;
			}
		}
	}
</style>