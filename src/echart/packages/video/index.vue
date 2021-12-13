<template>
  <div :class="b()"
       :style="styleSizeName"
       ref="main"
       @click="handleClick">
    <video controls=""
           autoplay=""
           loop=""
           :width="width"
           :height="height"
           :src="dataChart.value"
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
  computed: {},
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


