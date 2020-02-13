<template>
  <div class="middle">
    <div class="wrapper__grade"
         @mousedown="contain.handleMouseDown"></div>
    <div class="wrapper"
         @mousedown="contain.handleMouseDown">
      <div class="content"
           ref="content">
        <div class="selectall"
             :style="selectStyle"
             v-show="selectObj.show"
             ref="selectall"></div>
        <div class="selectbg"
             v-show="selectObj.show"></div>
        <div class="selectflag"
             ref="selectflag"
             v-show="selectObj.flag">
        </div>
        <div class="container"
             :style="styleName"
             ref="container">
          <div class="grade"
               v-if="gradeFlag || contain.config.gradeShow"
               :style="gradeLenStyle"></div>
          <subgroup ref="subgroup"
                    :nav="contain.list"
                    @contextmenu.prevent.native="contain.handleContextMenu($event,item)"></subgroup>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import subgroup from './subgroup'
export default {
  name: 'content',
  inject: ["contain"],
  provide () {
    return {
      contain: this.contain,
      container: this
    };
  },
  components: {
    subgroup
  },
  data () {
    return {
      contentWidth: 0,
      scale: 1,
      gradeFlag: false,
      selectList: [],
      selectCount: {
        maxx1: 0,
        maxx2: 0,
        maxy1: 0,
        maxy2: 0,
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0
      },
      moveObj: {
        startX: 0,
        startY: 0,
        show: false,
      },
      selectObj: {
        startX: 0,
        startY: 0,
        moveX: 0,
        moveY: 0,
        flag: false,
        show: false,
        left: 0,
        top: 0,
        width: 0,
        height: 0
      }
    }
  },
  computed: {
    stepScale () {
      let scale = Number(((1 / this.scale) * 100).toFixed(2));
      return scale
    },
    //计算中央可视化大屏比例
    styleName () {
      const scale = this.contain.config.scale;
      return Object.assign({
        transform: `scale(${scale / 100}, ${scale / 100})`,
        width: this.setPx(this.contain.config.width),
        height: this.setPx(this.contain.config.height),
        backgroundColor: this.contain.config.backgroundColor
      }, (() => {
        if (this.contain.config.backgroundImage) {
          return {
            background: `url(${this.contain.config.backgroundImage}) 0% 0% / 100% 100% rgb(3, 12, 59)`,
          }
        }
        return
      })())
    },
    gradeLenStyle () {
      return {
        backgroundSize: `${this.setPx(this.contain.config.gradeLen)} ${this.setPx(this.contain.config.gradeLen)},${this.setPx(this.contain.config.gradeLen)} ${this.setPx(this.contain.config.gradeLen)}`
      }
    },
    selectStyle () {
      return {
        width: this.setPx(this.selectObj.width),
        height: this.setPx(this.selectObj.height),
        left: this.setPx(this.selectObj.left),
        top: this.setPx(this.selectObj.top)
      }
    }
  },
  mounted () {
    this.initData();
    this.initFun();
  },
  methods: {
    initFun () {
      ['handleRefresh', 'handleGetObj'].forEach(ele => {
        this[ele] = this.$refs.subgroup[ele]
      });
    },
    //初始化数据
    initData () {
      const id = this.$route.query.id;
      this.contentWidth = this.$refs.content.offsetWidth;
      const isBuild = this.$route.path == '/build';
      const width = isBuild ? this.contentWidth : document.body.clientWidth
      //添加水印。只有查看页面生效
      if (!isBuild) {
        if (this.contain.config.mark.show) {
          this.watermark(this.contain.config.mark);
        }
      }
      if (id) {
        const loading = this.$loading({
          lock: true,
          text: '正在加载中，请稍后',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$httpajax.get('./data' + id).then(res => {
          const data = res.data.data;
          this.contain.nav = data.list;
          this.contain.config = data.config;
          this.calcData();
          this.setScale(width);
          loading.close();
        })
      } else {
        this.setScale(width);
      }
    },
    //适配尺寸
    setResize () {
      this.$nextTick(() => {
        this.$refs.content.style.width = this.setPx((this.contain.config.scale * this.contain.config.width) / 100)
        this.$refs.content.style.height = this.setPx((this.contain.config.scale * this.contain.config.height) / 100)
      })
    },
    //计算比例
    setScale (width) {
      this.$nextTick(() => {
        this.contain.config.scale = (width / this.contain.config.width) * 100
        this.scale = this.contain.config.scale;
        this.setResize();
      })
    },
    calcData () {
      if (!this.contain.config.mark) this.contain.config.mark = {}
      if (!this.contain.config.query) this.contain.config.query = {}
    },
    handleMoveMouseUp () {
      this.moveObj.show = false;
    },
    handleMoveMouseDown (e) {
      const x = e.offsetX
      const y = e.offsetY
      this.moveObj.startX = x
      this.moveObj.startY = y
      this.moveObj.show = true;
    },
    handleMoveMouseMove (e) {
      if (this.moveObj.show) {
        const x = e.offsetX
        const y = e.offsetY;
        const movex = (x - this.moveObj.startX) * this.stepScale;
        const movey = (y - this.moveObj.startY) * this.stepScale;
        this.moveObj.startX = x
        this.moveObj.startY = y
        this.handleMoveSelectList(movex, movey)
      }
    },
    handleSelectMouseDown (e) {
      this.list.forEach((ele, index) => {
        this.$refs['item_' + index][0].setActive(false)
      })
      this.selectObj.flag = false;
      this.selectObj.width = 0
      this.selectObj.height = 0;
      const x = e.layerX
      const y = e.layerY
      this.selectObj.startX = x
      this.selectObj.startY = y
      this.selectObj.left = x;
      this.selectObj.top = y;
      this.selectObj.show = true
      this.contain.handleMouseDown();
    },
    handleSelectMouseUp () {
      if (this.selectObj.show) {
        this.selectObj.show = false
        if (this.selectObj.width != 0 && this.selectObj.height != 0) {
          this.selectCount.x1 = this.selectObj.left * this.stepScale
          this.selectCount.x2 = this.selectCount.x1 + this.selectObj.width * this.stepScale
          this.selectCount.y1 = this.selectObj.top * this.stepScale
          this.selectCount.y2 = this.selectCount.y1 + this.selectObj.height * this.stepScale
          this.handleGetSelectList();
        }
      }
    },
    handlePostionSelect (postion) {
      const x1 = this.selectCount.maxx1;
      const x2 = this.selectCount.maxx2;
      const y1 = this.selectCount.maxy1;
      const y2 = this.selectCount.maxy2;
      if (postion === 'left') {
        this.handleMoveSelectList(x1, undefined, true, postion);
      } else if (postion === 'center') {
        this.handleMoveSelectList(x1 + (x2 - x1) / 2, undefined, true, postion);
      } else if (postion === 'right') {
        this.handleMoveSelectList(x2, undefined, true, postion);
      } else if (postion === 'top') {
        this.handleMoveSelectList(undefined, y1, true, postion);
      } else if (postion === 'middle') {
        this.handleMoveSelectList(undefined, y1 + (y2 - y1) / 2, true, postion);
      } else if (postion === 'bottom') {
        this.handleMoveSelectList(undefined, y2, true, postion);
      }
    },
    handleMoveSelectList (left, top, type, postion) {
      this.selectList.forEach(index => {
        const ele = this.list[index];
        const ele_component = ele.component;
        //水平情况
        if (left) {
          let baseLeft = Number(type ? left : (ele.left + left).toFixed(2));
          if (postion === 'right') {
            baseLeft = baseLeft - ele_component.width
          }
          else if (postion === 'center') {
            const obj_center = ele.left + ele_component.width / 2;
            baseLeft = ele.left + (left - obj_center)
          }
          this.$set(this.list[index], 'left', baseLeft);
          this.$refs['item_' + index][0].setLeft(baseLeft)
        }
        //垂直情况
        if (top) {
          let baseTop = Number(type ? top : (ele.top + top).toFixed(2));
          if (postion === 'bottom') {
            baseTop = baseTop - ele_component.height
          }
          else if (postion === 'middle') {
            const obj_middle = ele.top + ele_component.height / 2;
            baseTop = ele.top + (top - obj_middle)
          }
          this.$set(this.list[index], 'top', baseTop)
          this.$refs['item_' + index][0].setTop(baseTop)
        }
      })
      this.handleCalcPostionSelect();
    },
    handleGetSelectList () {
      this.selectList = [];
      this.list.forEach((ele, index) => {
        const left = ele.left;
        const top = ele.top;
        if (!ele.display) {
          if ((left >= this.selectCount.x1 && left <= this.selectCount.x2) && (top >= this.selectCount.y1 && top <= this.selectCount.y2)) {
            this.selectList.push(index)
          }
        }
      })
      this.handleCalcPostionSelect();
      if (!this.validatenull(this.selectList)) {
        this.selectList.forEach(index => {
          this.$refs['item_' + index][0].setActive(true)
        })
        this.selectObj.flag = true;
      }

    },
    //计算多选状态下的最大边界值
    handleCalcPostionSelect () {
      this.selectCount.maxx1 = 99999;
      this.selectCount.maxy1 = 99999;
      this.selectList.forEach(index => {
        const ele = this.list[index];
        const left = ele.left;
        const top = ele.top;
        const width = ele.component.width;
        const height = ele.component.height;
        if (this.selectCount.maxx1 > left) {
          this.selectCount.maxx1 = left;
        }
        if (this.selectCount.maxx2 < left + width) {
          this.selectCount.maxx2 = left + width;
        }
        if (this.selectCount.maxy1 > top) {
          this.selectCount.maxy1 = top;
        }
        if (this.selectCount.maxy2 < top + height) {
          this.selectCount.maxy2 = top + height;
        }
      })
    },
    handleExectSelect () {
      this.selectList.forEach(index => {
        this.$refs['item_' + index][0].setActive(false)
      })
      this.selectList = [];
      this.selectObj.flag = false;
    },
    handleSelectMouseMove (e) {
      if (this.selectObj.show) {
        const x = e.layerX
        const y = e.layerY;
        this.selectObj.width = this.selectObj.width + x - this.selectObj.startX
        this.selectObj.height = this.selectObj.height + y - this.selectObj.startY
        this.selectObj.startX = x
        this.selectObj.startY = y
      }
    },
  }
}
</script>

<style>
</style>