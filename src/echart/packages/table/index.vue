<template>
  <div :class="b()">
    <el-table ref="table"
              :data="dataChart"
              :height="height"
              :border="option.border"
              :cellStyle="cellStyle"
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
    scrollSpeed () {
      return this.option.scrollSpeed
    },
    scroll () {
      return this.option.scroll
    },
    cellHeight () {
      return Number((this.height - 50) / this.option.count)
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
      this.setTime();
    })
  },
  methods: {
    setTime () {
      clearInterval(this.scrollCheck);
      const table = this.$refs.table
      const divData = table.bodyWrapper
      if (this.scroll) {
        this.scrollCheck = setInterval(() => {
          divData.scrollTop += this.scrollSpeed || 1
          if (divData.clientHeight + divData.scrollTop == divData.scrollHeight) {
            // 重置table距离顶部距离
            divData.scrollTop = 0
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
        background: rowIndex % 2 == 0 ? this.option.nthColor : this.option.othColor,
      }
    },
    headerCellStyle ({ row, column, rowIndex, columnIndex }) {
      return {
        fontSize: this.setPx(this.option.headerFontSize),
        background: this.option.headerBackground,
        color: this.option.headerColor,
        textAlign: column.type == 'index' ? 'center' : this.option.headerTextAlign
      }
    }
  }
});
</script>


