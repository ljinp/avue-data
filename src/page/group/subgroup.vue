<template>
  <div>
    <div v-for="item in nav"
         :key="item.index">
      <avue-draggable v-if="!item.children"
                      v-bind="item"
                      :scale="container.stepScale"
                      :disabled="!contain.menuFlag"
                      :step="container.stepScale"
                      :width="item.component.width"
                      :height="item.component.height"
                      :ref="common.DEAFNAME+item.index"
                      :id="common.DEAFNAME+item.index"
                      v-show="!item.display"
                      @focus="handleFocus"
                      @blur="handleBlur"
                      @change="handleChange">
        <component :ref="common.NAME+item.index"
                   :id="common.NAME+item.index"
                   :is="common.COMPNAME+item.component.name"
                   v-bind="item"
                   :width="item.component.width"
                   :height="item.component.height"
                   :animation="!contain.menuFlag"
                   :disabled="!contain.menuFlag"
                   :scale="container.stepScale"
                   :option="item.option"
                   :homeUrl="contain.config.url"
                   :dataQuery="handleGetQuery(item)"
                   :click="handleClick" />
      </avue-draggable>
      <subgroup :nav="item.children"></subgroup>
    </div>
  </div>
</template>

<script>
import { addUrlParam } from '@/utils/utils'
import common from '@/config'
export default {
  name: 'subgroup',
  inject: ["contain", 'container'],
  provide () {
    return {
      contain: this.contain,
      container: this.container
    };
  },
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
      common: common,
    }
  },
  methods: {
    //点击事件交互
    handleClick ({ type, child, value }) {
      if (type === 'tabs') {
        const indexList = child.index;
        indexList.forEach((index) => {
          const paramName = child.paramName;
          const item = this.contain.findlist(index);
          if (item.url) {
            item.url = addUrlParam(item.url, paramName, value);
            this.$refs[this.common.NAME + index].forEach(ele => {
              ele.updateData();
            })
          }
        })
      }
    },
    //合并组件参数和公共参数查询参数
    handleGetQuery (item) {
      return Object.assign(this.deepClone(this.contain.config.query), item.dataQuery)
    },
    //刷新数据
    handleRefresh () {
      this.$refs[this.common.NAME + this.contain.activeObj.index][0].updateData();
      this.$message.success('刷新成功')
    },
    //获取对象
    handleGetObj (val) {
      return this.$refs[`${this.common.DEAFNAME}${val}`];
    },
    //位置变化
    handleChange ({ index, left, top, width, height }) {
      if (this.contain.keys.ctrl) {
        if (!Array.isArray(this.contain.active)) {
          this.contain.handleInitActive();
        }
        this.contain.active.push(index);
      } else {
        if (!this.contain.active.includes(index)) {
          this.contain.active = [index];
        }
        this.$set(this.contain.activeObj.component, 'width', width)
        this.$set(this.contain.activeObj.component, 'height', height)
        this.$set(this.contain.activeObj, 'left', left)
        this.$set(this.contain.activeObj, 'top', top)
      }

    },
    handleFocus () {
      this.container.gradeFlag = true;
    },
    handleBlur () {
      this.container.gradeFlag = false;
    },
  }
}
</script>

<style>
</style>