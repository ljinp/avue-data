<template>
  <div class="index">
    <div class="header">
      <img :src="`${$router.options.base}img/nav-img.png`"
           alt=""
           width="100%"
           height="220px">
      <div class="title">
        <p>
          WELCOME TO AVUE-DATA<br />
          <small>可视化数据大屏{{$website.isDemo?'（演示环境-请勿放生产数据）':''}}</small>
        </p>
      </div>
      <navs @change="handleChange"></navs>
    </div>
    <div class="main"
         v-if="activeName==0">
      <list></list>
    </div>
    <el-scrollbar class="main">
      <maps v-if="activeName==1"></maps>
      <category v-else-if="activeName==2"></category>
      <db v-else-if="activeName==3"></db>
      <iframe v-else-if="activeName==4"
              style="width:100%;height:1500px"
              src="https://data.bladex.vip/doc.html"
              frameborder="0"></iframe>
      <iframe v-else-if="activeName==5"
              style="width:100%;height:1500px"
              src="https://www.kancloud.cn/smallwei/avue-doc"
              frameborder="0"></iframe>
    </el-scrollbar>
  </div>
</template>
<script>
import list from './list/index'
import maps from './list/map'
import category from './list/category'
import db from './list/db'
import navs from './nav/index'
export default {
  name: "index",
  components: {
    navs,
    list,
    maps,
    category,
    db
  },
  data () {
    return {
      activeName: 0,
    }
  },
  methods: {
    handleChange (nav, index) {
      if (index === 6) {
        window.open('https://avuejs.com/views/vip.html', '_blank')
      } else {
        this.activeName = index;
      }

    }
  }
}
</script>
<style lang="scss">
.index {
  height: 100%;
  .header {
    position: relative;
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
      top: 60px;
      left: 20px;
      font-size: 48px;
      font-style: oblique;
      color: rgb(0, 186, 255);
      font-weight: bold;
      line-height: 35px;
    }
    .title small {
      font-size: 18px;
      color: #9cb4c2;
    }
  }
  .main {
    width: 100%;
    height: calc(100% - 220px);
  }
}
</style>
