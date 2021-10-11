<!-- 自定义配置 -->
<template>
  <div>
    <el-form-item label="自动播放">
      <avue-switch v-model="main.activeOption.autoplay"></avue-switch>
    </el-form-item>
    <el-form-item label="走马灯时间">
      <avue-input-number v-model="main.activeOption.interval"></avue-input-number>
    </el-form-item>
    <el-form-item label="走马灯方向">
      <el-select v-model="main.activeOption.direction">
        <el-option key="horizontal"
                   label="水平"
                   value="horizontal"></el-option>
        <el-option key="vertical"
                   label="垂直"
                   value="vertical"></el-option>
      </el-select>
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