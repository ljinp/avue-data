

function compare(propertyName) {
  return function (object1, object2) {
    var value1 = object1[propertyName];
    var value2 = object2[propertyName];
    if (value2 < value1) {
      return -1;
    } else if (value2 > value1) {
      return 1;
    } else {
      return 0;
    }
  }
}

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

function getUrlParams(url) {
  let params = {}
  let white = ['id'];
  if (!url) return params;
  if (url.indexOf("?") !== -1) {
    const index = url.indexOf("?");
    url = url.substr(index + 1);
    let list = url.split('&');
    list.forEach(ele => {
      let dic = ele.split('=');
      let label = dic[0];
      let value = dic[1];
      if (white.indexOf(label) === -1) {
        params[label] = value;
      }

    })
  }
  return params
}
function loadJs(url, callback) {
  var script = document.createElement('script');
  script.type = "text/javascript";
  if (typeof (callback) != "undefined") {
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;
          callback();
        }
      }
    } else {
      script.onload = function () {
        var params = getUrlParams(window.location.href);
        config.query = Object.assign((config.query || {}), params);
        callback();
      }
    }
  }
  script.src = url;
  document.body.appendChild(script);
}
function initData(callback) {
  var id = getQueryString('id');
  if (id) {
    loadJs('./data/data' + id + '.js', callback);
  }

  callback();

}

function stringify(json) {
  let count = 0;
  let list = [];
  let str = JSON.stringify(json, function (key, val) {
    if (typeof val === 'function') {
      list.push(val + '');
      const result = '$code{' + count + '}$code'
      count = count + 1;
      return result
    }
    return val;
  }, 2);
  let startCode = '$code{';
  let endCode = '}$code';
  list.forEach((ele, index) => {
    str = str.replace(startCode + index + endCode, startCode + ele + endCode)
  })
  for (let i = 0; i < count; i++) {
    str = str.replace('\"' + startCode, '').replace(endCode + '\"', '')
  }
  return str
}

function parse(str) {
  return JSON.parse(str, function (k, v) {
    if (v.indexOf && v.indexOf('function') > -1) {
      return eval("(function(){return " + v + " })()")
    }
    return v;
  });
}
function addUrlParam(url, param, value) {
  if (!url) return
  function GetQueryString(name) {
    var num = url.indexOf("?")
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = url.substr(num + 1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  };
  function replaceParamVal(paramName, value) {
    var re = eval('/(' + paramName + '=)([^&]*)/gi');
    return url.replace(re, paramName + '=' + value);
  }
  if (GetQueryString(param)) {
    return replaceParamVal(param, value)
  } else {
    if (url.includes('?')) {
      url = url + '&' + param + '=' + value
    } else {
      url = url + '?' + param + '=' + value
    }
    return url;
  }

}