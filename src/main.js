import Vue from 'vue'
import ElementUI from 'element-ui';
import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'
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

window.axios = axios;
Vue.config.productionTip = false
Vue.prototype.url = url;
Vue.use(Avue, {
  size: 'mini'
});
Vue.use(ElementUI);
Vue.use(dataV)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
