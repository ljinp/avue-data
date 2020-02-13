<template>
  <el-container class="list">
    <el-header>
      <el-menu :default-active="activeName"
               mode="horizontal"
               background-color="#171b22"
               text-color="#fff"
               active-text-color="#00baff"
               @select="handleSelect">
        <el-menu-item index="0"
                      @click="getList(1)">
          <i class="iconfont icon-daping"></i>
          模板库
        </el-menu-item>
        <el-menu-item index="1"
                      @click="getList(2)">
          <i class="iconfont icon-moban"></i>
          组件库
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <div class="content">
        <div class="content__item content__item--add">
          <router-link to="/build">
            <i class="el-icon-plus"></i>
            <p>新建大屏</p>
          </router-link>
        </div>
        <div class="content__item"
             v-for="(item,index) in list"
             :key="index"
             @mouseover="item._menu=true"
             @mouseout="item._menu=false">
          <div class="content__info">
            <img v-if="item.img"
                 :src="item.img"
                 alt="" />
            <div class="content__menu"
                 v-show="item._menu">
              <router-link :to="{path:'/build',query:{id:item.id}}"
                           class="content__btn">
                编辑</router-link>
            </div>
          </div>
          <div class="content__main">
            <span class="content__name">{{item.label}}</span>
            <div>
              <router-link :to="{path:'/view',query:{id:item.id}}"
                           class="content__view">
                <i class="el-icon-view"></i>
                预览
              </router-link>
              <span class="content__status"
                    :class="{'content__status--active':item.status}">
                <i class="el-icon-check"></i>
                {{item.status?'已发布':'未发布'}}
              </span>
            </div>

          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: "list",
  data () {
    return {
      activeName: '0',
      list: [],
    }
  },
  created () {
    this.getList();
  },
  methods: {
    handleSelect (key) {
      this.activeName = key;
    },
    getList (index = 1) {
      this.$httpajax.get('./list' + index).then(res => {
        this.list = res.data
        this.initData();
      })
    },
    initData () {
      this.list.forEach((ele, index) => {
        this.$set(this.list[index], '_menu', false)
      })
    }
  }
}
</script>
<style lang="scss">
@import "../styles/list.scss";
</style>