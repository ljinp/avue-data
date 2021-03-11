<template>
  <el-dialog :visible.sync="visible"
             :before-close="handleClose"
             width="60%">
    <monaco-editor v-model="code"></monaco-editor>
    <span slot="footer"
          class="dialog-footer">
      <el-button size="small"
                 @click="setVisible(false)">取 消</el-button>
      <el-button type="primary"
                 @click="submit"
                 size="small">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import MonacoEditor from '@/page/components/editor'
export default {
  components: { MonacoEditor },
  data () {
    return {
      code: ''
    }
  },
  props: {
    visible: Boolean,
    type: String,
    value: [String, Object, Array]
  },
  watch: {
    value: {
      handler (val) {
        this.code = val;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    handleClose () {
      this.setVisible(false);
    },
    submit () {
      let value = this.code;
      try {
        eval('(' + value + ')')
        if (['query', 'data'].includes(this.type)) {
          value = eval('(' + value + ')')
        }
        this.$emit('submit', value);
        this.setVisible(false)
      } catch (error) {
        this.$message.error('数据格式有误')
      }

    },
    setVisible (val) {
      this.$emit('update:visible', val);
    }
  }
}
</script>
