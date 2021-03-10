<template>
  <el-dialog append-to-body
             title="代码结构"
             :visible.sync="show"
             width="60%">
    <textarea disabled
              style="color:#fff;width:100%;height:500px"
              v-model="json"></textarea>
  </el-dialog>

</template>

<script>
export default {
  inject: ["contain"],
  computed: {
    json () {
      return JSON.stringify(this.contain.json, null, 4)
    }
  },
  data () {
    return {
      show: false
    }
  }
}
</script>

<style>
</style>