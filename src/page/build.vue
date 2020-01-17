<template>
  <div class="build">
    <el-dialog title="复制代码" :visible.sync="dataVisible" width="100%" fullscreen>
      <avue-input type="textarea" v-model="listJson" :min-rows="30"></avue-input>
    </el-dialog>
    <el-dialog title="图库" :visible.sync="imgVisible">
      <el-tabs class="tabs" stretch v-model="imgActive">
        <el-tab-pane :name="index+''" v-for="(item,index) in imgTabs" :key="index">
          <el-tooltip slot="label" effect="dark" :content="item.title" placement="top">
            <div><i class="iconfont icon-peizhi"></i></div>
          </el-tooltip>
        </el-tab-pane>
      </el-tabs>
      <el-scrollbar class="imgList">
        <img :src="item.value" @click="handleSetimg(item.value)" v-for="(item,index) in imgOption[imgActive]"
          :key="index" />
      </el-scrollbar>
    </el-dialog>
    <div class="contentmenu" v-show="contentMenu" :style="styleContentmenu" @click="contentMenu=false">
      <div class="contentmenu__item" @click="handleDel(active,zIndex)"> <i class="el-icon-close"></i>删除图层
      </div>
      <div class="contentmenu__item" @click="handleCopy(active,zIndex)"><i class="el-icon-document"></i>复制图层
      </div>
      <div class="contentmenu__item" @click="handleTop(active,zIndex)"><i class="el-icon-arrow-up"></i>置顶图层
      </div>
      <div class="contentmenu__item" @click="handleBottom(active,zIndex)"><i class="el-icon-arrow-down"></i>置底图层
      </div>
      <div class="contentmenu__item" @click="handleStepTop(active,zIndex)"><i class="el-icon-arrow-up"></i>上移一层
      </div>
      <div class="contentmenu__item" @click="handleStepBottom(active,zIndex)"><i class="el-icon-arrow-down"></i>下移一层
      </div>
    </div>
    <el-menu class="nav" mode="horizontal" background-color="#212528" text-color="#fff" active-text-color="#409EFF"
      @mousedown="handleMouseDown">
      <el-submenu :index="index+''" v-for="(item,index) in baseList" :key="index">
        <template slot="title">
          <el-tooltip effect="dark" :content="item.label" placement="top">
            <i :class="'nav__icon iconfont '+item.icon"></i>
          </el-tooltip>
        </template>
        <el-menu-item @click="addCompoment(citem.option)" :key="cindex" :index="`${index}-${cindex}`"
          v-for="(citem,cindex) in item.children">
          <i :class="'nav__icon iconfont '+citem.option.icon"></i>
          <span>{{citem.label}}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="6" @click="handleReset" v-show="!menuFlag">
        <el-tooltip effect="dark" content="还原" placement="top">
          <i class="nav__icon iconfont icon-reset"></i>
        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="7" @click="handleView" v-show="menuFlag">
        <el-tooltip effect="dark" content="预览" placement="top">
          <i class="nav__icon iconfont icon-view"></i>
        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="8" @click="handleBuild">
        <el-tooltip effect="dark" content="生成" placement="top">
          <i class="nav__icon iconfont icon-build"></i>
        </el-tooltip>
      </el-menu-item>
    </el-menu>
    <div class="app" :class="{'app--none':!menuFlag}">
      <div class="menu" v-show="menuFlag" @mousedown="handleMouseDown">
        <p class="title">图层</p>
        <draggable v-model="zIndexList">
          <div class="menu__item" v-show="!item.destruction" @contextmenu.prevent="handleContextMenu"
            :class="{'menu__item--active':item.index===active}" v-for="(item,index) in zIndexList" :key="index"
            @click="active=item.index" @mouseover="handleMouseOver(item.index)">
            <span class=" menu__icon">
              <i :class="'iconfont '+item.icon"></i>
            </span>
            <span>{{item.title}}</span>
          </div>
        </draggable>
      </div>
      <div class="middle">
        <div class="wrapper__grade" @mousedown="handleMouseDown"></div>
        <div class="wrapper" @mousedown="handleMouseDown">
          <div class="content" ref="content" @mousedown.self="handleSelectMouseDown" @mousemove="handleSelectMouseMove"
            @mouseup.self="handleSelectMouseUp">
            <div class="selectall" :style="selectStyle" v-show="selectObj.show" ref="selectall"></div>
            <div class="selectbg" v-show="selectObj.show"></div>
            <div class="selectflag" ref="selectflag" v-show="selectObj.flag" @mousedown.stop="handleMoveMouseDown"
              @mousemove="handleMoveMouseMove" @mouseup.stop="handleMoveMouseUp">
            </div>
            <div class="container" :style="styleName" ref="container" @contextmenu.prevent="handleContextMenu"
              @mousedown="handleMouseDown">
              <div class="grade" v-if="gradeFlag || config.gradeShow" :style="gradeLenStyle"></div>
              <avue-draggable v-for="(item,index) in list" :scale="stepScale" :disabled="!menuFlag" :ref="'item_'+index"
                :id="'item_'+index" :step="stepScale" @focus="handleFocus" @postion="handlePostion"
                :resize="item.resize" @resize="handleResize" v-show="!item.destruction && !item.display"
                @blur="handleBlur" @change="handleChange" :index="index" :z-index="item.zIndex"
                :width="item.component.width" :height="item.component.height" :key="index" :top="item.top"
                :left="item.left">
                <avue-echart-slide v-if="item.component.prop==='slide'" :option="item.component.option"
                  :width="item.width" :height="item.height">
                  <div class="swiper-slide" v-for="(citem,cindex) in item.child.index" :key="cindex">
                    <component :scale="stepScale" :width="item.component.width" :height="item.component.height"
                      :ref="'list_'+index" :disabled="!menuFlag" :id="'component_'+index" :animation="!menuFlag"
                      :is="'avue-echart-'+list[citem].component.name" :component="list[citem].component"
                      :data="list[citem].data" :option="list[citem].component.option"
                      :theme="list[citem].component.option.theme" :url="list[citem].url" :child="list[citem].child"
                      :time="list[citem].time" :home-url="config.url" :data-method="list[citem].dataMethod"
                      :data-type="list[citem].dataType" :data-query="handleGetQuery(list[citem])"
                      :click="handleConClick" :formatter="list[citem].formatter"
                      :click-formatter="list[citem].clickFormatter" :label-formatter="list[citem].labelFormatter"
                      :data-formatter="list[citem].dataFormatter" :title-formatter="list[citem].titleFormatter">
                    </component>
                  </div>
                </avue-echart-slide>
                <component v-else :ref="'list_'+index" :disabled="!menuFlag" :id="'component_'+index" :scale="stepScale"
                  :width="item.component.width" :height="item.component.height" :animation="!menuFlag"
                  :is="'avue-echart-'+item.component.name" :component="item.component" :data="item.data"
                  :option="item.component.option" :theme="item.component.option.theme" :url="item.url"
                  :child="item.child" :time="item.time" :home-url="config.url" :data-method="item.dataMethod"
                  :data-type="item.dataType" :data-query="handleGetQuery(item)" :click="handleConClick"
                  :formatter="item.formatter" :click-formatter="item.clickFormatter"
                  :label-formatter="item.labelFormatter" :data-formatter="item.dataFormatter"
                  :title-formatter="item.titleFormatter">
                </component>
              </avue-draggable>
            </div>
          </div>
        </div>
      </div>

      <div class="menu params" v-show="menuFlag">
        <p class="title">操作</p>
        <el-tabs class="tabs" stretch v-model="tabsActive">
          <el-tab-pane name="0">
            <el-tooltip slot="label" effect="dark" content="配置" placement="top">
              <div><i class="iconfont icon-peizhi"></i></div>
            </el-tooltip>
            <el-form label-width="120px" label-position="left" size="small">
              <!-- 组件配置 -->
              <template v-if="!vaildProp('',[undefined])">
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
                  <el-form-item label="配色选择" v-if="activeOption.switchTheme">
                    <avue-select v-model="activeOption.theme" :dic="dicOption.themeList">
                    </avue-select>
                  </el-form-item>
                </template>
                <!-- 柱状图配置 -->
                <template v-if="activeComponent.prop==='bar'">
                  <el-form-item label="竖展示">
                    <avue-switch type="textarea" v-model="activeOption.category"></avue-switch>
                  </el-form-item>
                  <el-collapse accordion>
                    <el-collapse-item title="柱体设置">
                      <el-form-item label="最大宽度">
                        <avue-slider v-model="activeOption.barWidth">
                        </avue-slider>
                      </el-form-item>
                      <el-form-item label="圆角">
                        <avue-slider v-model="activeOption.barRadius">
                        </avue-slider>
                      </el-form-item>
                      <el-form-item label="最小高度">
                        <avue-slider v-model="activeOption.barMinHeight">
                        </avue-slider>
                      </el-form-item>
                    </el-collapse-item>
                  </el-collapse>
                </template>
                <!-- 折线图配置 -->
                <template v-if="activeComponent.prop==='line'">
                  <el-form-item label="竖展示">
                    <avue-switch type="textarea" v-model="activeOption.category"></avue-switch>
                  </el-form-item>
                  <el-collapse accordion>
                    <el-collapse-item title="折线设置">
                      <el-form-item label="面积堆积">
                        <avue-switch v-model="activeOption.areaStyle"></avue-switch>
                      </el-form-item>
                      <el-form-item label="线条宽度">
                        <avue-slider v-model="activeOption.lineWidth">
                        </avue-slider>
                      </el-form-item>
                      <el-form-item label="点的大小">
                        <avue-slider v-model="activeOption.symbolSize">
                        </avue-slider>
                      </el-form-item>
                    </el-collapse-item>
                  </el-collapse>
                </template>
                <!-- 滑动配置 -->
                <template v-if="activeComponent.prop==='slide'">
                  <el-form-item label="开启轮播">
                    <avue-switch v-model="activeOption.autoplay"></avue-switch>
                  </el-form-item>
                  <template v-if="activeOption.autoplay">
                    <el-form-item label="切换时间">
                      <avue-input-number v-model="activeOption.delay"></avue-input-number>
                    </el-form-item>
                  </template>
                  <el-form-item label="子类">
                    <avue-select multiple v-model="activeObj.child.index" :dic="childList" :props="childProps">
                    </avue-select>
                  </el-form-item>
                </template>
                <!-- 字符云配置 -->
                <template v-if="activeComponent.prop==='wordcloud'">
                  <el-form-item label="最小字体">
                    <avue-input-number v-model="activeOption.minFontSize"></avue-input-number>
                  </el-form-item>
                  <el-form-item label="最大字体">
                    <avue-input-number v-model="activeOption.maxFontSize"></avue-input-number>
                  </el-form-item>
                  <el-form-item label="间距">
                    <avue-input-number v-model="activeOption.split"></avue-input-number>
                  </el-form-item>
                  <el-form-item label="旋转">
                    <avue-switch v-model="activeOption.rotate"></avue-switch>
                  </el-form-item>
                </template>
                <!-- 象形图配置 -->
                <template v-if="activeComponent.prop==='pictorialbar'">
                  <el-form-item label="图标">
                    <img :src="activeOption.symbol" width="60" />
                    <avue-input v-model="activeOption.symbol"></avue-input>
                  </el-form-item>
                  <el-form-item label="图标字号">
                    <avue-input-number v-model="activeOption.symbolSize"></avue-input-number>
                  </el-form-item>
                  <el-form-item label="字体颜色">
                    <avue-color v-model="activeOption.color"></avue-color>
                  </el-form-item>
                  <el-form-item label="轴字体颜色">
                    <avue-color v-model="activeOption.nameColor"></avue-color>
                  </el-form-item>
                  <el-form-item label="间距">
                    <avue-slider v-model="activeOption.split"></avue-slider>
                  </el-form-item>
                  <el-collapse accordion>
                    <el-collapse-item title="X轴设置">
                      <el-form-item label="显示">
                        <avue-switch v-model="activeOption.xAxisShow">
                        </avue-switch>
                      </el-form-item>
                      <el-form-item label="字号">
                        <avue-input-number v-model="activeOption.xNameFontSize">
                        </avue-input-number>
                      </el-form-item>
                    </el-collapse-item>
                    <el-collapse-item title="Y轴设置">
                      <el-form-item label="显示">
                        <avue-switch v-model="activeOption.yAxisShow">
                        </avue-switch>
                      </el-form-item>
                      <el-form-item label="字号">
                        <avue-input-number v-model="activeOption.yNameFontSize">
                        </avue-input-number>
                      </el-form-item>
                    </el-collapse-item>
                  </el-collapse>
                </template>
                <!-- 轮播配置 -->
                <template v-if="activeComponent.prop==='swiper'">
                  <el-form-item label="类型">
                    <avue-radio v-model="activeOption.type" :dic="dicOption.swiperType"></avue-radio>
                  </el-form-item>
                  <el-form-item label="轮播时间">
                    <avue-input v-model="activeOption.interval"></avue-input>
                  </el-form-item>
                  <el-form-item label="选择器">
                    <avue-radio v-model="activeOption.indicator" :dic="dicOption.swiperIndicator">
                    </avue-radio>
                  </el-form-item>
                  <el-form-item label="图片透明度">
                    <avue-slider v-model="activeOption.opacity"></avue-slider>
                  </el-form-item>
                </template>
                <!-- 刻度盘配置 -->
                <template v-if="activeComponent.prop==='gauge'">
                  <el-form-item label="刻度线粗度(像素)">
                    <avue-input-number v-model="activeOption.lineSize"></avue-input-number>
                  </el-form-item>
                  <el-form-item label="显示刻度值">
                    <avue-switch v-model="activeOption.axisLabelShow"></avue-switch>
                  </el-form-item>
                  <el-form-item label="刻度字号">
                    <avue-input-number v-model="activeOption.axisLabelFontSize"></avue-input-number>
                  </el-form-item>
                  <el-form-item label="指标名称字号">
                    <avue-input-number v-model="activeOption.nameFontSize"></avue-input-number>
                  </el-form-item>
                  <el-form-item label="指标字号">
                    <avue-input-number v-model="activeOption.valueFontSize"></avue-input-number>
                  </el-form-item>
                </template>
                <!-- 文字配置 -->
                <template v-if="activeComponent.prop==='text'">
                  <el-form-item label="文本内容">
                    <avue-input v-model="activeObj.data"></avue-input>
                  </el-form-item>
                  <el-form-item label="字体大小">
                    <avue-input-number v-model="activeOption.fontSize" :max="200"></avue-input-number>
                  </el-form-item>
                  <el-form-item label="字体颜色">
                    <avue-color v-model="activeOption.color"></avue-color>
                  </el-form-item>
                  <el-form-item label="字体间距">
                    <avue-slider v-model="activeOption.split"></avue-slider>
                  </el-form-item>
                  <el-form-item label="字体背景">
                    <avue-color v-model="activeOption.backgroundColor"></avue-color>
                  </el-form-item>
                  <el-form-item label="文字粗细">
                    <avue-select v-model="activeOption.fontWeight" :dic="dicOption.fontWeight">
                    </avue-select>
                  </el-form-item>
                  <el-form-item label="对齐方式">
                    <avue-select v-model="activeOption.textAlign" :dic="dicOption.textAlign">
                    </avue-select>
                  </el-form-item>
                  <el-collapse accordion>
                    <el-collapse-item title="跑马灯设置">
                      <el-form-item label="开启">
                        <avue-switch v-model="activeOption.scroll"></avue-switch>
                      </el-form-item>
                      <template v-if="activeOption.scroll">
                        <el-form-item label="滚动速度">
                          <avue-input v-model="activeOption.speed"></avue-input>
                        </el-form-item>
                      </template>
                    </el-collapse-item>
                    <el-collapse-item title="超链设置">
                      <el-form-item label="开启">
                        <avue-switch v-model="activeOption.link"></avue-switch>
                      </el-form-item>
                      <template v-if="activeOption.link">
                        <el-form-item label="打开方式">
                          <avue-radio v-model="activeOption.linkTarget" :dic="dicOption.target">
                          </avue-radio>
                        </el-form-item>
                        <el-form-item label="超链地址">
                          <avue-input v-model="activeOption.linkHref"></avue-input>
                        </el-form-item>
                      </template>
                    </el-collapse-item>
                  </el-collapse>
                </template>
                <!-- 实时时间配置 -->
                <template v-else-if="activeComponent.prop==='datetime'">
                  <el-form-item label="时间格式">
                    <avue-select v-model="activeOption.format" :dic="dicOption.format">
                    </avue-select>
                  </el-form-item>
                  <el-form-item label="自定义格式">
                    <avue-input v-model="activeOption.format">
                    </avue-input>
                  </el-form-item>
                  <el-form-item label="字体间距">
                    <avue-input-number v-model="activeOption.split" :max="200"></avue-input-number>
                  </el-form-item>
                  <el-form-item label="字体大小">
                    <avue-input-number v-model="activeOption.fontSize" :max="200"></avue-input-number>
                  </el-form-item>
                  <el-form-item label="字体背景">
                    <avue-color v-model="activeOption.backgroundColor"></avue-color>
                  </el-form-item>
                  <el-form-item label="对其方式">
                    <avue-select v-model="activeOption.textAlign" :dic="dicOption.textAlign">
                    </avue-select>
                  </el-form-item>
                  <el-form-item label="文字粗细">
                    <avue-select v-model="activeOption.fontWeight" :dic="dicOption.fontWeight">
                    </avue-select>
                  </el-form-item>
                  <el-form-item label="字体颜色">
                    <avue-color v-model="activeOption.color"></avue-color>
                  </el-form-item>
                </template>
                <!-- 图片配置 -->
                <template v-else-if="activeComponent.prop==='img'">
                  <el-form-item label="开启旋转">
                    <avue-switch v-model="activeOption.rotate"></avue-switch>
                  </el-form-item>
                  <el-form-item label="透明度">
                    <el-slider v-model="activeOption.opacity" :max="1" :step="0.1"></el-slider>
                  </el-form-item>
                  <template v-if="activeOption.rotate">
                    <el-form-item label="旋转时间">
                      <avue-input-number v-model="activeOption.duration"></avue-input-number>
                    </el-form-item>
                  </template>
                  <el-form-item label="缩略图">
                    <img :src="activeObj.data" alt="" width="100%" />
                  </el-form-item>
                  <el-form-item label="图片地址">
                    <el-input v-model="activeObj.data">
                      <div @click="handleOpenImg('activeObj.data')" slot="append">
                        <i class="iconfont icon-img"></i>
                      </div>
                    </el-input>
                  </el-form-item>
                </template>
                <!-- 图片框配置 -->
                <template v-else-if="activeComponent.prop==='imgborder'">
                  <el-form-item label="背景色">
                    <avue-color v-model="activeOption.backgroundColor"></avue-color>
                  </el-form-item>
                  <el-form-item label="缩略图">
                    <img :src="activeObj.data" alt="" width="100%" />
                  </el-form-item>
                  <el-form-item label="图片地址">
                    <el-input v-model="activeObj.data">
                      <div @click="handleOpenImg('activeObj.data')" slot="append">
                        <i class="iconfont icon-img"></i>
                      </div>
                    </el-input>
                  </el-form-item>
                </template>
                <!-- 进度条配置 -->
                <template v-else-if="activeComponent.prop==='progress'">
                  <el-form-item label="类型">
                    <avue-radio v-model="activeOption.type" :dic="dicOption.line">
                    </avue-radio>
                  </el-form-item>
                  <el-form-item label="间距">
                    <avue-input-number v-model="activeOption.split" :max="200"></avue-input-number>
                  </el-form-item>
                  <el-form-item label="边框颜色">
                    <avue-color v-model="activeOption.borderColor"></avue-color>
                  </el-form-item>
                  <el-form-item label="边框大小">
                    <avue-input-number v-model="activeOption.strokeWidth" :max="50"></avue-input-number>
                  </el-form-item>
                  <el-form-item label="字体大小">
                    <avue-input-number v-model="activeOption.fontSize" :max="200"></avue-input-number>
                  </el-form-item>
                  <el-form-item label="字体颜色">
                    <avue-color v-model="activeOption.color"></avue-color>
                  </el-form-item>
                  <el-form-item label="文字粗细">
                    <avue-select v-model="activeOption.FontWeight" :dic="dicOption.fontWeight">
                    </avue-select>
                  </el-form-item>
                  <el-form-item label="前缀字体大小">
                    <avue-input-number v-model="activeOption.suffixFontSize" :max="200"></avue-input-number>
                  </el-form-item>
                  <el-form-item label="前缀字体颜色">
                    <avue-color v-model="activeOption.suffixColor"></avue-color>
                  </el-form-item>
                  <el-form-item label="前缀文字粗细">
                    <avue-select v-model="activeOption.suffixFontWeight" :dic="dicOption.fontWeight">
                    </avue-select>
                  </el-form-item>
                </template>
                <!-- 地图配置 -->
                <template v-else-if="activeComponent.prop==='map'">
                  <el-form-item label="开启轮播">
                    <avue-switch v-model="activeOption.banner"></avue-switch>
                  </el-form-item>
                  <template v-if="activeOption.banner">
                    <el-form-item label="轮播时间">
                      <avue-input v-model="activeOption.bannerTime"></avue-input>
                    </el-form-item>
                  </template>
                  <template v-if="activeOption.type===0">
                    <el-form-item label="地图选择">
                      <el-select v-model="activeOption.mapKey" @change="handleMapSelect" placeholder="请选择区域选择">
                        <el-option v-for="item in dicOption.mapList" :key="item.value" :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="地图比例">
                      <avue-slider v-model="activeOption.zoom" :max="5" :step="0.1"></avue-slider>
                    </el-form-item>
                    <el-form-item label="字体大小">
                      <avue-input-number v-model="activeOption.fontSize"></avue-input-number>
                    </el-form-item>
                    <el-form-item label="字体高亮颜色">
                      <avue-color v-model="activeOption.empColor"></avue-color>
                    </el-form-item>
                    <el-form-item label="字体颜色">
                      <avue-color v-model="activeOption.color"></avue-color>
                    </el-form-item>
                    <el-form-item label="区域线">
                      <avue-input-number v-model="activeOption.borderWidth"></avue-input-number>
                    </el-form-item>
                    <el-form-item label="区域颜色">
                      <avue-color v-model="activeOption.areaColor"></avue-color>
                    </el-form-item>
                    <el-form-item label="区域高亮颜色">
                      <avue-color v-model="activeOption.empAreaColor"></avue-color>
                    </el-form-item>
                    <el-form-item label="边框颜色">
                      <avue-color v-model="activeOption.borderColor"></avue-color>
                    </el-form-item>

                  </template>
                  <template v-if="activeOption.type===1">
                    <el-form-item label="图片地址">
                      <avue-input v-model="activeOption.img"></avue-input>
                    </el-form-item>
                    <el-form-item label="地图比例">
                      <avue-slider v-model="activeOption.scale" :max="300"></avue-slider>
                    </el-form-item>
                  </template>
                </template>
                <!-- 选项卡配置 -->
                <template v-else-if="activeComponent.prop==='tabs'">
                  <el-form-item label="字体大小">
                    <avue-input-number v-model="activeOption.fontSize" :max="200"></avue-input-number>
                  </el-form-item>
                  <el-form-item label="字体颜色">
                    <avue-color v-model="activeOption.color"></avue-color>
                  </el-form-item>
                  <el-form-item label="类型">
                    <avue-radio v-model="activeOption.type" :dic="dicOption.tabsTypeList"></avue-radio>
                  </el-form-item>
                  <template v-if="activeOption.type==='tabs'">
                    <el-form-item label="字体间距">
                      <avue-input-number v-model="activeOption.split"></avue-input-number>
                    </el-form-item>
                    <el-collapse accordion>
                      <el-collapse-item title="边框设置">
                        <el-form-item label="背景颜色">
                          <avue-color v-model="activeOption.backgroundColor"></avue-color>
                        </el-form-item>
                        <el-form-item label="图标间距">
                          <avue-input-number v-model="activeOption.iconSplit"></avue-input-number>
                        </el-form-item>
                        <el-form-item label="图标大小">
                          <avue-input-number v-model="activeOption.iconSize"></avue-input-number>
                        </el-form-item>
                        <el-form-item label="缩略图">
                          <img :src="activeOption.backgroundImage" alt="" width="70%" />
                        </el-form-item>
                        <el-form-item label="背景图片">
                          <el-input v-model="activeOption.backgroundImage">
                            <div @click="handleOpenImg('activeOption.backgroundImage')" slot="append">
                              <i class="iconfont icon-img"></i>
                            </div>
                          </el-input>
                        </el-form-item>
                        <el-form-item label="边框颜色">
                          <avue-color v-model="activeOption.borderColor"></avue-color>
                        </el-form-item>
                        <el-form-item label="边框宽度">
                          <avue-input-number v-model="activeOption.borderWidth" :max="10">
                          </avue-input-number>
                        </el-form-item>
                      </el-collapse-item>
                      <el-collapse-item title="高亮设置">
                        <el-form-item label="字体高亮颜色">
                          <avue-color v-model="activeOption.empColor"></avue-color>
                        </el-form-item>
                        <el-form-item label="缩略图">
                          <img :src="activeOption.empBackgroundImage" alt="" width="70%" />
                        </el-form-item>
                        <el-form-item label="背景图片">
                          <el-input v-model="activeOption.empBackgroundImage">
                            <div @click="handleOpenImg('activeOption.empBackgroundImage')" slot="append">
                              <i class="iconfont icon-img"></i>
                            </div>
                          </el-input>
                        </el-form-item>
                        <el-form-item label="边框颜色">
                          <avue-color v-model="activeOption.empBorderColor"></avue-color>
                        </el-form-item>
                        <el-form-item label="边框宽度">
                          <avue-input-number v-model="activeOption.empBorderWidth" :max="10">
                          </avue-input-number>
                        </el-form-item>
                      </el-collapse-item>
                    </el-collapse>
                  </template>

                </template>
                <!-- 翻牌器配置 -->
                <template v-else-if="activeComponent.prop==='flop'">
                  <el-form-item label="整体">
                    <avue-switch v-model="activeOption.whole">
                    </avue-switch>
                  </el-form-item>
                  <el-form-item label="横行">
                    <avue-switch v-model="activeOption.row">
                    </avue-switch>
                  </el-form-item>
                  <el-form-item label="精度">
                    <avue-input-number v-model="activeOption.decimals">
                    </avue-input-number>
                  </el-form-item>
                  <el-collapse accordion>
                    <el-collapse-item title="边框设置">
                      <el-form-item label="间距">
                        <avue-slider v-model="activeOption.gridY"></avue-slider>
                      </el-form-item>
                      <el-form-item label="边框宽度">
                        <avue-input-number v-model="activeOption.width" :max="1000"></avue-input-number>
                      </el-form-item>
                      <el-form-item label="边框高度">
                        <avue-input-number v-model="activeOption.height" :max="1000"></avue-input-number>
                      </el-form-item>
                      <el-form-item label="边框">
                        <avue-radio v-model="activeOption.type" :dic="dicOption.border">
                        </avue-radio>
                      </el-form-item>
                      <template v-if="activeOption.type==='border'">
                        <el-form-item label="边框颜色">
                          <avue-color v-model="activeOption.borderColor"></avue-color>
                        </el-form-item>
                        <el-form-item label="边框宽度">
                          <avue-input-number v-model="activeOption.borderWidth" :max="10">
                          </avue-input-number>
                        </el-form-item>
                      </template>
                      <template v-if="activeOption.type==='img'">
                        <el-form-item label="缩略图">
                          <img :src="activeOption.backgroundBorder" alt="" width="70%" />
                        </el-form-item>
                        <el-form-item label="图片地址">
                          <el-input v-model="activeOption.backgroundBorder">
                            <div @click="handleOpenImg('activeOption.backgroundBorder')" slot="append">
                              <i class="iconfont icon-img"></i>
                            </div>
                          </el-input>
                        </el-form-item>
                      </template>
                      <el-form-item label="背景颜色">
                        <avue-color v-model="activeOption.backgroundColor"></avue-color>
                      </el-form-item>
                      <el-form-item label="缩略图">
                        <img :src="activeOption.backgroundImage" alt="" width="70%" />
                      </el-form-item>
                      <el-form-item label="背景图片">
                        <el-input v-model="activeOption.backgroundImage">
                          <div @click="handleOpenImg('activeOption.backgroundImage')" slot="append">
                            <i class="iconfont icon-img"></i>
                          </div>
                        </el-input>
                      </el-form-item>
                    </el-collapse-item>
                    <el-collapse-item title="内部设置">
                      <el-form-item label="字体大小">
                        <avue-input-number v-model="activeOption.fontSize" :max="200"></avue-input-number>
                      </el-form-item>
                      <el-form-item label="字体颜色">
                        <avue-color v-model="activeOption.color"></avue-color>
                      </el-form-item>
                      <el-form-item label="字体间距">
                        <avue-input-number v-model="activeOption.split"></avue-input-number>
                      </el-form-item>
                      <el-form-item label="文字粗细">
                        <avue-select v-model="activeOption.fontWeight" :dic="dicOption.fontWeight">
                        </avue-select>
                      </el-form-item>
                      <el-form-item label="对其方式">
                        <avue-select v-model="activeOption.textAlign" :dic="dicOption.textAlign">
                        </avue-select>
                      </el-form-item>
                    </el-collapse-item>
                    <el-collapse-item title="前缀设置">
                      <template v-if="!activeOption.whole">
                        <el-form-item label="前缀内容">
                          <avue-input v-model="activeOption.prefixText"></avue-input>
                        </el-form-item>
                      </template>
                      <template v-if="!activeOption.row">
                        <el-form-item label="对其方式">
                          <avue-select v-model="activeOption.prefixTextAlign" :dic="dicOption.textAlign">
                          </avue-select>
                        </el-form-item>
                      </template>
                      <el-form-item label="X间距">
                        <avue-slider v-model="activeOption.prefixSplitx"></avue-slider>
                      </el-form-item>
                      <el-form-item label="Y间距">
                        <avue-slider v-model="activeOption.prefixSplity"></avue-slider>
                      </el-form-item>
                      <el-form-item label="颜色">
                        <avue-color v-model="activeOption.prefixColor"></avue-color>
                      </el-form-item>
                      <el-form-item label="字体大小">
                        <avue-input-number v-model="activeOption.prefixFontSize" :max="200">
                        </avue-input-number>
                      </el-form-item>
                    </el-collapse-item>
                    <el-collapse-item title="后缀设置">
                      <template v-if="!activeOption.whole">
                        <el-form-item label="后缀内容">
                          <avue-input v-model="activeOption.suffixText"></avue-input>
                        </el-form-item>
                      </template>
                      <template v-if="!activeOption.row">
                        <el-form-item label="对其方式">
                          <avue-select v-model="activeOption.suffixTextAlign" :dic="dicOption.textAlign">
                          </avue-select>
                        </el-form-item>
                      </template>
                      <el-form-item label="X间距">
                        <avue-slider v-model="activeOption.suffixSplitx"></avue-slider>
                      </el-form-item>
                      <el-form-item label="Y间距">
                        <avue-slider v-model="activeOption.suffixSplity"></avue-slider>
                      </el-form-item>
                      <el-form-item label="颜色">
                        <avue-color v-model="activeOption.suffixColor"></avue-color>
                      </el-form-item>
                      <el-form-item label="字体大小">
                        <avue-input-number v-model="activeOption.suffixFontSize" :max="200">
                        </avue-input-number>
                      </el-form-item>
                    </el-collapse-item>
                  </el-collapse>
                </template>
                <!-- 表格配置 -->
                <template v-else-if="activeComponent.prop==='table'">
                  <el-form-item label="表头颜色">
                    <avue-color type="textarea" v-model="activeOption.headerColor"></avue-color>
                  </el-form-item>
                  <el-form-item label="表头背景">
                    <avue-color type="textarea" v-model="activeOption.headerBackgroud"></avue-color>
                  </el-form-item>
                  <el-form-item label="字体位置">
                    <avue-select v-model="activeOption.headerTextAlign" :dic="dicOption.textAlign">
                    </avue-select>
                  </el-form-item>
                  <el-form-item label="字体大小">
                    <avue-input-number v-model="activeOption.fontSize">
                    </avue-input-number>
                  </el-form-item>
                  <el-form-item label="显示行数">
                    <avue-input-number v-model="activeOption.count">
                    </avue-input-number>
                  </el-form-item>
                  <el-form-item label="开启滚动">
                    <avue-switch v-model="activeOption.scroll">
                    </avue-switch>
                  </el-form-item>
                  <el-form-item label="开启显隐">
                    <avue-switch v-model="activeOption.columnShow">
                    </avue-switch>
                  </el-form-item>
                  <template v-if="activeOption.scroll">
                    <el-form-item label="滚动时间">
                      <avue-input-number v-model="activeOption.scrollTime">
                      </avue-input-number>
                    </el-form-item>
                    <el-form-item label="滚动行数">
                      <avue-input-number v-model="activeOption.scrollCount">
                      </avue-input-number>
                    </el-form-item>
                  </template>
                  <el-form-item label="线条">
                    <avue-switch v-model="activeOption.line"></avue-switch>
                  </el-form-item>
                  <el-form-item label="开启排名">
                    <avue-switch v-model="activeOption.index"></avue-switch>
                  </el-form-item>
                  <el-form-item label="文字颜色">
                    <avue-color type="textarea" v-model="activeOption.bodyColor"></avue-color>
                  </el-form-item>
                  <el-form-item label="表格背景">
                    <avue-color type="textarea" v-model="activeOption.bodyBackgroud"></avue-color>
                  </el-form-item>
                  <el-form-item label="字体位置">
                    <avue-select v-model="activeOption.bodyTextAlign" :dic="dicOption.textAlign">
                    </avue-select>
                  </el-form-item>
                  <el-form-item label="分割线">
                    <avue-color type="textarea" v-model="activeOption.borderColor"></avue-color>
                  </el-form-item>
                  <el-form-item label="奇行颜色">
                    <avue-color type="textarea" v-model="activeOption.nthColor"></avue-color>
                  </el-form-item>
                  <el-form-item label="偶行颜色">
                    <avue-color type="textarea" v-model="activeOption.othColor"></avue-color>
                  </el-form-item>
                  <avue-crud :option="tableOption" :data="activeOption.column" @row-save="rowSave" @row-del="rowDel"
                    @row-update="rowUpdate"></avue-crud>
                </template>
                <!-- 雷达图配置 -->
                <template v-else-if="activeComponent.prop==='radar'">
                  <el-form-item label="字体大小">
                    <avue-input-number v-model="activeOption.radarNameSize" :max="200">
                    </avue-input-number>
                  </el-form-item>
                  <el-form-item label="字体颜色">
                    <avue-color v-model="activeOption.radarNameColor" :max="200">
                    </avue-color>
                  </el-form-item>
                  <el-form-item label="区域透明度">
                    <avue-slider v-model="activeOption.areaOpacity" :max="1" :step="0.1">
                    </avue-slider>
                  </el-form-item>
                </template>
                <!-- 散点图配置 -->
                <template v-else-if="activeComponent.prop==='scatter'">
                  <el-form-item label="字体大小">
                    <avue-input-number v-model="activeOption.fontSize"></avue-input-number>
                  </el-form-item>
                </template>
                <!-- 漏斗图配置 -->
                <template v-else-if="activeComponent.prop==='funnel'">

                </template>
                <!-- 饼图的配置 -->
                <template v-else-if="activeComponent.prop==='pie'">
                  <el-form-item label="字体大小">
                    <avue-input-number v-model="activeOption.fontSize"></avue-input-number>
                  </el-form-item>
                  <el-collapse accordion>
                    <el-collapse-item title="饼图设置">
                      <el-form-item label="设置为环形">
                        <avue-switch v-model="activeOption.radius"></avue-switch>
                      </el-form-item>
                      <el-form-item label="南丁格尔玫瑰">
                        <avue-switch v-model="activeOption.roseType"></avue-switch>
                      </el-form-item>
                      <el-form-item label="自动排序">
                        <avue-switch v-model="activeOption.sort"></avue-switch>
                      </el-form-item>
                      <el-form-item label="不展示零">
                        <avue-switch v-model="activeOption.notCount"></avue-switch>
                      </el-form-item>
                    </el-collapse-item>
                  </el-collapse>
                </template>
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
                        <avue-select v-model="activeOption.titlePostion" :dic="dicOption.textAlign">
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
                        <avue-select v-model="activeOption.labelShowFontWeight" :dic="dicOption.fontWeight">
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
                        <avue-slider v-model="activeOption.gridX" :max="400"></avue-slider>
                      </el-form-item>
                      <el-form-item label="顶边距(像素)">
                        <avue-slider v-model="activeOption.gridY" :max="400"></avue-slider>
                      </el-form-item>
                      <el-form-item label="右边距(像素)">
                        <avue-slider v-model="activeOption.gridX2" :max="400"></avue-slider>
                      </el-form-item>
                      <el-form-item label="底边距(像素)">
                        <avue-slider v-model="activeOption.gridY2" :max="400"></avue-slider>
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
                        <avue-select v-model="activeOption.legendPostion" :dic="dicOption.textAlign">
                        </avue-select>
                      </el-form-item>
                      <el-form-item label="布局朝向">
                        <avue-select v-model="activeOption.legendOrient" :dic="dicOption.orientList">
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
                      <avue-crud :option="colorOption" :data="activeOption.barColor" @row-save="rowSave"
                        @row-del="rowDel" @row-update="rowUpdate"></avue-crud>
                    </el-collapse-item>
                  </template>
                </el-collapse>
              </template>
              <!-- 多选配置选项 -->
              <template v-else-if="isSelect">
                <el-form-item label="水平方式">
                  <el-tooltip content="左对齐" placement="top">
                    <i class="el-icon-s-fold icon" @click="handlePostionSelect('left')"></i>
                  </el-tooltip>
                  <el-tooltip content="居中对齐" placement="top">
                    <i class="el-icon-s-operation icon" @click="handlePostionSelect('center')"></i>
                  </el-tooltip>
                  <el-tooltip content="右对齐" placement="top">
                    <i class="el-icon-s-unfold icon" @click="handlePostionSelect('right')"></i>
                  </el-tooltip>
                </el-form-item>
                <el-form-item label="垂直方式">
                  <el-tooltip content="顶对齐" placement="top">
                    <i class="el-icon-s-fold icon" @click="handlePostionSelect('top')"></i>
                  </el-tooltip>
                  <el-tooltip content="中部对齐" placement="top">
                    <i class="el-icon-s-operation icon" @click="handlePostionSelect('middle')"></i>
                  </el-tooltip>
                  <el-tooltip content="底对齐" placement="top">
                    <i class="el-icon-s-unfold icon" @click="handlePostionSelect('bottom')"></i>
                  </el-tooltip>
                </el-form-item>
                <el-form-item label-width="0">
                  <el-button type="primary" size="small" class="block" @click="handleDeleteSelect">批量删除</el-button>
                </el-form-item>
                <el-form-item label-width="0">
                  <el-button type="danger" size="small" class="block" @click="handleExectSelect">退出全选</el-button>
                </el-form-item>
              </template>
              <!-- 主屏的配置项 -->
              <template v-else>
                <el-form-item label="大屏名称">
                  <avue-input v-model="config.name"></avue-input>
                </el-form-item>
                <el-form-item label="大屏简介">
                  <avue-input v-model="config.info" type="textarea" :min-rows="5"></avue-input>
                </el-form-item>
                <el-form-item label="大屏宽度">
                  <avue-input-number v-model="config.width"></avue-input-number>
                </el-form-item>
                <el-form-item label="大屏高度">
                  <avue-input-number v-model="config.height"></avue-input-number>
                </el-form-item>
                <el-form-item label="背景颜色">
                  <avue-color v-model="config.backgroundColor"></avue-color>
                </el-form-item>
                <el-form-item label="缩略图">
                  <img :src="config.backgroundImage" alt="" width="70%" />
                </el-form-item>
                <el-form-item label="背景图片">
                  <el-input v-model="config.backgroundImage">
                    <div @click="handleOpenImg('config.backgroundImage')" slot="append">
                      <i class="iconfont icon-img"></i>
                    </div>
                  </el-input>
                </el-form-item>
                <el-form-item label="缩放">
                  <el-slider v-model="config.scale" :max="200" :format-tooltip="formatTooltip"></el-slider>
                </el-form-item>
                <el-form-item label="环境地址">
                  <avue-input type="textarea" :min-rows="5" v-model="config.url"></avue-input>
                </el-form-item>
                <el-form-item label="参数">
                  <avue-input type="textarea" :min-rows="5" v-model="queryData"></avue-input>
                </el-form-item>
                <el-form-item label="水印(预览模式有效)">
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
          <el-tab-pane name="1" v-if="vaildProp('dataList')">
            <el-tooltip slot="label" effect="dark" content="数据" placement="top">
              <div><i class="iconfont icon-peizhi"></i></div>
            </el-tooltip>
            <el-form label-width="120px" label-position="left" size="small">
              <el-form-item label="数据类型">
                <avue-radio v-model="activeObj.dataType" :dic="dicOption.dataType"></avue-radio>
              </el-form-item>
              <el-form-item label="数据值" v-if="activeObj.dataType===0">
                <avue-input type="textarea" v-model="jsonData" :min-rows="15"></avue-input>
              </el-form-item>
              <template v-if="activeObj.dataType===1">
                <el-form-item label="接口地址">
                  <avue-input type="textarea" :min-rows="6" v-model="activeObj.url"></avue-input>
                </el-form-item>
                <el-form-item label="接口方式" v-if="activeObj.dataType===1">
                  <avue-radio v-model="activeObj.dataMethod" :dic="dicOption.dataMethod"></avue-radio>
                </el-form-item>
                <el-form-item label="刷新时间">
                  <avue-input-number v-model="activeObj.time"></avue-input-number>
                </el-form-item>
              </template>
              <el-form-item label="数据处理">
                <avue-input type="textarea" :min-rows="15" v-model="activeObj.dataFormatter"></avue-input>
              </el-form-item>
              <el-form-item label-width="0">
                <el-button type="primary" size="small" class="block" @click="handleRefresh">刷新数据</el-button>
              </el-form-item>
            </el-form>

          </el-tab-pane>
          <!-- 交互事件配置 -->
          <el-tab-pane name="2" v-if="vaildProp('eventList')">
            <el-tooltip slot="label" effect="dark" content="交互" placement="top">
              <div><i class="iconfont icon-peizhi"></i></div>
            </el-tooltip>
            <el-form label-width="120px" label-position="left" size="small">
              <el-form-item label="子类">
                <avue-select multiple v-model="activeObj.child.index" :dic="childList" :props="childProps">
                </avue-select>
              </el-form-item>
              <el-form-item label="参数">
                <avue-input v-model="activeObj.child.paramName"></avue-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- 其他事件配置 -->
          <el-tab-pane name="3" v-if="vaildProp('formatterList')">
            <el-tooltip slot="label" effect="dark" content="格式化" placement="top">
              <div><i class="iconfont icon-peizhi"></i></div>
            </el-tooltip>
            <el-form label-width="120px" label-position="left" size="small">
              <el-form-item label="提示事件">
                <avue-input type="textarea" :min-rows="15" v-model="activeObj.formatter"></avue-input>
              </el-form-item>
              <el-form-item label="点击事件" v-if="vaildProp('clickFormatterList')">
                <avue-input type="textarea" :min-rows="15" v-model="activeObj.clickFormatter"></avue-input>
              </el-form-item>
              <el-form-item label="标题事件" v-if="vaildProp('labelFormatterList')">
                <avue-input type="textarea" :min-rows="15" v-model="activeObj.labelFormatter"></avue-input>
              </el-form-item>
              <el-button type="primary" size="small" class="block" @click="handleFormatter">刷新函数</el-button>
            </el-form>
          </el-tab-pane>
          <!-- 基本参数配置 -->
          <el-tab-pane name="4" v-if="isActive">
            <el-tooltip slot="label" effect="dark" content="参数" placement="top">
              <div><i class="iconfont icon-peizhi"></i></div>
            </el-tooltip>
            <el-form label-width="120px" label-position="left" size="small">
              <el-form-item label="序号">
                <avue-input v-model="active"></avue-input>
              </el-form-item>
              <el-form-item label="宽度">
                <avue-input v-model="activeComponent.width"></avue-input>
              </el-form-item>
              <el-form-item label="高度">
                <avue-input v-model="activeComponent.height"></avue-input>
              </el-form-item>
              <el-form-item label="X位置">
                <avue-input v-model="activeObj.left"></avue-input>
              </el-form-item>
              <el-form-item label="Y位置">
                <avue-input v-model="activeObj.top"></avue-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import baseList from '@/option/base'
import {imgOption,imgTabs,dicOption,tableOption,colorOption} from '@/option/config'
import {compare,stringify} from '@/utils/utils'
import vuedraggable from 'vuedraggable';
import init from '@/mixins/'
 export default{
    mixins:[init],
    data() {
      return {
        loading:'',
        childProps: {
          label: 'name',
          value: 'index'
        },
        contentWidth: 0,
        contentMenu: false,
        contentMenuX: -1000,
        contentMenuY: -1000,
        zIndex: 0,
        key: '',
        baseList: baseList,
        menuFlag: true,
        dataVisible: false,
        imgVisible: false,
        imgObj: {},
        imgOption: imgOption,
        imgTabs: imgTabs,
        imgActive: 0,
        CodeMirrorEditor: {},
        gradeFlag: false,
        form: {},
        dicOption: dicOption,
        tableOption: tableOption,
        colorOption: colorOption,
        active: -1,
        tabsActive: 0,
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
    components:{
      'draggable':vuedraggable
    },
    computed: {
      selectStyle() {
        return {
          width: this.setPx(this.selectObj.width),
          height: this.setPx(this.selectObj.height),
          left: this.setPx(this.selectObj.left),
          top: this.setPx(this.selectObj.top)
        }
      },
      isSelect() {
        return !this.validatenull(this.selectList)
      },
      isActive() {
        return this.active != -1
      },
      childList() {
        return this.list.filter(ele => {
          if (['tabs', 'slide'].includes(ele.component.prop)) {
            return false;
          }
          return true;
        })
      },
      listJson() {
        let list = this.list.filter(ele => !ele.destruction == true)
        const str = stringify(list)
        return str
      },
      stepScale() {
        let scale = Number(((1 / this.scale) * 100).toFixed(2));
        return scale
      },
      queryData: {
        get() {
          const data = this.config.query;
          if (this.isJson(data)) {
            return JSON.stringify(data, null, 4);
          }
          return '';
        },
        set(val) {
          let data;
          try {
            data = JSON.parse(val, null, 4);
            this.config.query = data
          } catch (error) {
            this.$message.error('json格式错误，检查控制台')
            this.$Log.danger(error)
          }

        },
      },
      jsonData: {
        get() {
          const data = this.activeObj.data
          if (this.isJson(data)) {
            return JSON.stringify(data, null, 4);
          }
          return '';
        },
        set(val) {
          let data;
          try {
            data = JSON.parse(val, null, 4);
            this.activeObj.data = data
          } catch (error) {
            this.$message.error('json格式错误，检查控制台')
            this.$Log.danger(error)
          }

        },
      },
      styleContentmenu() {
        return {
          left: this.setPx(this.contentMenuX),
          top: this.setPx(this.contentMenuY)
        }
      },
      zIndexList: {
        set(val) {
          const leng = val.length;
          val.forEach((ele, index) => {
            const zIndex = leng - index;
            this.$set(this.list[ele.index], 'zIndex', zIndex)
          })
        },
        get() {
          let list = [];
          list = this.list.map(ele => {
            return {
              destruction: ele.destruction,
              index: ele.index,
              title: ele.name,
              zIndex: ele.zIndex,
              icon: ele.icon
            }
          })
          list.sort(compare("zIndex"));
          return list;
        }
      },
      listLen() {
        return this.list.length || 0;
      },
      activeComponent() {
        return this.activeObj.component || {}
      },
      activeOption() {
        return this.activeComponent.option || {}
      },
      activeKey() {
        if (this.activeComponent.name === 'table') {
          return this.activeOption.column
        } else if (['bar', 'line', 'pie', 'table'].includes(this.activeComponent.name)) {
          return this.activeOption.barColor
        }
        return []
      },
      activeObj() {
        return this.list[this.active] || {}
      },
      activeNextObj() {
        return this.list[this.active - 1] || {}
      },
      activeBreakObj() {
        return this.list[this.active + 1] || {}
      },
      gradeLenStyle() {
        return {
          backgroundSize: `${this.setPx(this.config.gradeLen)} ${this.setPx(this.config.gradeLen)},${this.setPx(this.config.gradeLen)} ${this.setPx(this.config.gradeLen)}`
        }
      }
    },
    watch: {
      menuFlag() {
        this.setResize();
      },
      active(val) {
        this.list.forEach((ele, index) => {
          this.$refs['item_' + index][0].setActive(index == val)
        });
        this.$nextTick(() => {
          this.selectObj.flag = false;
          this.contentMenu = false;
        })
        this.tabsActive = '0';
      },
    },
    methods: {
      vaildProp(name, list) {
        if (list) {
          return list.includes(this.activeComponent.prop)
        }
        return this.dicOption[name].includes(this.activeComponent.prop)
      },
      handleMoveMouseUp() {
        this.moveObj.show = false;
      },
      handleMoveMouseDown(e) {
        const x = e.offsetX
        const y = e.offsetY
        this.moveObj.startX = x
        this.moveObj.startY = y
        this.moveObj.show = true;
      },
      handleMoveMouseMove(e) {
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
      handleSelectMouseDown(e) {
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
        this.handleMouseDown();
      },
      handleSelectMouseMove(e) {
        if (this.selectObj.show) {
          const x = e.layerX
          const y = e.layerY;
          this.selectObj.width = this.selectObj.width + x - this.selectObj.startX
          this.selectObj.height = this.selectObj.height + y - this.selectObj.startY
          this.selectObj.startX = x
          this.selectObj.startY = y
        }
      },
      handleSelectMouseUp() {
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
      handlePostionSelect(postion) {
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
      handleMoveSelectList(left, top, type, postion) {
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
      handleGetSelectList() {
        this.selectList = [];
        this.list.forEach((ele, index) => {
          const left = ele.left;
          const top = ele.top;
          if ((!ele.destruction && !ele.display)) {
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
      handleCalcPostionSelect() {
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
      handleDeleteSelect() {
        this.selectList.forEach(index => {
          this.$set(this.list[index], 'destruction', true)
        })
        this.selectList = [];
        this.selectObj.flag = false;
      },
      handleExectSelect() {
        this.selectList.forEach(index => {
          this.$refs['item_' + index][0].setActive(false)
        })
        this.selectList = [];
        this.selectObj.flag = false;
      },
      handleFormatter() {
        try {
          this.activeObj.formatter = eval(this.activeObj.formatter);
          this.activeObj.clickFormatter = eval(this.activeObj.clickFormatter);
          this.activeObj.labelFormatter = eval(this.activeObj.labelFormatter);
          this.$message.success('刷新成功')
        } catch (error) {
          this.$message.error('检测参数错误，检查控制台')
          this.$Log.danger(error)
        }
      },
      handleRefresh() {
        this.activeObj.dataFormatter = eval(this.activeObj.dataFormatter);
        this.$refs['list_' + this.active][0].updateData();
        this.$message.success('刷新成功')
      },
      handleMouseOver(val) {
        this.list.forEach((ele, index) => {
          this.$refs['item_' + index][0].setOverActive(index === val)
        });
      },
      startLoading(){
        this.loading = this.$loading({
          lock: true,
          text: '正在加载中，请稍后',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      },
      stopLoading(){
        this.loading.close();
      },
      formatTooltip(val) {
        return parseInt(val);
      },
      handleMouseDown() {
        this.active = -1;
      },
      handleTop() {
        this.activeObj.zIndex = this.listLen + 1;
      },
      handleStepTop() {
        this.activeObj.zIndex = this.activeObj.zIndex + 1;
        if (this.activeNextObj) this.activeNextObj.zIndex = this.activeNextObj.zIndex - 1;
      },
      handleStepBottom() {
        this.activeObj.zIndex = this.activeObj.zIndex - 1;
        if (this.activeBreakObj) this.activeBreakObj.zIndex = this.activeBreakObj.zIndex + 1
      },
      handleBottom(active) {
        this.list[active].zIndex = -1;
      },
      handleMapSelect(value) {
        this.activeOption.mapList = this.dicOption.mapList[value].list;
      },
      handleContextMenu(e) {
        this.$nextTick(() => {
          if (this.active === -1) {
            this.contentMenu = false;
          } else {
            this.contentMenuX = e.clientX;
            this.contentMenuY = e.clientY;
            this.contentMenu = true;
          }
        })
      },
      handleChange(index, zindex) {
        this.active = index;
        this.zIndex = zindex;
        this.contentMenu = false;
      },
      handleFocus() {
        this.gradeFlag = true;
      },
      handleBlur() {
        this.gradeFlag = false;
      },
      handleDel(index) {
        const obj = this.list[index]
        this.$confirm(`是否删除${obj.name}图层?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.active = -1;
          this.$set(this.list[index], 'destruction', true)
        }).catch(() => {

        });
      },
      handleCopy(index) {
        const obj = this.list[index]
        this.addCompoment(obj);
      },
      handleResize({ index, width, height }) {
        const ele = this.list[index].component;
        this.$set(ele, 'width', width)
        this.$set(ele, 'height', height)

      },
      handlePostion({ index, left, top }) {
        const ele = this.list[index];
        this.$set(ele, 'left', left)
        this.$set(ele, 'top', top)
      },
      rowSave(row, done) {
        this.activeKey.push(row);
        done()
      },
      rowDel(row, index) {
        this.activeKey.splice(index, 1);
      },
      rowUpdate(row, index, done) {
        this.activeKey.splice(index, 1, row);
        done()
      },
      addCompoment(option) {
        const obj = this.deepClone(option);
        obj.left = 0;
        obj.top = 0;
        obj.zIndex = this.listLen;
        obj.index = this.listLen;
        this.list.push(obj);
      },
      handleView() {
        this.menuFlag = false;
        this.active = -1;
        this.setScale(document.body.clientWidth);
      },
      handleReset() {
        this.menuFlag = true;
        this.setScale(this.contentWidth);
      },
      handleBuild() {
        this.dataVisible = true;
      },
      handleOpenImg(item) {
        this.imgObj = item
        this.imgVisible = true;
      },
      handleSetimg(val) {
        if (this.imgObj === 'activeObj.data') {
          this.activeObj.data = val;
        } else if (this.imgObj === 'activeOption.backgroundImage') {
          this.activeOption.backgroundImage = val;
        } else if (this.imgObj === 'activeOption.backgroundBorder') {
          this.activeOption.backgroundBorder = val;
        } else if (this.imgObj === 'activeOption.empBackgroundBorder') {
          this.activeOption.empBackgroundBorder = val;
        } else if (this.imgObj === 'config.backgroundImage') {
          this.config.backgroundImage = val;
        }
        this.imgVisible = false;
      }
    }
  }
</script>
<style lang="scss">
@import "../styles/style.scss";
</style>