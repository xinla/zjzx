'use strict';
//@normal：是否采用高清
//@baseFontSize：字体基值
//@fontscale：是否应用字体放大
 (function (doc, win) {
          var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {

                var clientWidth = Math.min( win.innerWidth , docEl.clientWidth ),
                    bafontSize=200,
                    dpr = win.devicePixelRatio || 1,
                    isInt = dpr.toString().match(/^[1-9]\d$/);
                if (!isInt) {
                  dpr  = Math.floor(dpr);
                }
                if (!clientWidth) return;
                if (dpr == 1) {
                  if (clientWidth >= 750) {
                      bafontSize = 100;
                  } else {
                      bafontSize = 100 * (clientWidth / 750);
                  }                 
                } else if (dpr == 2) {
                  if (clientWidth >= 1500) {
                      bafontSize = 100;
                  } else {
                      bafontSize = 100 * (clientWidth / 1500);
                  }
                } else if (dpr == 3) {
                  if (clientWidth >= 2250) {
                      bafontSize = 100;
                  } else {
                      bafontSize = 100 * (clientWidth / 2250);
                  }
                }
                let aa = function(normal, baseFontSize, fontscale){
                  var _baseFontSize = baseFontSize || 100;
                  var _fontscale = fontscale || 1;
                  var ua = navigator.userAgent;
                  var matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
                  var UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
                  var isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
                  var isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
                  if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
                    // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
                    dpr = 1;
                  }
                  let scales = normal ? 1 : 1 / dpr;
                  let metaEl = doc.querySelector('meta[name="viewport"]');
                  docEl.setAttribute('data-dpr',dpr);
                  if (!metaEl) {
                    metaEl = doc.createElement('meta');
                    metaEl.setAttribute('name', 'viewport');
                    doc.head.appendChild(metaEl);
                  }
                   metaEl.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${scales},maximum-scale=${scales},minimum-scale=${scales}`);
                   doc.documentElement.style.fontSize = normal ? '100px' : `${_baseFontSize  * dpr * _fontscale}px`;
                };
                aa(false, bafontSize, 1);
            };
          if (!doc.addEventListener) return;
          win.addEventListener(resizeEvt, recalc, false);
          doc.addEventListener('DOMContentLoaded', recalc, false);
      })(document, window);
