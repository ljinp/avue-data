/** 
 * 自定义组件参考文档
 * https://cn.vuejs.org/v2/guide/components-registration.html
*/
Vue.component('avue-echart-test', {
  template: `<div :style="{fontSize:fontSize,color:'#fff'}">
            <h2>自定义组件</h2>
            <h3>我是参数:{{option.data}}</h3>
    </div>`,
  props: {
    component: Object
  },
  computed: {
    option () {
      return this.component.option || {}
    },
    fontSize () {
      return (this.option.fontSize || 30) + 'px'
    }
  }
})