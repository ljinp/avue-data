<!-- video配置 -->
<template>
  <div>
    <el-form-item label="地址">
      <avue-input v-model="main.activeObj.data.value"></avue-input>
    </el-form-item>
    <el-form-item label="自动播放">
      <avue-switch v-model="main.activeOption.autoplay"></avue-switch>
    </el-form-item>
    <el-form-item label="控制台">
      <avue-switch v-model="main.activeOption.controls"></avue-switch>
    </el-form-item>
    <el-form-item label="循环">
      <avue-switch v-model="main.activeOption.loop"></avue-switch>
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