/*global localStorage, bg, chrome, window, document, console, $, closeWindow, FileReader */

//noinspection JSLint
(function () {
  'use strict';

  var curWin = null;
  var width = window.screen.width;
  var height = window.screen.height;
  var top = 0;
  var left = 0;
  var url = 'https://github.com/stormcrown/chrome-projects';

  function openWxPopup() {
    var isExisted = false;
    var i = 0;
    var j = 0;

    // 查看页面是否已存在
    chrome.windows.getAll(function (windows) {

      for (i = 0; i < windows.length; i += 1) {
        var w = windows[i];

        if (curWin && w.type === 'popup' && w.id === curWin.id) {
          isExisted = true;
          break;
        }
      }

      if (isExisted) {
        chrome.windows.update(curWin.id, {'focused': true});
      } else {
        chrome.windows.create({url: url, type: 'popup', width: width, height: height, top: top, left: left}, function (w) {
          curWin = w;
        });
      }
    });
  }
  chrome.browserAction.onClicked.addListener(openWxPopup);
  chrome.runtime.onInstalled.addListener(function(){
    if (typeof window.localStorage['firstInstalled'] == 'undefined') {
      openWxPopup();

    };
    window.localStorage['firstInstalled'] = 'false';
  });
})();
