<template>
  <div :class="b()"
       :style="styleSizeName"
       ref="main">
    <el-carousel :type="type"
                 :indicator-position="indicator"
                 :interval="interval"
                 :height="height">
      <el-carousel-item v-for="(item,index) in dataChart"
                        :key="index"
                        @click="handleClick(item,index)">
        <img v-if="typeList.img.test(item.value)"
             :src="item.value"
             draggable="false"
             :style="styleName" />
        <video muted
               v-bind="params"
               v-else-if="typeList.video.test(item.value)"
               :src="item.value"
               :style="styleName">
        </video>
        <avue-echart-clapper v-else-if="item.type=='hls'"
                             :width="width"
                             :height="height"
                             :key="index"
                             :data="{value:item.value}"
                             :option="hlsOption"></avue-echart-clapper>
        <avue-echart-iframe v-else-if="item.type=='iframe'"
                            :width="width"
                            :height="height"
                            :data="{value:item.value}"></avue-echart-iframe>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import create from "../../create";
export default create({
  name: "swiper",
  data () {
    return {
      typeList: {
        img: /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)/,
        video: /\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|ogg|mp4)/
      }
    };
  },
  computed: {
    hlsOption () {
      return {
        autoplay: this.option.autoplay
      }
    },
    params () {
      let result = {}
      if (this.option.controls) result.controls = "controls"
      if (this.option.loop) result.loop = "loop"
      if (this.option.autoplay) result.autoplay = "autoplay"
      return result
    },
    styleName () {
      return {
        width: '100%',
        height: '100%',
        opacity: this.opacity
      };
    },
    indicator () {
      return this.opacity.indicator || "none";
    },
    opacity () {
      return (this.option.opacity || 100) * 0.01;
    },
    type () {
      return this.option.type || "";
    },
    interval () {
      return this.option.interval || 5000;
    }
  },
  created () { },
  mounted () { },
  methods: {
    handleClick (item, index) {
      this.clickFormatter && this.clickFormatter({
        type: index,
        item: item,
        value: item.value,
        data: this.dataChart
      }, this.getItemRefs());
    }
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
});
</script>


