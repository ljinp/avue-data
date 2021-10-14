import Vue from 'vue'
import ElementUI from 'element-ui';
import axios from './axios'
import 'element-ui/lib/theme-chalk/index.css';
import dataV from '@jiaminghi/data-view'
import router from './router.js';
import App from './App.vue'
import './styles/common.scss'
import { url } from '@/config'
import '@/utils/es6'
import '@/mock/'
//导入主题文件
import '@/theme/index.js'
Vue.config.productionTip = false
window.axios = axios;
Vue.use(window.AVUE, {
  size: 'mini'
});
Vue.prototype.url = url;
Vue.use(ElementUI);
Vue.use(dataV)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
