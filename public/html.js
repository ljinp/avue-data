window.html = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <link rel="icon" href="./favicon.ico">
  <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
  <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
  <META HTTP-EQUIV="Expires" CONTENT="0">
  <script src="./view.js"></script>
  <link rel="stylesheet" href="https://at.alicdn.com/t/font_1117329_z5buvlhlaf.css">
  <link rel="stylesheet" href="https://data.avuejs.com/cdn/animate/3.5.1/animate.css">
  <link rel="stylesheet" href="https://data.avuejs.com/cdn/element-ui/2.13.2/theme-chalk/index.css">
  <link rel="stylesheet" href="https://data.avuejs.com/cdn/avue/index.css">
  <link rel="stylesheet" href="https://data.avuejs.com/lib/index.css">
  <link rel="stylesheet" href="https://cdn.staticfile.org/Swiper/4.5.1/css/swiper.min.css">
  <script src="https://data.avuejs.com/cdn/echarts/4.2.1/echarts.min.js"></script>
  <script src="https://data.avuejs.com/cdn/echarts-wordcloud.min.js"></script>
  <script src="https://data.avuejs.com/const/theme/avue.project.js"></script>
  <script src="https://data.avuejs.com/const/theme/halloween.project.js"></script>
  <script src="https://data.avuejs.com/const/theme/wonderland.project.js"></script>
  <script src="https://data.avuejs.com/cdn/avue/avue.min.js"></script>
  <script src="https://data.avuejs.com/cdn/vue/2.5.2/vue.min.js" charset="utf-8"></script>
  <script src="https://data.avuejs.com/cdn/axios/1.0.0/axios.min.js" charset="utf-8"></script>
  <script src="https://data.avuejs.com/cdn/element-ui/2.13.2/index.js" charset="utf-8"></script>
  <script src="https://cdn.staticfile.org/Swiper/4.5.1/js/swiper.min.js"> </script>
  <script src="https://data.avuejs.com/lib/index.umd.min.js"></script>
  <title>avue-data数据大屏</title>
  <style>
    * {
      padding: 0;
      margin: 0;
    }
  </style>
  <script>
    function GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    }
    Vue.use(AVUE);
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