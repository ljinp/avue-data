<template>
  <div class="build">
    <imglist ref="imglist"
             @change="handleSetimg"></imglist>
    <top ref="top"></top>
    <div class="app"
         :class="{'app--none':!menuFlag}">
      <div class="menu"
           v-show="menuFlag"
           @click.self="handleMouseDown">
        <p class="title">图层</p>
        <layer ref="layer"
               :nav="nav"></layer>
      </div>
      <!-- 中间区域 -->
      <div class="wrapper"
           :style="wrapperHight"
           v-if="flag"
           id="wrapper"
           ref="wrapper">
        <SketchRule :thick="thick"
                    :scale="scale"
                    :width="width"
                    :height="height"
                    :startX="startX"
                    :startY="startY"
                    :horLineArr="lines.h"
                    :verLineArr="lines.v"
                    :cornerActive="true"
                    @onCornerClick="handleCornerClick" />

        <div ref='screensRef'
             id="screens"
             @wheel="handleWheel"
             @scroll="handleScroll">
          <div ref="containerRef"
               class="screen-container">
            <div id="canvas"
                 ref="canvas"
                 :style="canvasStyle">
              <container ref="container"></container>
            </div>
          </div>
        </div>
      </div>
      <div class="menu params"
           v-show="menuFlag">
        <p class="title">操作</p>
        <el-tabs class="tabs"
                 stretch
                 v-model="tabsActive">
          <el-tab-pane name="0">
            <el-tooltip slot="label"
                        effect="dark"
                        content="配置"
                        placement="top">
              <div><i class="el-icon-setting"></i></div>
            </el-tooltip>
            <el-form label-width="120px"
                     label-position="left"
                     size="mini">
              <!-- 组件配置 -->
              <template v-if="!vaildProp('',[undefined])">
                <p class="title">{{activeObj.title}}</p>
                <el-form-item label="图层名称">
                  <avue-input v-model="activeObj.name"></avue-input>
                </el-form-item>
                <el-form-item label="隐藏">
                  <avue-switch v-model="activeObj.display"></avue-switch>
                </el-form-item>
                <template v-if="vaildProp('colorList')">
                  <el-form-item label="系统配色">
                    <avue-switch v-model="activeOption.switchTheme"></avue-switch>
                  </el-form-item>
                  <el-form-item label="配色选择"
                                v-if="activeOption.switchTheme">
                    <avue-select v-model="activeOption.theme"
                                 :dic="dicOption.themeList">
                    </avue-select>
                  </el-form-item>
                </template>
                <component :is="activeComponent.prop+'Option'"></component>
                <main-option></main-option>
              </template>
              <!-- 多选配置选项 -->
              <template v-else-if="isSelectActive">
                <el-form-item label="水平方式">
                  <el-tooltip content="左对齐"
                              placement="top">
                    <i class="el-icon-s-fold icon"
                       @click="$refs.container.handlePostionSelect('left')"></i>
                  </el-tooltip>
                  <el-tooltip content="居中对齐"
                              placement="top">
                    <i class="el-icon-s-operation icon"
                       @click="$refs.container.handlePostionSelect('center')"></i>
                  </el-tooltip>
                  <el-tooltip content="右对齐"
                              placement="top">
                    <i class="el-icon-s-unfold icon"
                       @click="$refs.container.handlePostionSelect('right')"></i>
                  </el-tooltip>
                </el-form-item>
                <el-form-item label="垂直方式">
                  <el-tooltip content="顶对齐"
                              placement="top">
                    <i class="el-icon-s-fold icon"
                       @click="$refs.container.handlePostionSelect('top')"></i>
                  </el-tooltip>
                  <el-tooltip content="中部对齐"
                              placement="top">
                    <i class="el-icon-s-operation icon"
                       @click="$refs.container.handlePostionSelect('middle')"></i>
                  </el-tooltip>
                  <el-tooltip content="底对齐"
                              placement="top">
                    <i class="el-icon-s-unfold icon"
                       @click="$refs.container.handlePostionSelect('bottom')"></i>
                  </el-tooltip>
                </el-form-item>
                <el-form-item label-width="0">
                  <el-button type="primary"
                             size="mini"
                             class="block"
                             @click="handleDeleteSelect">删除</el-button>
                </el-form-item>
                <el-form-item label-width="0">
                  <el-button type="danger"
                             size="mini"
                             class="block"
                             @click="handleFloder">成组</el-button>
                </el-form-item>
              </template>
              <!-- 主屏的配置项 -->
              <template v-else>
                <!-- <el-form-item label="大屏名称">
                  <avue-input v-model="config.name"></avue-input>
                </el-form-item> -->
                <el-form-item label="大屏宽度">
                  <avue-input-number v-model="config.width"></avue-input-number>
                </el-form-item>
                <el-form-item label="大屏高度">
                  <avue-input-number v-model="config.height"></avue-input-number>
                </el-form-item>
                <el-form-item label="大屏简介">
                  <avue-input v-model="config.info"
                              type="textarea"
                              :min-rows="5"></avue-input>
                </el-form-item>
                <el-form-item label="背景颜色">
                  <avue-input-color v-model="config.backgroundColor"></avue-input-color>
                </el-form-item>
                <el-form-item label="背景图片">
                  <img :src="config.backgroundImage"
                       @click="handleOpenImg('config.backgroundImage','background')"
                       alt=""
                       width="100%" />
                </el-form-item>
                <el-form-item label="缩放">
                  <el-slider v-model="config.scale"
                             :max="200"
                             :format-tooltip="formatTooltip"></el-slider>
                </el-form-item>
                <el-form-item label="环境地址">
                  <avue-input type="textarea"
                              :min-rows="2"
                              v-model="config.url"></avue-input>
                </el-form-item>
                <el-form-item label="参数">
                  <el-button size="mini"
                             type="primary"
                             @click="openCode('query')">编辑</el-button>
                </el-form-item>
                <el-form-item label="水印(预览有效)">
                  <avue-switch v-model="config.mark.show"></avue-switch>
                </el-form-item>
                <template v-if="config.mark.show">
                  <el-form-item label="内容">
                    <avue-input v-model="config.mark.text"></avue-input>
                  </el-form-item>
                  <el-form-item label="大小">
                    <avue-input-number v-model="config.mark.fontSize"></avue-input-number>
                  </el-form-item>
                  <el-form-item label="颜色">
                    <avue-input-color v-model="config.mark.textStyle"></avue-input-color>
                  </el-form-item>
                  <el-form-item label="角度">
                    <avue-input-number v-model="config.mark.degree"></avue-input-number>
                  </el-form-item>
                </template>
              </template>
            </el-form>
          </el-tab-pane>
          <!-- 数据配置 -->
          <el-tab-pane name="1"
                       v-if="vaildProp('dataList')">
            <el-tooltip slot="label"
                        effect="dark"
                        content="数据"
                        placement="top">
              <div><i class="el-icon-document-copy"></i></div>
            </el-tooltip>
            <el-form label-width="120px"
                     label-position="left"
                     size="mini">
              <el-form-item label="数据类型">
                <avue-radio v-model="activeObj.dataType"
                            :dic="dicOption.dataType"></avue-radio>
              </el-form-item>
              <el-form-item label="数据值"
                            label-position="top"
                            v-if="activeObj.dataType===0">
                <el-button size="mini"
                           type="primary"
                           @click="openCode('data')">编辑</el-button>
              </el-form-item>
              <template v-if="activeObj.dataType===1">
                <el-form-item label="接口地址">
                  <avue-input type="textarea"
                              :min-rows="6"
                              v-model="activeObj.url"></avue-input>
                </el-form-item>
                <el-form-item label="接口方式"
                              v-if="activeObj.dataType===1">
                  <avue-radio v-model="activeObj.dataMethod"
                              :dic="dicOption.dataMethod"></avue-radio>
                </el-form-item>
                <el-form-item label="接口参数"
                              v-if="activeObj.dataType===1">
                  <el-button size="mini"
                             type="primary"
                             @click="openCode('dataQuery')">编辑</el-button>
                </el-form-item>
                <el-form-item label="刷新时间">
                  <avue-input-number v-model="activeObj.time"></avue-input-number>
                </el-form-item>
              </template>
              <el-form-item label="数据处理">
                <el-button size="mini"
                           type="primary"
                           @click="openCode('dataFormatter')">编辑</el-button>
              </el-form-item>
              <el-form-item label-width="0">
                <el-button size="mini"
                           type="primary"
                           class="block"
                           @click="handleRefresh">刷新</el-button>
              </el-form-item>
            </el-form>

          </el-tab-pane>
          <!-- 交互事件配置 -->
          <el-tab-pane name="2"
                       v-if="vaildProp('eventList')">
            <el-tooltip slot="label"
                        effect="dark"
                        content="交互"
                        placement="top">
              <div><i class="el-icon-thumb"></i></div>
            </el-tooltip>
            <el-form label-width="120px"
                     label-position="left"
                     size="mini">
              <el-form-item label="子类">
                <avue-select multiple
                             v-model="activeObj.child.index"
                             :dic="childList"
                             :props="childProps">
                </avue-select>
              </el-form-item>
              <el-form-item label="参数名称">
                <avue-input v-model="activeObj.child.paramName"></avue-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- 其他事件配置 -->
          <el-tab-pane name="3"
                       v-if="vaildProp('formatterList')">
            <el-tooltip slot="label"
                        effect="dark"
                        content="事件"
                        placement="top">
              <div><i class="iconfont icon-peizhi"></i></div>
            </el-tooltip>
            <el-form label-width="120px"
                     label-position="left"
                     size="mini">
              <el-form-item label="提示事件">
                <el-button size="mini"
                           type="primary"
                           @click="openCode('formatter')">编辑</el-button>
              </el-form-item>
              <el-form-item label="点击事件"
                            v-if="vaildProp('clickFormatterList')">
                <el-button size="mini"
                           type="primary"
                           @click="openCode('clickFormatter')">编辑</el-button>

              </el-form-item>
              <el-form-item label="标题事件"
                            v-if="vaildProp('labelFormatterList')">
                <el-button size="mini"
                           type="primary"
                           @click="openCode('labelFormatter')">编辑</el-button>
              </el-form-item>
              <el-form-item label-width="0">
                <el-button size="mini"
                           type="primary"
                           class="block"
                           @click="handleRefresh">刷新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- 基本参数配置 -->
          <el-tab-pane name="4"
                       v-if="isActive">
            <el-tooltip slot="label"
                        effect="dark"
                        content="参数"
                        placement="top">
              <div><i class="el-icon-folder"></i></div>
            </el-tooltip>
            <el-form label-width="120px"
                     label-position="left"
                     size="mini">
              <el-form-item label="序号">
                <avue-input v-model="activeObj.index"
                            disabled></avue-input>
              </el-form-item>
              <el-form-item label="X位置">
                <avue-input-number v-model="activeObj.left"></avue-input-number>
              </el-form-item>
              <el-form-item label="Y位置">
                <avue-input-number v-model="activeObj.top"></avue-input-number>
              </el-form-item>
              <el-form-item label="宽度">
                <avue-input-number v-model="activeComponent.width"></avue-input-number>
              </el-form-item>
              <el-form-item label="高度">
                <avue-input-number v-model="activeComponent.height"></avue-input-number>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <codeedit @submit="codeClose"
              :type="code.type"
              v-model="code.obj"
              :visible.sync="code.box"></codeedit>
    <contentmenu ref="contentmenu"></contentmenu>
  </div>
</template>
<script>

import layer from './group/layer';
import top from './group/top';
import imglist from './group/imglist'
import contentmenu from './group/contentmenu'
import codeedit from './group/code';
import { dicOption } from '@/option/config'
import init from '@/mixins/'
import { uuid } from '@/utils/utils'
import components from '@/option/components'
import SketchRule from "vue-sketch-ruler";

export default {
  mixins: [init, components],
  data () {
    return {
      keys: {
        ctrl: false,
      },
      loading: '',
      childProps: {
        label: 'name',
        value: 'index'
      },
      key: '',
      menuFlag: true,
      code: {
        box: false,
        type: '',
        obj: '',
      },
      form: {},
      dicOption: dicOption,
      tabsActive: 0,
      // 标尺
      scale: 1, //初始化标尺的缩放
      startX: 0, //x轴标尺开始的坐标数值
      startY: 0,
      lines: {   //初始化水平标尺上的参考线
        h: [],
        v: []
      },
      thick: 20,  //标尺的厚度
      width: 0,  // 标尺宽,后面会初始化
      height: 0,// 标尺高,后面会初始化
      flag: false,  // 要求得到参数后再渲染标尺,否则标尺刻度不会显示
      wrapperHight: '',// 标尺外部style
      isShowRuler: true, // 显示标尺
      isShowReferLine: true // 显示参考线
    }
  },
  components: {
    imglist,
    layer,
    codeedit,
    top,
    contentmenu,
    SketchRule
  },
  computed: {
    isFolder () {
      return this.activeObj.children
    },
    isActive () {
      return this.active.length !== 0
    },
    isSelectActive () {
      return this.active.length > 1;
    },
    childList () {
      return this.list.filter(ele => {
        if (['tabs'].includes(ele.component.prop)) {
          return false;
        }
        return true;
      })
    },
    activeComponent () {
      return this.activeObj.component || {}
    },
    activeOption () {
      return this.activeObj.option || {}
    },
    activeObj () {
      let result
      if (this.validatenull(this.active)) {
        return {}
      }
      this.active.forEach(ele => {
        const item = this.findnav(ele, true);
        if (this.active.length > 1) {
          if (!result) result = [];
          result.push(item.obj);
        } else {
          result = item.obj
        }
      })
      return result
    },
    /* 标尺用的 */
    canvasStyle () {
      return {
        width: window.innerWidth - 530 + 'px',   // 530为左边180+右边350
        height: window.innerHeight - 45 + 'px',   // 顶部下拉45
        transform: `scale(${this.scale})`
      }
    }

  },
  watch: {
    menuFlag () {
      this.setResize();
    },
    overactive (n, o) {
      [o, n].forEach((ele, index) => {
        if (!ele) return
        this.setActive(ele, index === 1, 'setOverActive');
      })
    },
    active (n, o) {
      [o, n].forEach((ele, index) => {
        ele.forEach(item => {
          this.setActive(item, index === 1, 'setActive');
        })
      })
      //隐藏右键菜单
      this.$refs.contentmenu.hide();
      // 初始化选项卡
      this.tabsActive = '0';
    },
  },
  created () {
    this.wrapperHight = `height:${window.innerHeight - 45}px`
    this.flag = true
    this.listen();
  },
  mounted () {
    this.initFun()
    // 初始化标尺,一定等其他dom渲染完毕再初始化
    // 滚动居中
    this.$refs.screensRef.scrollLeft =
      this.$refs.containerRef.getBoundingClientRect().width / 2 - 20; // 刻度宽20
    this.$nextTick(() => {
      this.initSize();
    });
  },
  methods: {

    codeClose (value) {
      if (this.code.type === 'query') {
        this.config.query = value;
      } else {
        this.activeObj[this.code.type] = value;
      }
    },
    openCode (type) {
      this.code.type = type;
      if (type === 'query') {
        this.code.obj = this.config.query;
      } else {
        this.code.obj = this.activeObj[type];
      }
      this.code.box = true;
    },
    initFun () {
      ['setScale', 'setResize'].forEach(ele => {
        this[ele] = this.$refs.container[ele]
      });
      ['handleAdd'].forEach(ele => {
        this[ele] = this.$refs.top[ele]
      })
    },
    // 右键菜单
    handleContextMenu (e, item = {}) {
      if (!item.index) {
        return
      }
      if (!this.isSelectActive) {
        this.active = [item.index];
      }
      setTimeout(() => {
        this.$refs.contentmenu.show(e.clientX, e.clientY);
      }, 0)
    },
    //监听键盘的按键
    listen () {
      document.onkeydown = (e) => {
        if (e.keyCode === 46) {  // 如果是delete按键,那么调用删除组件按钮
          this.deleteMethod()
        }
        this.keys.ctrl = e.keyCode === 17;
      }
      document.onkeyup = () => {
        this.keys.ctrl = false;
      }
    },
    /** 
    * @desc    : 干掉组件
    * @author  : mj
    * @date  : 2020/09/15
    * @update   by   
    */
    deleteMethod () {
      this.active.forEach(index => {
        const params = this.findnav(index);
        delete params.parent.splice(params.count, 1);
      })
      this.handleInitActive()
    },
    setActive (val, result, fun) {
      const obj = this.$refs.container.handleGetObj(val);
      if (!this.validatenull(obj)) obj[0][fun](result)
    },
    //批量成组
    handleFloder () {
      let floder = {
        "title": "文件夹",
        "name": "文件夹",
        "index": uuid(),
        "children": []
      }
      this.active.forEach(index => {
        const params = this.findnav(index);
        floder.children.push(params.obj);
        delete params.parent.splice(params.count, 1);
      })
      this.nav.push(floder);
      this.handleInitActive();
    },
    //批量删除
    //批量删除
    handleDeleteSelect () {
      this.$confirm(`是否批量删除所选图层?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.active.forEach(index => {
          const params = this.findnav(index);
          delete params.parent.splice(params.count, 1);
        })
        this.handleInitActive()
      })
    },
    vaildProp (name, list) {
      if (list) {
        return list.includes(this.activeComponent.prop)
      }
      return this.dicOption[name].includes(this.activeComponent.prop)
    },
    handleRefresh (tip) {
      this.$refs.container.handleRefresh(tip);
    },
    formatTooltip (val) {
      return parseInt(val);
    },
    //打开图库
    handleOpenImg (item, type) {
      this.$refs.imglist.openImg(item, type);
    },
    //图库框回调赋值
    handleSetimg (val, type) {
      if (type === 'activeObj.data') {
        this.activeObj.data = val;
      } if (type === 'activeObj.data.value') {
        this.activeObj.data.value = val;
      } else if (type === 'activeOption.backgroundImage') {
        this.activeOption.backgroundImage = val;
      } else if (type === 'activeOption.backgroundBorder') {
        this.activeOption.backgroundBorder = val;
      } else if (type === 'activeOption.empBackgroundBorder') {
        this.activeOption.empBackgroundBorder = val;
      } else if (type === 'config.backgroundImage') {
        this.config.backgroundImage = val;
      } else if (type === 'activeOption.symbol') {
        this.activeOption.symbol = val;
      }
    },
    /* **************************标尺方法开始******************************* */
    handleCornerClick () {
      //TODO 点击左上角要回到最开始视图
      return;
    },
    // 滚轮触发
    handleScroll () {
      const screensRect = this.$refs.screensRef.getBoundingClientRect();
      const canvasRect = this.$refs.canvas.getBoundingClientRect();
      // 标尺开始的刻度
      const startX = (screensRect.left + this.thick - canvasRect.left) / this.scale;
      const startY = (screensRect.top + this.thick - canvasRect.top) / this.scale;
      this.startX = startX >> 0;
      this.startY = startY >> 0;
    },
    // 控制缩放值
    handleWheel (e) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const nextScale = parseFloat(
          Math.max(0.2, this.scale - e.deltaY / 500).toFixed(2)
        );
        this.scale = nextScale;
      }
      this.$nextTick(() => {
        this.handleScroll();
      });
    },
    // 初始化标尺数值
    initSize () {
      const wrapperRect = this.$refs.wrapper.getBoundingClientRect();
      this.width = wrapperRect.width - this.thick;
      this.height = wrapperRect.height - this.thick;
    }

  }
}
</script>
<style lang="scss">
@import "../styles/style.scss";
</style>
<style scoped>
.params {
  z-index: 3;
  position: absolute;
  right: 0px;
}
.wrapper {
  padding: 0;
  position: absolute;
  left: 180px;
  right: 350px;
  /* border: 1px solid #dadadc; */
}

#screens {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.screen-container {
  position: absolute;
  width: 5000px;
  height: 3000px;
}

#canvas {
  position: absolute;
  top: 40px;
  left: 50%;
  background: lightblue;
  /* transform-origin: 50% 0; */
}
</style>