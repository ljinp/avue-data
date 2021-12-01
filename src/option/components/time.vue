<!-- 通用形配置 -->
<template>
  <div>
    <el-form-item label="执行间隔">
      <avue-input-number v-model="main.activeOption.time">
      </avue-input-number>
    </el-form-item>
    <el-form-item label="执行逻辑">
      <el-button size="mini"
                 type="primary"
                 @click="openCode">编辑</el-button>
    </el-form-item>
    <codeedit @submit="codeClose"
              v-model="code.obj"
              v-if="code.box"
              :type="code.type"
              :visible.sync="code.box"></codeedit>
  </div>
</template>

<script>
import codeedit from '../../page/group/code';
export default {
  inject: ["main"],
  data () {
    return {
      code: {
        box: false,
        obj: {},
      }
    }
  },
  components: {
    codeedit
  },
  methods: {
    codeClose (value) {
      this.main.activeObj[this.code.type] = value;
    },
    openCode () {
      this.code.type = 'echartFormatter';
      this.code.obj = this.main.activeObj[this.code.type];
      this.code.box = true;
    },
  }
}
</script>

<style>
</style>