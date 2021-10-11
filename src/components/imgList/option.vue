<!-- 自定义配置 -->
<template>
  <div>
    <el-form-item label="悬停是否停止">
      <avue-switch v-model="main.activeOption.hoverStop"></avue-switch>
    </el-form-item>
    <el-form-item label="滚动时间">
      <avue-input-number v-model="main.activeOption.step"></avue-input-number>
    </el-form-item>
    <el-form-item label="间距">
      <avue-slider v-model="main.activeOption.marginBottom">
      </avue-slider>
    </el-form-item>
    <el-form-item label="背景图片">
      <img v-if="main.activeOption.borderImageSource"
           :src="main.activeOption.borderImageSource"
           alt=""
           width="100%" />
      <el-input v-model="main.activeOption.borderImageSource">
        <div @click="main.handleOpenImg('activeOption.borderImageSource','border')"
             slot="append">
          <i class="iconfont icon-img"></i>
        </div>
      </el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  inject: ["main"]
}
</script>

<style>
</style>