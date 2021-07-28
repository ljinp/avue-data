<template>
  <el-dialog append-to-body
             title="代码结构"
             :close-on-click-modal="false"
             :visible.sync="show"
             width="60%">
    <monaco-editor v-model="contain.json"
                   disabled></monaco-editor>
  </el-dialog>

</template>

<script>
import MonacoEditor from '@/page/components/editor'
export default {
  components: { MonacoEditor },
  inject: ["contain"],
  data () {
    return {
      show: false
    }
  }
}
</script>

<style>
</style>