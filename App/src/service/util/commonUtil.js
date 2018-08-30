

const util ={
	// test: controller+'/test'
}


util.ajaxAsync = function(url,params){
	var res = null;

	$.ajax({
		url: url,
		type: 'post',
		dataType: 'json',
		data: params,
		async:false,
		success:function(data){
			res = data;
		}
	})
	
	return res;

}


export default util


