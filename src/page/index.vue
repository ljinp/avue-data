<template>
  <div class="index">
    <div class="header">
      <img src="/img/header.jpg"
           alt=""
           width="100%"
           height="210px">
      <div class="title">
        <p>
          AVUE-DATA<br />
          <small>可视化数据大屏（演示环境）</small>
        </p>
      </div>
      <el-menu class="nav"
               mode="horizontal"
               :default-active="activeName"
               background-color="rgba(0,0,0,0)"
               text-color="#fff"
               @select="handleSelect"
               active-text-color="#00baff">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          大屏管理
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-location-information"></i>
          地图管理
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-folder-opened"></i>
          分类管理
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-set-up"></i>
          数据源管理
        </el-menu-item>
        <el-menu-item index="5"
                      @click="goApi">
          接口文档
        </el-menu-item>
        <el-menu-item index="6"
                      @click="goData">
          在线文档
        </el-menu-item>

      </el-menu>
    </div>
    <div v-if="['1'].includes(activeName)"
         class="main">
      <list v-if="activeName==1"></list>
    </div>
    <el-scrollbar v-else
                  class="main">
      <maps v-if="activeName==2"></maps>
      <category v-else-if="activeName==3"></category>
      <db v-else-if="activeName==4"></db>
    </el-scrollbar>
  </div>
</template>
<script>
import list from './list/index'
import maps from './list/map'
import category from './list/category'
import db from './list/db'
export default {
  name: "index",
  components: {
    list,
    maps,
    category,
    db
  },
  data () {
    return {
      activeName: '1',
    }
  },
  created () {

  },
  methods: {
    goApi () {
      window.open('https://data.bladex.vip/doc.html')
    },
    goData () {
      window.open('https://www.kancloud.cn/smallwei/avue-doc')
    },
    handleSelect (key) {
      if (['5', '6'].includes(key)) {
        return
      }
      this.activeName = key;
    },
  }
}
</script>
<style lang="scss">
.index {
  height: 100%;
  .header {
    position: relative;
    padding: 0;
    height: auto !important;
    .nav {
      margin: 0 20px;
      width: 100%;
      position: absolute;
      bottom: 10px;
      border: none;
      .el-menu-item {
        background-color: rgba(0, 0, 0, 0) !important;
      }
    }
    .title {
      position: absolute;
      top: 30px;
      left: 30px;
      font-size: 34px;
      color: rgb(0, 186, 255);
      font-weight: 500;
    }
    .title small {
      font-size: 18px;
    }
  }
  .main {
    width: 100%;
    height: calc(100% - 220px);
  }
}
</style>