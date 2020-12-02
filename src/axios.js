import { Loading } from 'element-ui';
import axios from 'axios';
axios.defaults.timeout = 10000;
//返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500; // 默认的
};
//跨域请求，允许保存cookie
let loadingInstance = '';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(config => {
  loadingInstance = Loading.service({
    text: '拼命加载中',
    background: 'rgba(0,0,0,0.5)',
    spinner: 'el-icon-loading'
  });
  return config
}, error => {
  return Promise.reject(error)
});
//HTTPrequest拦截
axios.interceptors.response.use(config => {
  loadingInstance.close();
  return config;
}, error => {
  return Promise.reject(new Error(error));
})

export default axios;