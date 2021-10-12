<template>
  <div class="imgTabs">
    <div class="imgTabs__list">
      <div class="imgTabs__item"
           :class="{'imgTabs--active':index==count}"
           v-for="(item,index) in dataChart"
           :key="index"
           @click="handleItem(index)">
        <span>{{item.text}}</span>
      </div>
    </div>
    <div class="imgTabs__carousel">
      <el-carousel :direction="option.direction"
                   :interval="option.interval"
                   :autoplay="option.autoplay">
        <el-carousel-item v-for="(item,index) in active"
                          :key="index">
          <el-image style="width: 100%;"
                    :src="item"
                    fit="cover"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: 'imgTabs',
  data () {
    return {
      check: null,
      count: 0,
      active: {}
    }
  },
  props: {
    option: Object,
    component: Object
  },
  computed: {
    time () {
      return this.option.time;
    }
  },
  watch: {
    count (val) {
      this.active = this.dataChart[val].list;
    },
    dataChart (val) {
      this.active = val && val[0].list;
    },
    time (val) {
      clearInterval(this.check)
      if (val > 0) {
        this.handleTime()
      }
    }
  },
  mounted () {
    this.handleTime()
  },
  methods: {
    handleTime () {
      this.check = setInterval(() => {
        this.count++
        if (this.count >= this.dataChart.length) {
          this.count = 0
        }
      }, this.time)
    },
    handleItem (index) {
      this.count = index
    }
  }
}
</script>
<style scoped lang="scss">
.imgTabs {
  &__list {
    margin-bottom: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  &__carousel {
    margin: 0 auto;
    background-color: rgba(180, 181, 198, 0.1);
    background-clip: padding-box;
    opacity: 1;
    filter: blur(0px);
    border-image-source: url(/img/border/border1.png);
    border-image-slice: 10 16 15 10 fill;
    border-width: 10px 16px 15px 10px;
    border-style: solid;
    box-sizing: border-box;
  }
  &__item {
    width: 100%;
    height: 40px;
    background-image: url(/img/banner/banner4.png);
    background-size: 100% 100%;
    border-color: rgb(255, 255, 255);
    border-style: solid;
    border-width: 0px;
    margin: 0px 8px;
    font-size: 20px;
    color: rgb(77, 255, 255);
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }
  &--active {
    background-image: url(/img/banner/banner5.png);
    color: rgb(77, 255, 255);
  }
}
</style>