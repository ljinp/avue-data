<!-- 表格配置 -->
<template>
  <div>
    <el-form-item label="开启排名">
      <avue-switch v-model="main.activeOption.index"></avue-switch>
    </el-form-item>
    <el-form-item label="边框">
      <avue-switch v-model="main.activeOption.border">
      </avue-switch>
    </el-form-item>
    <el-form-item label="追加模式">
      <avue-switch v-model="main.activeOption.dataAppend">
      </avue-switch>
    </el-form-item>
    <el-form-item label="开启滚动">
      <avue-switch v-model="main.activeOption.scroll">
      </avue-switch>
    </el-form-item>
    <template v-if="main.activeOption.scroll">
      <el-form-item label="滚动间隔">
        <avue-input-number v-model="main.activeOption.scrollTime">
        </avue-input-number>
      </el-form-item>
      <el-form-item label="滚动速度">
        <avue-input-number v-model="main.activeOption.scrollSpeed">
        </avue-input-number>
      </el-form-item>
    </template>
    <el-collapse accordion>
      <el-collapse-item title="表头设置">
        <el-form-item label="显示">
          <avue-switch v-model="main.activeOption.showHeader">
          </avue-switch>
        </el-form-item>
        <el-form-item label="字体大小">
          <avue-input-number v-model="main.activeOption.headerFontSize">
          </avue-input-number>
        </el-form-item>
        <el-form-item label="背景颜色">
          <avue-input-color type="textarea"
                            v-model="main.activeOption.headerBackground"></avue-input-color>
        </el-form-item>
        <el-form-item label="字体颜色">
          <avue-input-color type="textarea"
                            v-model="main.activeOption.headerColor"></avue-input-color>
        </el-form-item>
        <el-form-item label="对其方式">
          <avue-select v-model="main.activeOption.headerTextAlign"
                       :dic="dicOption.textAlign">
          </avue-select>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="表格设置">
        <el-form-item label="显示行数">
          <avue-input-number v-model="main.activeOption.count">
          </avue-input-number>
        </el-form-item>
        <el-form-item label="字体大小">
          <avue-input-number v-model="main.activeOption.bodyFontSize">
          </avue-input-number>
        </el-form-item>
        <el-form-item label="对其方式">
          <avue-select v-model="main.activeOption.bodyTextAlign"
                       :dic="dicOption.textAlign">
          </avue-select>
        </el-form-item>
        <el-form-item label="文字颜色">
          <avue-input-color type="textarea"
                            v-model="main.activeOption.bodyColor"></avue-input-color>
        </el-form-item>
        <el-form-item label="奇行颜色">
          <avue-input-color type="textarea"
                            v-model="main.activeOption.nthColor"></avue-input-color>
        </el-form-item>
        <el-form-item label="偶行颜色">
          <avue-input-color type="textarea"
                            v-model="main.activeOption.othColor"></avue-input-color>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="表格列设置">
        <avue-crud :option="tableOption"
                   :data="main.activeOption.column"
                   @row-save="rowSave"
                   @row-del="rowDel"
                   @row-update="rowUpdate">
          <template slot="menuLeft"
                    slot-scope="{}">
            <el-button size="mini"
                       icon="el-icon-s-operation"
                       @click="openCode"
                       type="primary">编辑数据</el-button>
          </template>
        </avue-crud>
      </el-collapse-item>
    </el-collapse>
    <codeedit @submit="codeClose"
              v-model="code.obj"
              v-if="code.box"
              :type="code.type"
              :visible.sync="code.box"></codeedit>
  </div>
</template>

<script>
import { tableOption, dicOption } from '@/option/config'
import codeedit from '../../page/group/code';
export default {
  data () {
    return {
      dicOption: dicOption,
      tableOption: tableOption,
      code: {
        box: false,
        type: 'data',
        obj: {},
      }
    }
  },
  inject: ["main"],
  components: {
    codeedit
  },
  methods: {
    rowSave (row, done) {
      this.main.activeOption.column.push(row);
      done()
    },
    rowDel (row, index) {
      this.main.activeOption.column.splice(index, 1);
    },
    rowUpdate (row, index, done) {
      this.main.activeOption.column.splice(index, 1, row);
      done()
    },
    codeClose (value) {
      this.main.activeOption.column = value;
    },
    openCode () {
      this.code.obj = this.main.activeOption.column
      this.code.box = true;
    },
  }
}
</script>

<style>
</style>