let scssVariables = require('./src/styles/scss.variables.js');
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'), // This line must in sass option
      },
      scss: {
        prependData: '@import "@/styles/echart.scss";\n' +
          Object.keys(scssVariables)
            .map(k => `\$${k.replace('_', '-')}: "${scssVariables[k]}";`)
            .join('\n')
      }
    }
  },
  transpileDependencies: [
    'monaco-editor',
    '@jiaminghi/data-view'
  ],
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
