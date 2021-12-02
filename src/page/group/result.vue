<template>
  <el-dialog append-to-body
             title="代码结构"
             :close-on-click-modal="false"
             :visible.sync="show"
             width="60%">
    <monaco-editor v-model="contain.json"
                   disabled></monaco-editor>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="exportData"
                 icon="el-icon-download"
                 size="small"
                 type="danger">导出数据</el-button>
    </span>

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
  },
  methods: {
    exportData () {
      var zip = new window.JSZip();
      zip.file("data.txt", this.contain.json);
      zip.generateAsync({ type: "base64" })
        .then(function (content) {
          location.href = "data:application/zip;base64," + content;
        });
    }
  }
}
</script>

<style>
</style>