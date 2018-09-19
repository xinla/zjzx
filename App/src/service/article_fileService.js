import config from '@/lib/config/config'
import axios from 'axios'
import commonUtil from '@/service/util/commonUtil'
const controller =config.successServer+'/article_file';
const service ={}

// 根据文章id获取附件信息
service.getFileByArticle = function(articleid,call){
	let params = {
		articleid,
	}
	if (call) {
		commonUtil.ajax(controller+'/getFileByArticle',params,call);
		return;
	}
	let resArticleFile = commonUtil.ajaxAsync(controller+'/getFileByArticle',params);

	return resArticleFile;
}

export default service
