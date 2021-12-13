<template>
  <div :class="b()"
       :style="styleSizeName"
       ref="main"
       @click="handleClick">
    <video muted
           :width="width"
           :height="height"
           :src="dataChart.value"
           v-bind="params"
           style="object-fit: fill">
    </video>
  </div>
</template>

<script>
import create from "../../create";
export default create({
  name: "video",
  data () {
    return {};
  },
  computed: {
    params () {
      let result = {}
      if (this.controls) result.controls = "controls"
      if (this.loop) result.loop = "loop"
      if (this.autoplay) result.autoplay = "autoplay"
      return result
    },
    loop () {
      return this.option.loop
    },
    controls () {
      return this.option.controls
    },
    autoplay () {
      return this.option.autoplay
    }
  },
  created () { },
  mounted () { },
  methods: {
    handleClick () {
      this.clickFormatter && this.clickFormatter({
        type: index,
        value: item,
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


