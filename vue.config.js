module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "@/styles/echart.scss";'
      }
    }
  },
  chainWebpack: (config) => {
    //忽略的打包文件
    config.externals({
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'element-ui': 'ELEMENT',
    })
  }
}