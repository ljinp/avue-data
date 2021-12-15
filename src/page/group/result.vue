<template>
  <el-dialog append-to-body
             @open="open"
             title="导入导出"
             :close-on-click-modal="false"
             :visible.sync="show"
             width="60%">
    <monaco-editor v-model="json"></monaco-editor>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="importData"
                 size="small"
                 type="primary">导入数据</el-button>
      <el-button @click="exportData"
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
      show: false,
      json: {}
    }
  },
  methods: {
    open () {
      this.json = {
        config: this.contain.config,
        component: this.contain.nav
      }
    },
    importData () {
      try {
        let json = JSON.parse(this.json)
        this.contain.config = json.config
        this.contain.nav = json.component
        this.show = false;
        this.$message.success('数据导入成功')
      } catch {
        this.$message.error('导入数据错误')
      }
    },
    exportData () {
      var zip = new window.JSZip();
      zip.file("data.txt", this.json);
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