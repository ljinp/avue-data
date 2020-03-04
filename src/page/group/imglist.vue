<template>
  <el-dialog title="图库"
             width="80%"
             :visible.sync="imgVisible">
    <el-scrollbar class="imgList">
      <img :src="item.value"
           :style="styleName"
           @click="handleSetimg(item.value)"
           v-for="(item,index) in imgOption[imgActive]"
           :key="index" />
    </el-scrollbar>
  </el-dialog>
</template>

<script>
import { imgOption } from '@/option/config'
export default {
  data () {
    return {
      imgVisible: false,
      imgObj: '',
      type: '',
      imgActive: 0,
      imgOption: imgOption,
      imgTabs: [],
    }
  },
  computed: {
    styleName () {
      if (this.type === 'background') {
        return {
          width: '200px'
        }
      }
      return {}
    }
  },
  watch: {
    type: {
      handler () {
        if (this.type === 'background') {
          this.imgActive = 0;
        } else if (this.type == 'border') {
          this.imgActive = 1;
        } else {
          this.imgActive = 2;
        }
      },
      immediate: true
    }
  },
  methods: {
    openImg (item, type) {
      this.type = type;
      this.imgObj = item
      this.imgVisible = true;
    },
    handleSetimg (item) {
      this.imgVisible = false;
      this.$emit('change', item, this.imgObj);
    }
  }
}
</script>

<style>
</style>