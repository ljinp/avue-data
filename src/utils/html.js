const dataPath = `https://data.avuejs.com`
const homePath = `https://avuejs.com`
const cdnPath = `https://cdn.bootcdn.net/ajax/libs`
export const viewHtml = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
  <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
  <META HTTP-EQUIV="Expires" CONTENT="0">
  <script src="./view.js"></script>
  <link rel="stylesheet" href="https://at.alicdn.com/t/font_1117329_z5buvlhlaf.css">
  <link rel="stylesheet" href="${cdnPath}/animate.css/3.5.1/animate.min.css">
  <link rel="stylesheet" href="${cdnPath}/element-ui/2.15.3/theme-chalk/index.min.css">
  <link rel="stylesheet" href="${homePath}/lib/index.css">
  <link rel="stylesheet" href="${dataPath}/lib/index.css">
  <link rel="stylesheet" href="${cdnPath}/Swiper/4.5.1/css/swiper.min.css">
  <script src="${cdnPath}/Swiper/4.5.1/js/swiper.min.js"> </script>
  <script src="${dataPath}/config.js"></script>
  <script src="${cdnPath}/echarts/4.2.1/echarts.min.js"></script>
  <script src="${dataPath}/cdn/echarts-wordcloud.min.js"></script>
  <script src="${dataPath}/cdn/clappr.min.js"></script>
  <script src="${dataPath}/const/theme/avue.project.js"></script>
  <script src="${dataPath}/const/theme/halloween.project.js"></script>
  <script src="${dataPath}/const/theme/wonderland.project.js"></script>
  <script src="${cdnPath}/vue/2.6.14/vue.min.js" charset="utf-8"></script>
  <script src="${cdnPath}/axios/0.21.1/axios.min.js" charset="utf-8"></script>
  <script src="${cdnPath}/element-ui/2.15.3/index.min.js" charset="utf-8"></script>
  <script src="${homePath}/lib/avue.min.js"></script>
  <script src="${dataPath}/cdn/datav.min.vue.js"></script>
  <script src="${dataPath}/lib/index.umd.min.js"></script>
  <title>avue-data数据大屏</title>
  <style>
    * {
      padding: 0;
      margin: 0;
    }
   
    body,
    html,
    #app {
      height: 100%;
    }
  </style>
  <script>
    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    }
    Vue.use(window.AVUE);
  </script>
</head>

<body>
  <div id="app">
    <avue-data :props="props" :option="option"></avue-data>
  </div>
  <script>;
    new Vue({
      el: '#app',
      data() {
        return {
          props: {
            id: GetQueryString('id'),
            name: 'view'
          },
          option: option
        }
      },
      components: {
        avueData
      }
    })
  </script>
</body>

</html>`