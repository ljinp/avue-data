/** 
 * 自定义组件参考文档
 * https://cn.vuejs.org/v2/guide/components-registration.html
*/
import Test from './test/';
import imgList from './imgList';
import imgTabs from './imgTabs';
import $Echart from '../echart/common';
import { KEY_COMPONENT_NAME } from '../echart/variable';

export default (() => {
  const list = [
    Test,
    imgList,
    imgTabs
  ]
  let result = {}
  //循环注册组件
  list.forEach(ele => {
    ele.mixins = [$Echart]
    result[`${KEY_COMPONENT_NAME}${ele.name}`] = ele
  })
  return result
})()
