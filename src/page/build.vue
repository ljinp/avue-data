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
      <container ref="container"></container>
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
                <!-- 折叠公共配置 -->
                <el-collapse accordion>
                  <!-- 标题设置 -->
                  <template v-if="vaildProp('titleList')">
                    <el-collapse-item title="标题设置">
                      <el-form-item label="标题">
                        <avue-switch v-model="activeOption.titleShow"></avue-switch>
                      </el-form-item>
                      <el-form-item label="标题">
                        <avue-input v-model="activeOption.title"></avue-input>
                      </el-form-item>
                      <el-form-item label="字体颜色">
                        <avue-color v-model="activeOption.titleColor"></avue-color>
                      </el-form-item>
                      <el-form-item label="字体大小">
                        <avue-input-number v-model="activeOption.titleFontSize"></avue-input-number>
                      </el-form-item>
                      <el-form-item label="字体位置">
                        <avue-select v-model="activeOption.titlePostion"
                                     :dic="dicOption.textAlign">
                        </avue-select>
                      </el-form-item>
                      <el-form-item label="副标题">
                        <avue-input v-model="activeOption.subtext"></avue-input>
                      </el-form-item>
                      <el-form-item label="字体颜色">
                        <avue-color v-model="activeOption.subTitleColor"></avue-color>
                      </el-form-item>
                      <el-form-item label="字体大小">
                        <avue-input-number v-model="activeOption.subTitleFontSize">
                        </avue-input-number>
                      </el-form-item>
                    </el-collapse-item>
                  </template>
                  <!-- 轴设置 -->
                  <template v-if="vaildProp('barList')">
                    <el-collapse-item title="X轴设置">
                      <el-form-item label="名称">
                        <avue-input v-model="activeOption.xAxisName">
                        </avue-input>
                      </el-form-item>
                      <el-form-item label="显示">
                        <avue-switch v-model="activeOption.xAxisShow">
                        </avue-switch>
                      </el-form-item>
                      <el-form-item label="显示网格线">
                        <avue-switch v-model="activeOption.xAxisSplitLineShow">
                        </avue-switch>
                      </el-form-item>
                      <el-form-item label="标签间距">
                        <avue-switch v-model="activeOption.xAxisinterval">
                        </avue-switch>
                      </el-form-item>
                      <el-form-item label="文字角度">
                        <avue-switch v-model="activeOption.xAxisRotate">
                        </avue-switch>
                      </el-form-item>
                      <el-form-item label="轴反转">
                        <avue-switch v-model="activeOption.xAxisInverse">
                        </avue-switch>
                      </el-form-item>
                      <el-form-item label="字号">
                        <avue-input-number v-model="activeOption.xNameFontSize">
                        </avue-input-number>
                      </el-form-item>
                    </el-collapse-item>
                    <el-collapse-item title="Y轴设置">
                      <el-form-item label="名称">
                        <avue-input v-model="activeOption.yAxisName">
                        </avue-input>
                      </el-form-item>
                      <el-form-item label="显示">
                        <avue-switch v-model="activeOption.yAxisShow">
                        </avue-switch>
                      </el-form-item>
                      <el-form-item label="轴网格线">
                        <avue-switch v-model="activeOption.yAxisSplitLineShow">
                        </avue-switch>
                      </el-form-item>
                      <el-form-item label="反转">
                        <avue-switch v-model="activeOption.yAxisInverse">
                        </avue-switch>
                      </el-form-item>
                      <el-form-item label="字号">
                        <avue-input-number v-model="activeOption.yNameFontSize">
                        </avue-input-number>
                      </el-form-item>
                    </el-collapse-item>
                  </template>
                  <!-- 数值设置 -->
                  <template v-if="vaildProp('labelList')">
                    <el-collapse-item title="数值设置">
                      <el-form-item label="显示">
                        <avue-switch v-model="activeOption.labelShow">
                        </avue-switch>
                      </el-form-item>
                      <el-form-item label="字体大小">
                        <avue-input-number v-model="activeOption.labelShowFontSize">
                        </avue-input-number>
                      </el-form-item>
                      <el-form-item label="字体颜色">
                        <avue-color v-model="activeOption.labelShowColor">
                        </avue-color>
                      </el-form-item>
                      <el-form-item label="字体粗细">
                        <avue-select v-model="activeOption.labelShowFontWeight"
                                     :dic="dicOption.fontWeight">
                        </avue-select>
                      </el-form-item>
                    </el-collapse-item>
                  </template>
                  <!-- 提示语设置  -->
                  <template v-if="vaildProp('tipList')">
                    <el-collapse-item title="提示语设置">
                      <el-form-item label="字体大小">
                        <avue-input-number v-model="activeOption.tipFontSize"></avue-input-number>
                      </el-form-item>
                      <el-form-item label="字体颜色">
                        <avue-color v-model="activeOption.tipColor"></avue-color>
                      </el-form-item>
                    </el-collapse-item>
                  </template>
                  <!-- 轴距离设置 -->
                  <template v-if="vaildProp('postionList')">
                    <el-collapse-item title="坐标轴边距设置">
                      <el-form-item label="左边距(像素)">
                        <avue-slider v-model="activeOption.gridX"
                                     :max="400"></avue-slider>
                      </el-form-item>
                      <el-form-item label="顶边距(像素)">
                        <avue-slider v-model="activeOption.gridY"
                                     :max="400"></avue-slider>
                      </el-form-item>
                      <el-form-item label="右边距(像素)">
                        <avue-slider v-model="activeOption.gridX2"
                                     :max="400"></avue-slider>
                      </el-form-item>
                      <el-form-item label="底边距(像素)">
                        <avue-slider v-model="activeOption.gridY2"
                                     :max="400"></avue-slider>
                      </el-form-item>
                    </el-collapse-item>
                  </template>
                  <!-- 图例设置 -->
                  <template v-if="vaildProp('legendList')">
                    <el-collapse-item title="图例操作">
                      <el-form-item label="图例">
                        <avue-switch v-model="activeOption.legend"></avue-switch>
                      </el-form-item>
                      <el-form-item label="位置">
                        <avue-select v-model="activeOption.legendPostion"
                                     :dic="dicOption.textAlign">
                        </avue-select>
                      </el-form-item>
                      <el-form-item label="布局朝向">
                        <avue-select v-model="activeOption.legendOrient"
                                     :dic="dicOption.orientList">
                        </avue-select>
                      </el-form-item>
                      <el-form-item label="字体大小">
                        <avue-input-number v-model="activeOption.legendFontSize">
                        </avue-input-number>
                      </el-form-item>
                    </el-collapse-item>
                  </template>
                  <!-- 颜色设置 -->
                  <template v-if="vaildProp('colorList')">
                    <el-collapse-item title="自定义配色">
                      <el-form-item label="文字颜色">
                        <avue-color v-model="activeOption.nameColor">
                        </avue-color>
                      </el-form-item>
                      <el-form-item label="轴线颜色">
                        <avue-color v-model="activeOption.lineColor"></avue-color>
                      </el-form-item>
                      <avue-crud :option="colorOption"
                                 :data="activeOption.barColor"
                                 @row-save="rowSave"
                                 @row-del="rowDel"
                                 @row-update="rowUpdate"></avue-crud>
                    </el-collapse-item>
                  </template>
                </el-collapse>
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
                  <avue-color v-model="config.backgroundColor"></avue-color>
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
                    <avue-color v-model="config.mark.textStyle"></avue-color>
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
              <el-form-item label="参数">
                <avue-input v-model="activeObj.child.paramName"></avue-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- 其他事件配置 -->
          <el-tab-pane name="3"
                       v-if="vaildProp('formatterList')">
            <el-tooltip slot="label"
                        effect="dark"
                        content="格式化"
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

    <el-dialog title="代码编辑"
               :visible.sync="code.box"
               @close="code.obj={}"
               width="60%">
      <codeedit ref="codeedit"
                v-model="code.obj"></codeedit>
      <span slot="footer"
            class="dialog-footer">
        <el-button size="small"
                   @click="code.box=false">取 消</el-button>
        <el-button type="primary"
                   @click="codeClose"
                   size="small">确 定</el-button>
      </span>
    </el-dialog>
    <contentmenu ref="contentmenu"></contentmenu>
  </div>
</template>
<script>

import layer from './group/layer';
import top from './group/top';
import imglist from './group/imglist'
import contentmenu from './group/contentmenu'
import codeedit from './group/code';
import { dicOption, colorOption } from '@/option/config'
import init from '@/mixins/'
import { uuid } from '@/utils/utils'
import components from '@/option/components'
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
      colorOption: colorOption,
      tabsActive: 0,
    }
  },
  components: {
    imglist,
    layer,
    codeedit,
    top,
    contentmenu
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
    }
  },
  watch: {
    menuFlag () {
      this.setResize();
    },
    overactive (n, o) {
      [o, n].forEach((ele, index) => {
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
    this.listen();
  },
  mounted () {
    this.initFun()
  },
  methods: {
    rowSave (row, done) {
      this.activeOption.barColor.push(row);
      done()
    },
    rowDel (row, index) {
      this.activeOption.barColor.splice(index, 1);
    },
    rowUpdate (row, index, done) {
      this.activeOption.barColor.splice(index, 1, row);
      done()
    },
    codeClose () {
      let value = this.$refs.codeedit.getValue();
      if (this.validatenull(value)) {
        value = '{}'
      }
      try {
        if (['query', 'data'].includes(this.code.type)) {
          value = JSON.parse(value, null, 4)
        }
        if (this.code.type === 'query') {
          this.config.query = value;
        } else {
          this.activeObj[this.code.type] = value;
        }
        this.code.box = false;
      } catch (error) {
        this.$message.error('数据格式有误')
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
        this.keys.ctrl = e.metaKey;
      }
      document.onkeyup = (e) => {
        this.keys.ctrl = e.metaKey;
      }
    },
    setActive (val, result, fun) {
      const obj = this.$refs.container.handleGetObj(val);
      if (obj) obj[0][fun](result)
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
      }
    }
  }
}
</script>
<style lang="scss">
@import "../styles/style.scss";
</style>