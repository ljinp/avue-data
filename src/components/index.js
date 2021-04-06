/** 
 * 自定义组件参考文档
 * https://cn.vuejs.org/v2/guide/components-registration.html
*/
import Vue from 'vue'
import Test from './test/';

const list = [
  Test
]
//循环注册组件
list.forEach(ele => {
  ele.mixins = [window.AVUE.default.$Echart]
  Vue.component(`avue-echart-${ele.name}`, ele)
})