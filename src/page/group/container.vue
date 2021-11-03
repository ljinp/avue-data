<template>
  <div class="middle">
    <div id="wrapper"
         class="wrapper"
         @mousedown="contain.handleMouseDown">
      <div class="content"
           id="content"
           ref="content"
           :style="contentStyle">
        <div class="container"
             :style="styleName"
             id="container"
             ref="container">
          <div class="grade"
               v-if="gradeFlag || contain.config.gradeShow"
               :style="gradeLenStyle"></div>
          <subgroup ref="subgroup"
                    :nav="contain.list"></subgroup>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import subgroup from './subgroup'
import common from '@/config'
import { getObj } from '@/api/visual'
export default {
  name: 'contents',
  inject: ["contain"],
  props: {
    option: Object,
    props: {
      type: Object,
      default: () => {
        return {}
      }
    },
    wscale: Number
  },
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
      contentStyle: {},
      selectCount: {
        x1: null,
        x2: null,
        y1: null,
        y2: null
      },
      scale: 1,
      gradeFlag: false,
    }
  },
  computed: {
    stepScale () {
      let scale = Number((100 / (this.scale * this.wscale))).toFixed(2)
      return scale
    },
    //计算中央可视化大屏比例
    styleName () {
      const scale = this.contain.config.scale;
      const val = (scale / 100) + 0.001;
      return Object.assign({
        transform: `scale(${val}, ${val})`,
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
    }
  },
  mounted () {
    this.initData();
    this.initFun();
  },
  methods: {
    initFun () {
      ['handleRefresh', 'getDragObj'].forEach(ele => {
        this[ele] = this.$refs.subgroup[ele]
      });
    },
    //初始化数据
    initData () {
      const id = this.$route ? this.$route.params.id : this.props.id
      this.contain.id = id;
      this.contain.contentWidth = this.$refs.content.offsetWidth;
      const isBuild = this.$route ? this.$route.name === 'build' : this.props.name;
      const width = isBuild ? this.contain.contentWidth : document.body.clientWidth
      let config;
      const callback = () => {
        //赋值属性
        if (this.contain.config.mark.show && !isBuild) {
          this.watermark(this.contain.config.mark);
        }
        this.calcData();
        this.setScale(width);
      }
      if (id) {
        const loading = this.$loading({
          lock: true,
          text: '正在加载中，请稍后',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        getObj(id).then(res => {
          const data = res.data.data;
          this.contain.obj = data;
          config = data.config;
          const contain = {
            config: JSON.parse(config.detail) || {},
            component: JSON.parse(config.component) || []
          }
          this.contain.json = contain
          this.contain.config = contain.config;
          this.contain.nav = contain.component
          this.contain.visual = data.visual;
          //添加水印。只有查看页面生效
          if (!isBuild) {
            const password = this.contain.visual.password
            if (!this.validatenull(password)) {
              this.$prompt('请输入密码', '提示', {
                confirmButtonText: '确定',
                showCancelButton: false,
                showClose: false,
                closeOnClickModal: false,
                inputPattern: new RegExp(password),
                inputErrorMessage: '密码不正确，请重新输入'
              }).then(() => {
                callback();
              })
            } else {
              callback();
            }

          } else {
            callback();
          }
          loading.close();
        }).catch((err) => {
          console.log(err)
          loading.close();
        })
      } else if (this.option) {
        config = this.option;
        this.contain.config = config.detail || {};
        this.contain.nav = config.component || [];
        callback();
      } else {
        this.setScale(width);
      }
    },
    //适配尺寸
    setResize () {
      this.contentStyle = {
        width: this.setPx((this.contain.config.scale * this.contain.config.width) / 100),
        height: this.setPx((this.contain.config.scale * this.contain.config.height) / 100),
      }
    },
    //计算比例
    setScale (width) {
      this.contain.config.scale = (width / this.contain.config.width) * 100
      this.scale = this.contain.config.scale;
      this.setResize();
    },
    calcData () {
      if (!this.contain.config.mark) this.contain.config.mark = {}
      if (!this.contain.config.query) this.contain.config.query = {}
    },
    handlePostionSelect (postion) {
      this.handleCalcPostionSelect();
      const x1 = this.selectCount.x1;
      const x2 = this.selectCount.x2;
      const y1 = this.selectCount.y1;
      const y2 = this.selectCount.y2;
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
      this.contain.active.forEach(ele => {
        ele = this.contain.findlist(ele)
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
          this.$set(ele, 'left', baseLeft);
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
          this.$set(ele, 'top', baseTop)
        }
      })
    },
    //计算多选状态下的最大边界值
    handleCalcPostionSelect () {
      this.selectCount = {
        x1: null,
        x2: null,
        y1: null,
        y2: null
      }
      this.contain.active.forEach(ele => {
        ele = this.contain.findlist(ele)
        const left = ele.left;
        const top = ele.top;
        const width = ele.component.width;
        const height = ele.component.height;
        if (!this.selectCount.x1) {
          this.selectCount = {
            x1: left,
            x2: left + width,
            y1: top,
            y2: top + height
          }
        }
        if (this.selectCount.x1 > left) this.selectCount.x1 = left;
        if (this.selectCount.x2 < left + width) this.selectCount.x2 = left + width;
        if (this.selectCount.y1 > top) this.selectCount.y1 = top;
        if (this.selectCount.y2 < top + height) this.selectCount.y2 = top + height;
      })
    },
  }
}
</script>

<style>
</style>