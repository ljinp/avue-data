<template>
  <div :class="b()"
       :style="styleSizeName"
       @click="handleClick">
    <div :id="id"
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
      id: 'player-wrapper',
      reload: true,
      config: {}
    }
  },
  computed: {
    autoplay () {
      return this.option.autoplay
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
              parentId: '#' + this.id,
              source: this.dataChart.value,
              autoPlay: this.autoplay,
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



