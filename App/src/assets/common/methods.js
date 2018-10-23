const tool = {
  //前往某一个页面
  goPage(p) {
    if(!p.name && !p.path){p.name="home";p.query = p.query || {}};
    if(p.replace) {
      GoTruth.$router.replace({ name: p.name, query: p.query} )
    } else {
      GoTruth.$router.push({ name: p.name, query: p.query })
    }
  },
  //前往当前页面的某一个子页面
  goChildPage(params){
    //正在扫描
    GoTruth.$router.push(
      GoTruth.$router.resolve({
        path:params.path,
        query:params.query,
      },GoTruth.$route,true).location);
  },
  //返回上个页面
  goBack(n) {
    if(n && typeof n === 'number'){
      GoTruth.$router.go(n)
    }else{
      GoTruth.$router.back();
    }
  },
  //是否显示底部导航
  changeTabBar(bool) {
    if(bool) {
      GoTruth.$store.commit('setStateData',{name:'showTabBar',value:true});
    } else {
      GoTruth.$store.commit('setStateData',{name:'showTabBar',value:false});
    }
  },
  //生成唯一id
  generateUUID() {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    return uuid;
  },
  //手机号识别并返回
  isPhoneNumber(num) {
    if (!num) { return false };
    let str = num.toString();
    let val = str.replace(/[^0-9]/ig, "");
    if (val.length !== 11) { return false };
    var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1})|)+\d{8})$/;
    if (!myreg.test(val)) { return false } else { return val }
  },
  //给号码加上空格
  mobileInput(num) {
    if (!num) { return };
    let newMobile = num.toString().replace(/[^0-9]/g, '');
    let str = newMobile.toString()
    let L = str.length;
    let mobile = num;
    if (L <= 3) {
      mobile = newMobile;
    } else if (L > 3 && L <= 7) {
      mobile = str.substring(0, 3) + ' ' + str.substring(3, 7)
    } else if (L > 7 && L <= 11) {
      mobile = str.substring(0, 3) + ' ' + str.substring(3, 7) + ' ' + str.substring(7, 11);
    }
    return mobile;
  },
  //银行卡号加上空格
  BankInput(num) {
    if (!num) { return };
    let newBank = num.toString().replace(/[^0-9]/g, '');
    let str = newBank.toString()
    let L = str.length;
    let bank = num;
    if (L <= 4) {
      bank = newBank;
    } else if (L > 4 && L <= 8) {
      bank = str.substring(0, 4) + ' ' + str.substring(4, 8)
    } else if (L > 8 && L <= 12) {
      bank = str.substring(0, 4) + ' ' + str.substring(4, 8) + ' ' + str.substring(8, 12);
    } else if (L > 12 && L <= 16) {
      bank = str.substring(0, 4) + ' ' + str.substring(4, 8) + ' ' + str.substring(8, 12) + ' ' + str.substring(12, 16);
    } else if (L > 16 && L <= 19) {
      bank = str.substring(0, 4) + ' ' + str.substring(4, 8) + ' ' + str.substring(8, 12) + ' ' + str.substring(12, 16) + ' ' + str.substring(16, 19);
    }
    return bank;
  },
  //base64位转blob
  convertBase64UrlToBlob(urlData) {
    let bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte
    //处理异常,将ascii码小于0的转换为大于0
    let ab = new ArrayBuffer(bytes.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], { type: this.type });
  },
  //修改日期格式
  format(time, format) {
    if (!time) {
      return;
    }
    var t = new Date(time.replace(/\-/g, '/'));
    var tf = function(i) {
      return (i < 10 ? '0' : '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
      switch (a) {
        case 'yyyy':
          return tf(t.getFullYear());
          break;
        case 'MM':
          return tf(t.getMonth() + 1);
          break;
        case 'mm':
          return tf(t.getMinutes());
          break;
        case 'dd':
          return tf(t.getDate());
          break;
        case 'HH':
          return tf(t.getHours());
          break;
        case 'ss':
          return tf(t.getSeconds());
          break;
      }
    })
  },
  //修改图片的裁剪区域
  fitImg(src, w = 160, h = 160) {
    if (!src) { return src };
    src = src.replace(/\?.*$/, '')
    return src + '?t=' + new Date().getTime() + '&x-oss-process=image/resize,m_fill,h_' + h + ',w_' + w;
  },
    /*
  * 获取地理位置
  * 原生端获取
  * 微信端获取
  * 其他浏览器端获取定位
  * */
  getLocation(){
    let system = GoTruth.$store.state.System;
    if(system.isNative){

    }else if(system.isWechat){
      let data = {
        accuracy:65,
        altitude:0,
        errMsg:"getLocation:ok",
        horizontalAccuracy:65,
        latitude:31.8512,
        longitude:117.26061,
        speed:-1,
        verticalAccuracy:65
      }
    }else{
      if (navigator.geolocation) {
       console.log('调用导航器geolocation函数',navigator.geolocation)
        navigator.geolocation.getCurrentPosition(function(position) {
          console.log('position',position.coords.latitude)
        });
      } else {
         GoTruth.$toast.open({msg:'您的浏览器不支持地理定位',type:'err'})
      }
    }
  },
  //输入区内容合法验证
  checkInput(val){
    val = String(val);
    var reg = /[^\w\s\u4e00-\u9fa5\(\)\（\）\-]/g;
    return !reg.test(val); //合法返回true
  },
  // 非法字符替换
  replaceNo(val){
    var reg = /[^\w\s\u4e00-\u9fa5\(\)\（\）\-]/g;
    return String(val).replace(reg,""); //返回替换后合法的字串
  },
  /*发布时间格式化
  @dateString:2018-1-6 15:25:42
  */
  publishTimeFormat(dateString){
    let pubDate = new Date(String(dateString).replace(/-/g,'/')),
        curDate = new Date(),
        pubMillis = pubDate.getTime(),
        pubYear = pubDate.getFullYear(),
        curMillis = curDate.getTime(),
        curYear = curDate.getFullYear(),
        difference = curMillis - pubMillis;
    if (difference < 4.32e+7) { //12小时内
      if (difference < 3.6e+6) { //60分钟内
        if (difference < 60000) { //60秒内
          dateString = "刚刚";
        } else {
          dateString = Math.floor(difference/60000) + "分钟前";          
        }
      } else {
        dateString = Math.floor(difference/3600000) + "小时前";
      }
    }else if (pubYear == curYear) {
      dateString = dateString.substr(5);
    }
    return dateString;
  },
  //图片格式判断
  checkPic(str){
    let reg = /\.(jpg|png|jpeg|gif)$/i;
    str = String(str);
    return reg.test(str);
  },
  //视频格式判断
  checkVideo(str){
    str = String(str);
    let reg = /\.(mp4)$/i;
    return reg.test(str);
  },
  //提取图片
  //@str 图文内容
  //@num 图片最大数量
  extractImg(str,num){
    str = String(str);
    let reg = /<img[^(img)]*src=[\'\"]?([^\'\"]*)[\'\"]?/gi,
        arr = str.match(reg),
        srcList = [];
    if (arr && arr.length) {
      if (arr.length > num) {arr.length = num;}
      arr.forEach((item,index)=>{
        srcList.push(item.replace(/<img.*src=[\'\"]|[\'\"]/ig,""));
      })
    }
    return srcList;     
  },
  // 未登录提示 //
  loginPrompt(back){
    GoTruth.$vux.confirm.show({
      content:"您还没登录哦！",
      onConfirm () {
        GoTruth.$Tool.goPage({name:'login',query:{title:'用户登录'}});
      },
      onCancel () {
        if (back) {
          GoTruth.$Tool.goBack();
        }
      }
    })
  }
}

export default {
  install(Vue) {
    Vue.prototype.$Tool = tool;
  }
}
