'use strict';
 (function (doc, win) {
          var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth,
                    bafontSize=200;
                if (!clientWidth) return;
                if (clientWidth >= 640) {
                    bafontSize = 100;
                } else {
                    bafontSize = 100 * (clientWidth / 640);
                }
                let aa=function(normal, baseFontSize, fontscale){
                  const _baseFontSize = baseFontSize || 100;
                  const _fontscale = fontscale || 1;

                  const ua = navigator.userAgent;
                  const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
                  const UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
                  const isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
                  const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
                  let dpr = win.devicePixelRatio || 1;
                  if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
                    // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
                    dpr = 1;
                  }
                  let scales = normal ? 1 : 1 / dpr;

                  let metaEl = doc.querySelector('meta[name="viewport"]');
                  if (!metaEl) {
                    metaEl = doc.createElement('meta');
                    metaEl.setAttribute('name', 'viewport');
                    doc.head.appendChild(metaEl);
                  }
                   metaEl.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${scales},maximum-scale=${scales},minimum-scale=${scales}`);
                   doc.documentElement.style.fontSize = normal ? '50px' : `${_baseFontSize / 2 * dpr * _fontscale}px`;
                };
                aa(false, bafontSize, 1);
            };
          if (!doc.addEventListener) return;
          win.addEventListener(resizeEvt, recalc, false);
          doc.addEventListener('DOMContentLoaded', recalc, false);
      })(document, window);
