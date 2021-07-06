import Vue from 'vue'
import ElementUI from 'element-ui';
import axios from './axios'
import 'element-ui/lib/theme-chalk/index.css';
import dataV from '@jiaminghi/data-view'
import components from './echart/'
import router from './router.js';
import App from './App.vue'
import './styles/common.scss'
import './styles/echart.scss'
import { url } from '@/config'
import '@/mock/'
//导入主题文件
import '@/theme/index.js'
Object.keys(components).map(ele => {
  let component = components[ele];
  Vue.component(component.name, component);
});
window.axios = axios;
Vue.config.productionTip = false
Vue.prototype.url = url;
Vue.use(window.AVUE, {
  size: 'mini'
});
Vue.use(ElementUI);
Vue.use(dataV)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
