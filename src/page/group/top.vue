<template>
  <div>
    <el-menu class="nav"
             mode="horizontal"
             background-color="#212528"
             text-color="#fff"
             active-text-color="#409EFF"
             @mousedown="contain.handleMouseDown">
      <el-submenu :index="index+''"
                  v-for="(item,index) in baseList"
                  :key="index">
        <template slot="title">
          <el-tooltip effect="dark"
                      :content="item.label"
                      placement="top">
            <i :class="'nav__icon iconfont '+item.icon"></i>
          </el-tooltip>
        </template>
        <el-menu-item @click="handleAdd(citem.option)"
                      :key="cindex"
                      :index="`${index}-${cindex}`"
                      v-for="(citem,cindex) in item.children">
          <i :class="'nav__icon iconfont '+citem.option.icon"></i>
          <span>{{citem.label}}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="6"
                    @click="handleReset"
                    v-show="!contain.menuFlag">
        <el-tooltip effect="dark"
                    content="还原"
                    placement="top">
          <i class="nav__icon iconfont icon-reset"></i>
        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="7"
                    @click="handleView"
                    v-show="contain.menuFlag">
        <el-tooltip effect="dark"
                    content="预览"
                    placement="top">
          <i class="nav__icon iconfont icon-view"></i>
        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="8"
                    @click="handleBuild">
        <el-tooltip effect="dark"
                    content="保存"
                    placement="top">
          <i class="nav__icon iconfont icon-build"></i>
        </el-tooltip>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { uuid } from '@/utils/utils'
import baseList from '@/option/base'
export default {
  inject: ["contain"],
  data () {
    return {
      baseList: baseList
    }
  },
  methods: {
    handleView () {
      this.contain.menuFlag = false;
      this.contain.handleInitActive();
      this.contain.setScale(document.body.clientWidth);
    },
    handleReset () {
      this.contain.menuFlag = true;
      this.contain.setScale(this.contentWidth);
    },
    handleBuild () {
      console.log(this.contain.nav)
    },
    handleAdd (option, first = false) {
      let obj = this.deepClone(option);
      obj.left = 0;
      obj.top = 0
      obj.index = uuid();
      if (first) {
        this.contain.nav.unshift(obj);
      } else {
        this.contain.nav.push(obj);
      }

    },
  }
}
</script>

<style>
.nav {
  border-bottom: 0 !important;
  height: 45px;
  line-height: 45px;
  overflow: hidden;
}
.nav__icon {
  margin-right: 5px;
}
.nav .el-submenu .el-submenu__title,
.nav .el-menu-item {
  height: 45px;
  line-height: 45px;
  font-size: 12px;
}
</style>