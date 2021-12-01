<template>
  <div :class="b()"
       ref="main">
    <i class="iconfont icon-datetime"></i>
  </div>
</template>

<script>
import create from "../../create";
export default create({
  name: "time",
  data () {
    return {
      check: null
    };
  },
  computed: {
    time () {
      return this.option.time;
    }
  },
  watch: {
    time: {
      handler (val) {
        if (val > 0) {
          setTimeout(() => {
            this.startTime()
          }, 1000)
        } else {
          this.stopTime();
        }
      },
      immediate: true

    }
  },
  created () { },
  mounted () {
    this.echartFormatter && this.echartFormatter(this.getItemRefs());
  },
  methods: {
    startTime () {
      this.stopTime()
      this.check = setInterval(() => {
        this.echartFormatter && this.echartFormatter(this.getItemRefs());
      }, this.time)
    },
    stopTime () {
      clearInterval(this.check)
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


