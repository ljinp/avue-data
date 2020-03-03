module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      "/visual": {
        target: "https://api.bladex.vip/blade-visual/visual",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/visual": ''
        }
      }
    }
  }
}