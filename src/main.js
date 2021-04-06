import Vue from 'vue'
import ElementUI from 'element-ui';
import axios from './axios'
import 'element-ui/lib/theme-chalk/index.css';
import dataV from '@jiaminghi/data-view'

import router from './router.js';
import App from './App.vue'
import './styles/common.scss'
import { url } from '@/config'
import '@/mock/'
//注册自定义组件
import './components/'
//导入主题文件
import '@/theme/index.js'
window.axios = axios;
Vue.config.productionTip = false
Vue.prototype.url = url;
Vue.use(window.AVUE.default, {
  size: 'mini'
});
Vue.use(ElementUI);
Vue.use(dataV)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
