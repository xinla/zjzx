export default {
	api: {
		url: {
			protocol:'http://',
			host:'192.168.2.102',
			port:8080,
			basePath:'/zjzx/'
		},
		articlePub:'article/publishArticle',	//文章发布
		articleReviews:'article_comment/articleComment',	//文章评论
		articlePage:'article/articlePage',	//文章列表
		getArticleById:'article/getArticleById',	//文章详情
		getArticleCommentPage:'article_comment/getArticleCommentPage',	//获取评论列表
		getReplyCount:'article_comment/getReplyCount',	//获取回复数量
		getReplyList:'article_comment/getReplyList',	//获取回复列表
		getArticleTypeMap:'article_type/getArticleTypeMap',	//获取文章类型字典
		getArticleClassifyMap:'article_classify/getArticleClassifyMap',	//获取文章分类字典
		articleCollect:'article_collect/articleCollect',	//文章收藏
		getCollectArticlePage:'article/getCollectArticlePage',	//获取收藏的文章列表
		getArticleCommentCount:'article_comment/getArticleCommentCount',	//获取文章评论数量
		loginByMobile:'user/loginByMobile',	//用户登录（手机号登录）
		getCode:'user/getCode',	//获取验证码
		uploadPic:'file/uploadPic',	//文件上传（图片上传）
		uploadHeadImage:'file/uploadHeadImage',	//文件上传（头像上传）
		uploadVideo:'file/uploadVideo',	//文件上传（视屏上传）
		updateUser:'user/updateUser',	//更新用户
		getProvinceList:'province/getProvinceList',	//获取省份
		getProvinceDic:'province/ getProvinceDic',	//获取省份字典
		getCityByProvince:'city/getCityByProvince',	//根据省份编号获取城市
		getCityDic:'city/getCityDic',	//获取城市数据字典
		getAreaByCity:'area/getAreaByCity',	//根据城市编号获取区域信息
		getAreaDic:'area/getAreaDic',	//获取区域数据字典
		logOut:'user/logOut',	//用户退出
		addReadHistory:'readhistory/addReadHistory',	//添加阅读记录 
		doFollow:'follow/doFollow',	//关注/取消关注
		getUserVermicelli:'user/getUserVermicelli',	//获取用户的粉丝
		getUserFollow:'user/getUserFollow',	//获取用户的关注
		getArticleByUser:'article/getArticleByUser',	//获取用户的文章
		getArticleByUser:'article/getArticleByUser',	//获取用户的视频
		getArticleByUser:'article/getArticleByUser',	//获取用户的文章和视频
		getUserById:'user/getUserById',	//获取用户的id获取用户信息
	}
};