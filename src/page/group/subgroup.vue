<template>
  <div>
    <div v-for="item in nav"
         :key="item.index"
         @contextmenu.prevent="contain.handleContextMenu && contain.handleContextMenu($event,item)">
      <avue-draggable v-if="!item.children"
                      v-bind="item"
                      :scale="container.stepScale"
                      :lock="item.lock"
                      :disabled="!contain.menuFlag"
                      :step="container.stepScale"
                      :width="item.component.width"
                      :height="item.component.height"
                      :ref="common.DEAFNAME+item.index"
                      :id="common.DEAFNAME+item.index"
                      :active-flag="contain.active.includes(item.index)"
                      v-show="!item.display"
                      @move="handleMove"
                      @over="handleOver"
                      @focus="handleFocus"
                      @blur="handleBlur">
        <component :ref="common.NAME+item.index"
                   :id="common.NAME+item.index"
                   :is="common.COMPNAME+item.component.name"
                   v-bind="item"
                   :data-formatter="getFunction(item.dataFormatter)"
                   :click-formatter="getFunction(item.clickFormatter,true)"
                   :echart-formatter="getFunction(item.echartFormatter)"
                   :label-formatter="getFunction(item.labelFormatter)"
                   :styles-formatter="getFunction(item.stylesFormatter)"
                   :sql-formatter="sqlFormatter"
                   :formatter="getFunction(item.formatter)"
                   :width="item.component.width"
                   :data-query="getFunction(item.dataQuery)"
                   :data-header="getFunction(item.dataHeader)"
                   :height="item.component.height"
                   :animation="!contain.menuFlag"
                   :theme="(item.option || {}).theme"
                   :disabled="!contain.menuFlag"
                   :scale="container.stepScale"
                   :option="item.option"
                   :child="item.child"
                   title="" />
      </avue-draggable>
      <subgroup :nav="item.children"></subgroup>
    </div>
  </div>
</template>

<script>
//注册自定义组件
import components from '@/components/';
import crypto from '@/utils/crypto';
import { dynamicSql } from '@/api/db'
import { getFunction, getJson } from '@/utils/utils'
import common from '@/config'
import echartComponents from '../../echart/'
export default {
  name: 'subgroup',
  inject: ["contain", 'container'],
  provide () {
    return {
      contain: this.contain,
      container: this.container
    };
  },
  components: components,
  props: {
    nav: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      sqlFormatter: dynamicSql,
      common: common,
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      Object.keys(echartComponents).map(ele => {
        let component = echartComponents[ele];
        Vue.component(component.name, component);
      });
      this.getJson = getJson;
      this.getFunction = getFunction
    },
    getItemObj () {
      return this.$refs[this.common.NAME + this.contain.activeObj.index][0];
    },
    //刷新数据
    handleRefresh () {
      return this.getItemObj().updateData();
    },
    //获取对象
    getDragObj (val) {
      return this.$refs[`${this.common.DEAFNAME}${val}`];
    },
    handleMove ({ index, left, top }) {
      if (this.contain.activeIndex !== index) return
      this.contain.activeList.forEach(item => {
        if (this.contain.activeIndex === item.index) return
        item.left = item.left + left;
        item.top = item.top + top
      })
    },
    handleOver ({ index }) {
      this.contain.overactive = index;
    },
    handleFocus ({ index }) {
      this.contain.activeIndex = index;
      this.container.gradeFlag = true;
      this.contain.selectNav(index);
    },
    handleBlur ({ index, left, top, width, height }) {
      if (index !== this.contain.activeIndex) return
      this.container.gradeFlag = false;
      this.$set(this.contain.activeObj.component, 'width', width)
      this.$set(this.contain.activeObj.component, 'height', height)
      this.$set(this.contain.activeObj, 'left', left)
      this.$set(this.contain.activeObj, 'top', top)
    },
  }
}
</script>
