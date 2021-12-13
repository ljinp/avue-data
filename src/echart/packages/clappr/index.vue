<template>
  <div :class="b()"
       :style="styleSizeName"
       @click="handleClick">
    <div id="player-wrapper"
         v-if="reload"
         :style="styleSizeName"></div>
  </div>
</template>

<script>
import create from "../../create";
export default create({
  name: "clapper",
  data () {
    return {
      reload: true,
      config: {}
    }
  },
  watch: {
    dataChart: {
      handler () {
        this.reload = false;
        this.$nextTick(() => {
          this.reload = true;
          setTimeout(() => {
            new Clappr.Player({
              parentId: '#player-wrapper',
              source: this.dataChart.value,
              autoPlay: true,
              mute: true,
              height: '100%',
              width: '100%'
            });
          })
        })
      },
      deep: true
    }
  },
  methods: {
    handleClick () {
      this.clickFormatter && this.clickFormatter({
        data: this.dataChart
      }, this.getItemRefs());
    }
  }
});
</script>



