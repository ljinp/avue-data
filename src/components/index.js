/** 
 * 自定义组件参考文档
 * https://cn.vuejs.org/v2/guide/components-registration.html
*/
import Vue from 'vue'
import Test from './test/';

export default (() => {
  const list = [
    Test
  ]
  let result = {}
  //循环注册组件
  list.forEach(ele => {
    ele.mixins = [window.AVUE.$Echart]
    result[`avue-echart-${ele.name}`] = ele
  })
  return result
})()
