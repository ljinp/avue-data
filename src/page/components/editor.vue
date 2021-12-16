<template>
  <monaco-editor v-model="code"
                 :read-only="disabled"
                 :language="language"
                 :options="options"
                 :height="height"></monaco-editor>
</template>

<script>
import MonacoEditor from '@/utils/monaco-editor'
export default {
  components: { MonacoEditor },
  data () {
    return {
      code: '',
      options: {
        fontSize: 12
      }
    }
  },
  props: {
    language: {
      type: String,
      default: 'javascript'
    },
    disabled: Boolean,
    height: {
      type: [String, Number],
      default: 400
    },
    value: [String, Object, Array]
  },
  watch: {
    code (val) {
      this.$emit('input', val);
    },
    value: {
      handler (val) {
        if (typeof (val) == 'object') {
          this.code = JSON.stringify(val, null, 4);
        } else {
          this.code = val || '';
        }
      },
      immediate: true,
      deep: true,
    },
  },
}
</script>
