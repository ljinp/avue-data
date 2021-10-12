<template>
  <div class="imgItem">
    <vue-seamless-scroll :data="dataChart"
                         :class-option="defaultOption">
      <ul class="imgItem_box">
        <li class="imgItem_item"
            :style="styleName"
            v-for="(item,index) in dataChart"
            :key="index">
          <div class="imgItem_left">
            <img class="imgItem_img"
                 :src="item.img"
                 alt="" />
          </div>
          <div class="imgItem_right">
            <div class="imgItem_top">
              <span class="imgItem_name">{{item.name}}</span>
              <span>{{item.age}}</span>
              <span class="imgItem_tag">
                <span v-for="(citem,cindex) in item.tag"
                      :key="cindex"
                      :style="{backgroundColor: item.color}">{{citem}}</span>
              </span>

            </div>
            <div class="imgItem_content">
              {{item.desc}}
            </div>
          </div>
        </li>
      </ul>
    </vue-seamless-scroll>
  </div>
</template>
<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  name: 'imgList',
  components: {
    vueSeamlessScroll
  },
  props: {
    option: Object,
    component: Object
  },
  computed: {
    borderImageSource () {
      return this.option.borderImageSource || '/img/border/border1.png'
    },
    styleName () {
      return {
        marginBottom: (this.option.marginBottom || 20) + 'px',
        borderImageSource: 'url(' + this.borderImageSource + ')'
      }
    },
    defaultOption () {
      return {
        step: this.option.step, // 数值越大速度滚动越快
        limitMoveNum: this.dataChart.length,
        hoverStop: this.option.hoverStop, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }

  },
  methods: {

  }
}
</script>
<style scoped lang="scss">
.imgItem {
  width: 100%;
  height: 100%;
  overflow: hidden;
  &_box {
    box-sizing: border-box;
    padding: 20px 30px 5px 30px;
  }
  &_item {
    list-style: none;
    padding: 15px 25px;
    display: flex;
    font-size: 14px;
    align-items: center;
    color: #fff;
    border-radius: 3px;
    background-color: rgba(180, 181, 198, 0.1);
    background-clip: padding-box;
    opacity: 1;
    filter: blur(0px);
    border-image-source: url(/img/border/border1.png);
    border-image-slice: 10 16 15 10 fill;
    border-width: 10px 16px 15px 10px;
    border-style: solid;
    box-sizing: border-box;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &_img {
    width: 100px;
    height: 110px;
    padding: 2px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 5px;
  }
  &_right {
    padding-left: 20px;
  }
  &_top {
    margin-bottom: 10px;
  }
  &_tag {
    float: right;
    span {
      position: relative;
      padding: 2px 10px 2px 10px;
      font-size: 10px;
      margin-left: 10px;
    }
  }
  &_content {
    line-height: 25px;
    overflow: hidden;
    height: 80px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-indent: 2em;
  }
  &_name {
    display: inline-block;
    width: 80px;
    color: #73fbf9;
    font-weight: bold;
  }
}
</style>