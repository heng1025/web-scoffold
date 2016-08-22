// 获取url后面的参数
function fnGetRequest() {
  var url = window.location.href; //  location.search; //获取url中"?"符后的字串  
  var theRequest = {};
  if (url.indexOf("?") != -1) {
    var str = url.substr(url.indexOf("?") + 1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}

// window.location.search直接是?后面的参数
var getSearchValue = function (key) {
  var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i"),
      r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return r[2];
  }
  return null;
}

/* 使用rem加载的脚本*/
(function () {
    document.addEventListener('DOMContentLoaded', function () {
      var html = document.documentElement;
      var windowWidth = html.clientWidth;
      html.style.fontSize = windowWidth / 7.5 + 'px';
    }, false);
  })();
