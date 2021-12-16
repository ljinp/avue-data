<template>
  <el-dialog :visible.sync="visible"
             :close-on-click-modal="false"
             :before-close="handleClose"
             title="数据处理"
             width="80%">

    <div class="content">
      <monaco-editor v-model="code"></monaco-editor>
      <monaco-editor v-model="tip"
                     disabled></monaco-editor>
    </div>
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
import { tip } from '@/config'
import { funEval } from '@/utils/utils'
import MonacoEditor from '@/page/components/editor'
export default {
  components: { MonacoEditor },
  data () {
    return {
      code: '',
      tip: ''
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
        if (this.validatenull(val)) {
          if (['dataFormatter', 'stylesFormatter'].includes(this.type) && this.validatenull(val)) {
            this.code = `function(data,params,refs){
    return {}
}`
          } else if (['query', 'header', 'dataQuery', 'dataHeader'].includes(this.type) && this.validatenull(val)) {
            this.code = `function(data){
    return {}
}`
          } else if (['echartFormatter'].includes(this.type) && this.validatenull(val)) {
            this.code = `function(params){
    alert(params)
}`
          } else if (['clickFormatter'].includes(this.type) && this.validatenull(val)) {
            this.code = `function(params,refs){
    console.log(params,refs)
}`
          } else if (['labelFormatter'].includes(this.type) && this.validatenull(val)) {
            this.code = `function(name,data){
    console.log(name,data)
    return {}
}`
          }
        } else {
          this.code = val;
        }
      },
      immediate: true,
      deep: true,
    },
  },
  created () {
    this.tip = tip
  },
  methods: {
    handleClose () {
      this.setVisible(false);
    },
    submit () {
      let value = this.code;
      try {
        funEval(value);
        if (['data'].includes(this.type)) value = funEval(value);
        this.$emit('submit', value);
        this.setVisible(false)
      } catch (error) {
        console.log(error);
        this.$message.error('数据格式有误')
      }

    },
    setVisible (val) {
      this.$emit('update:visible', val);
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  .monaco_editor_container {
    flex: 1;
    &:first-child {
      flex: 2;
    }
  }
}
</style>
