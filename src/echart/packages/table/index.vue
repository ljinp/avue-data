<template>
  <div :class="b()">
    <el-table ref="table"
              @cell-click="cellClick"
              :data="dataChart"
              :height="height"
              :border="option.border"
              :cellStyle="cellStyle"
              :row-style="rowStyle"
              :header-row-style="headerRowStyle"
              :header-cell-style="headerCellStyle">
      <el-table-column type="index"
                       label="#"
                       header-align="center"
                       align="center"
                       v-if="option.index"
                       width="60">
        <span slot-scope="{$index}">{{$index+1}}</span>
      </el-table-column>
      <template v-for="(item,index) in option.column">
        <el-table-column v-if="item.hide!==true"
                         show-overflow-tooltip
                         :key='index'
                         :prop="item.prop"
                         :label="item.label"
                         :width="item.width">
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import create from "../../create";
export default create({
  name: "table",
  data () {
    return {
      height: '',
      scrollCheck: "",
    };
  },
  watch: {
    scrollSpeed () {
      this.setTime();
    },
    scroll: {
      handler () {
        this.setTime();
      },
    }
  },
  computed: {
    scrollTime () {
      return this.option.scrollTime
    },
    scrollSpeed () {
      return this.option.scrollSpeed || 1
    },
    scroll () {
      return this.option.scroll
    },
    cellHeight () {
      return Number((this.height + 35.3) / this.option.count)
    }
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.height = this.$el.clientHeight;
      setTimeout(() => {
        this.setTime();
      }, this.scrollTime)
    })
  },
  methods: {
    cellClick (row, column, cell, event) {
      this.updateClick(row);
      this.clickFormatter && this.clickFormatter({
        type: column,
        item: item,
        data: this.dataChart
      }, this.getItemRefs());
    },
    setTime () {
      clearInterval(this.scrollCheck);
      const table = this.$refs.table
      const divData = table.bodyWrapper
      let top = 0
      if (this.scroll) {
        this.scrollCheck = setInterval(() => {
          top = top + this.scrollSpeed
          divData.scrollTop += this.scrollSpeed
          if (divData.clientHeight + divData.scrollTop == divData.scrollHeight) {
            // 重置table距离顶部距离
            divData.scrollTop = 0
          }
          if (top > this.cellHeight && this.scrollTime) {
            clearInterval(this.scrollCheck);
            setTimeout(() => {
              this.setTime()
            }, this.scrollTime)
          }
        }, 20)
      } else {
        divData.scrollTop = 0
      }
    },
    cellStyle ({ row, column, rowIndex, columnIndex }) {
      return {
        height: this.setPx(this.cellHeight),
        fontSize: this.setPx(this.option.bodyFontSize),
        color: this.option.bodyColor,
        textAlign: column.type == 'index' ? 'center' : this.option.bodyTextAlign,
        backgroundColor: rowIndex % 2 == 0 ? this.option.othColor : this.option.nthColor,
      }
    },
    rowStyle ({ rowIndex }) {
      return {
        backgroundColor: 'transparent'
      }
    },
    headerRowStyle () {
      return {
        backgroundColor: this.option.headerBackground
      }
    },
    headerCellStyle ({ row, column, rowIndex, columnIndex }) {
      return {
        fontSize: this.setPx(this.option.headerFontSize),
        backgroundColor: this.option.headerBackground,
        color: this.option.headerColor,
        textAlign: column.type == 'index' ? 'center' : this.option.headerTextAlign
      }
    }
  }
});
</script>


