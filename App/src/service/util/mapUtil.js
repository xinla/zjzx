var mapUtil = {};

mapUtil.getPosition = function(call) {
	if(window.plus) {
		plus.geolocation.getCurrentPosition(function(p) {

			console.log(JSON.stringify(p));

			var position = {};

			position.publishaddresses = p.addresses;
			position.latitude = p.coords.latitude;
			position.longitude = p.coords.longitude;
			position.publishprovince = p.addresses.province;
			position.publishcity = p.addresses.city;
			position.publisharea = p.addresses.district;
			position.publishstreet = p.address.street;
			position.streetnum = p.address.streetNum;
			position.poiname = p.address.poiName;
			position.citycode = p.address.cityCode;
			if(call) {
				call(position);
			}

		}, function(e) {
			console.log("获取定位位置信息失败：" + e.message);
		}, {
			geocode: true
		});
		return;
	}
	
	var position = {"publishprovince":"安徽省",publishcity:"池州市",publisharea:"贵池区",streetnum:"长江中路","publishaddresses":"安徽省池州市贵池区长江中路靠近中国银行(池州沿江支行)","latitude":30.663549,"longitude":117.482321,"publishstreet":"长江中路","streetnum":"30号","poiname":"中国银行(池州沿江支行)","citycode":"0566"};
	call(position);
	

}

export default mapUtil