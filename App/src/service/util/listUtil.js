
	
	var listUtil ={
			/**
			 * 数组拼接
			 * @param mainList  原始数组
			 * @param targetList 被拼接的数组
			 */
			appendList:function(mainList,targetList){
				mainList.push.apply(mainList,targetList);
			},
			/**
			 * 异步设置列表属性
			 * @param array
			 * @param call
			 */
			asyncSetListPropty:function(array,call){
				if(!array || array.size<=0){
					return;
				}
				//setTimeout(function(){
					for(var i=0;i<array.length;i++){
						//call(array[i]);
						excute(call,array[i]);
					}
				//},50);
			},
			/***
			 * 清除数组所有元素
			 */
			emptyList:function(allList){
				allList.splice(0, allList.length);
			},
			/**
			 * 更具数组中对象的某个属性删除
			 * @param list  	目标数组
			 * @param propty    属性名称
			 * @param values    属性值 []
			 */
			deleteByPropty:function(list,propty,values){
				if(!values || values.length<=0){
					return list;
				}
				var newArray =[];
				for(var i =0;i<list.length;i++){
					var item = list[i];
					if($.inArray(item[propty],values)<0){
						newArray.push(item);
					}
				}
				
				return newArray;
			},
			/**
			 * 根据分页大小获取 page
			 * @param list
			 * @param size
			 */
			getPageNumBySize:function(list,size){
				var pageNum = 1;
				if(list.length%size == 0){
					pageNum = list.length/size;
				}else{
					pageNum = (list.length/size)+1;
				}
				pageNum = pageNum<=0?1:pageNum;
				pageNum = parseInt(pageNum);
				
				return pageNum;
			}
			
	};
	
	
	function excute(call,obj){

		setTimeout(function(){

			call(obj)
		},50);
	}
	
export default listUtil;