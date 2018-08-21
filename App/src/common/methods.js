const tool = {
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
    let newMobile = num.replace(/[^0-9]/g, '');
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
    let newBank = num.replace(/[^0-9]/g, '');
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
  }
}

export default {
  install(Vue) {
    Vue.prototype.$TooL = tool;
  }
}
