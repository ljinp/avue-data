// import { Loading } from 'element-ui';
import { validatenull } from '@/echart/util'
import { checkUrl, getFunction } from '@/utils/utils'
import axios from 'axios';
window.$glob = {
  url: '',
  params: {},
  query: {},
  headers: {}
};
function getGlobParams () {
  var query = window.location.search.substring(1);
  query = query.split("&");
  query.forEach(ele => {
    var pair = ele.split("=");
    window.$glob.params[pair[0]] = pair[1]
  })
}

axios.defaults.timeout = 10000;
//返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500; // 默认的
};
//跨域请求，允许保存cookie
// let loadingInstance = '';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(config => {
  // loadingInstance = Loading.service({
  //   text: '拼命加载中',
  //   background: 'rgba(0,0,0,0)',
  //   spinner: 'el-icon-loading'
  // });
  getGlobParams();
  if (!checkUrl(config.url)) {
    config.url = window.$glob.url + config.url;
  }
  if (!validatenull(window.$glob.header)) {
    let header = getFunction(window.$glob.header)();
    config.headers = Object.assign(config.headers, header);
  }
  //获取全局参数
  if (typeof (config.data) === 'object' && !validatenull(window.$glob.query)) {
    let query = getFunction(window.$glob.query)();
    let data = Object.assign(window.$glob.params, query)
    if (config.method == 'get') {
      config.params = Object.assign(config.params, data)
    } else if (config.method == 'post') {
      config.data = Object.assign(config.data, data)
    }
  }
  return config
}, error => {
  return Promise.reject(error)
});
//HTTPrequest拦截
axios.interceptors.response.use(config => {
  // loadingInstance.close();
  return config;
}, error => {
  // loadingInstance.close();
  return Promise.reject(new Error(error));
})

export default axios;
