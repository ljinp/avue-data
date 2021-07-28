<template>
  <el-dialog :visible.sync="visible"
             :before-close="handleClose"
             width="60%">
    <div slot="title">
      <el-popover placement="bottom-start"
                  width="400"
                  trigger="hover">
        <div>
          <p>- data为返回的数据</p>
          <p>(data)=>{</p>
          <p :style="textStyle(1)">//处理数据逻辑</p>
          <p :style="textStyle(1)">return {</p>
          <p :style="textStyle(2)">//返回的数据结构体</p>
          <p :style="textStyle(1)">}</p>
          <p>}</p>
          <small>说明：只有·样式编辑·、·数据处理·等处理方法需要返回函数，其它直接返回JSON对象即可</small>
        </div>
        <span style="color:#fff;"
              slot="reference"><i class="el-icon-info">函数处理说明</i></span>
      </el-popover>
    </div>

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
    textStyle (index) {
      return {
        textIndent: index + 'em'
      }
    },
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
