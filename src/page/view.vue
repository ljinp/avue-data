<template>
  <el-scrollbar class="build views">
    <container :props="props"
               :option="option"
               ref="container"></container>
  </el-scrollbar>
</template>
<script>
import init from '@/mixins/'
export default {
  props: {
    option: Object,
    props: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  mixins: [init],
}
</script>
<style lang="scss">
@import "../styles/style.scss";
</style>