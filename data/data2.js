

var config = {
  name: 'avuex中心驾驶管理舱（全市）',
  width: 3840,
  height: 2160,
  scale: 1,
  backgroundImage: './img/bg/bg2.png',
  url: 'https://yapi.avuejs.com',
  mark: {},
  gradeShow: false,
  gradeLen: 30,
}
var list = (function () {
  return [
    {
      "name": "滑动组件",
      "title": "滑动组件",
      "icon": "icon-slide",
      "mask": false,
      "left": 1380.6666666666658,
      "top": 327.6666666666677,
      "zIndex": 4,
      "child": {
        "index": [
          1,
          2
        ]
      },
      "component": {
        "width": 1000,
        "height": 500,
        "name": "slide",
        "prop": "slide",
        "option": {
          "autoplay": true,
          "delay": 3000
        }
      },
      "index": 0
    },
    {
      "display": true,
      "name": "折线图",
      "title": "折线图",
      "icon": "icon-line",
      "top": 2349.3333333333335,
      "left": 1845.333333333333,
      "dataType": 1,
      "url": "${HOME_URL}/bar",
      "time": 0,
      "component": {
        "width": 924,
        "height": 442,
        "name": "line",
        "prop": "line",
        "option": {
          "legendShow": true,
          "title": "2019年度潍坊城市销售额排名",
          "titlePostion": "",
          "titleFontSize": 24,
          "titleColor": "rgb(115, 170, 229)",
          "titleLink": "http://avue.top",
          "info": "这是图表的简介",
          "width": 1282,
          "height": 600,
          "gridX": 105,
          "gridY": 50,
          "gridX2": 80,
          "gridY2": 100,
          "nameColor": "#eee",
          "lineColor": "#eee",
          "lineWidth": 7,
          "xNameFontSize": 16,
          "yNameFontSize": 16,
          "labelShow": false,
          "labelShowFontSize": 14,
          "labelShowFontWeight": 300,
          "yAxisInverse": false,
          "xAxisInverse": false,
          "xAxisShow": true,
          "yAxisShow": true,
          "xAxisSplitLineShow": false,
          "yAxisSplitLineShow": true,
          "refresh": 3000,
          "barWidth": 30,
          "barRadius": 8,
          "barColor": [
            {
              "color1": "#83bff6",
              "color2": "#188df0",
              "postion": 90,
              "$index": 0,
              "_show": true
            },
            {
              "color1": "#23B7E5",
              "color2": "#564AA3",
              "postion": 50,
              "$index": 1,
              "_show": true
            }
          ],
          "barMinHeight": 2,
          "titleShow": true,
          "areaStyle": true,
          "legendShowFontSize": 24
        }
      },
      "zIndex": 3,
      "index": 1
    },
    {
      "display": true,
      "title": "翻牌器",
      "name": "翻牌器",
      "icon": "icon-flop",
      "top": 2184.8803716608595,
      "left": 141.99070847851257,
      "data": "16.24",
      "component": {
        "width": 1450.6666666666665,
        "height": 680.5365853658536,
        "name": "flop",
        "prop": "flop",
        "option": {
          "type": "img",
          "suffixText": "",
          "suffixTextAlign": "center",
          "suffixSplit": "",
          "suffixColor": "",
          "suffixFontSize": 0,
          "borderColor": "#fff",
          "borderWidth": 3,
          "backgroundBorder": "./img/border-3.png",
          "fontSize": 38,
          "fontWeight": "normal",
          "splity": 64,
          "backgroundColor": "",
          "color": "#fff",
          "prefixText": "",
          "prefixTextAlign": "center",
          "whole": true,
          "width": 240,
          "prefixColor": "#4dffff",
          "height": 85,
          "prefixFontSize": 26,
          "prefixSplity": 7,
          "split": 0
        }
      },
      "index": 2,
      "zIndex": 2,
      "dataType": 1,
      "url": "${HOME_URL}/table3",
      "time": 0
    },
    {
      "title": "图片框",
      "name": "图片框",
      "icon": "icon-img",
      "data": "./img/border/border1.png",
      "top": 275.82,
      "left": 1323.83,
      "component": {
        "width": 1169.84,
        "height": 575.81,
        "name": "imgborder",
        "prop": "imgborder",
        "option": {
          "backgroundColor": "rgba(180, 181, 198, 0.1)"
        }
      },
      "index": 4,
      "zIndex": 0
    }
  ]
})()
