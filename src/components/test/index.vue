<template>
  <div :style="{fontSize:fontSize,color:'#fff'}">
    <h2>自定义组件</h2><br />
    <h3>我是参数:{{option}}</h3><br />
    <h3>data:{{dataChart}}</h3><br />
    <h3>params:{{dataAxios.config.params}}</h3><br />
  </div>
</template>
<script>
export default {
  name: 'test',
  props: {
    option: Object,
    component: Object
  },
  computed: {
    fontSize () {
      return (this.option.fontSize || 30) + 'px'
    }
  },
  methods: {

  }
}
</script>