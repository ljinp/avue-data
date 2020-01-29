
var config = {
  name: 'avuex中心驾驶管理舱（全市）',
  width: 1920,
  height: 1080,
  scale: 1,
  backgroundImage: './img/bg/bg2.png',
  url: 'https://yapi.avuejs.com',
  mark: {},
  gradeShow: false,
  gradeLen: 30,
}
//选项卡的child配置中
//index为其他关联组件的序号,paramName为url链接参数中的key值
//最后选项卡的参数会在请求中带上相关参数,可以看f12的nextwork控制台
var list = (function () {
  return [
    {
      "name": "柱状图",
      "title": "柱状图",
      "icon": "icon-bar",
      "dataType": 1,
      "url": "${HOME_URL}/bar",
      "time": 5000,
      "component": {
        "width": 1200,
        "height": 600,
        "name": "bar",
        "prop": "bar",
        "option": {
          "gridX": 105,
          "gridY": 50,
          "gridX2": 80,
          "gridY2": 100,
          "nameColor": "#eee",
          "lineColor": "#eee",
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
          "yAxisSplitLineShow": false,
          "barWidth": 40,
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
          "barMinHeight": 2
        }
      },
      "left": 415.52,
      "top": 112.36,
      "zIndex": 0,
      "index": 0
    },
    {
      "title": "选项卡",
      "name": "选项卡",
      "icon": "icon-tabs",
      "child": {
        "index": [
          0
        ],
        "paramName": "test"
      },
      "dataType": 0,
      "data": [
        {
          "label": "选项1",
          "value": "1"
        },
        {
          "label": "选项2",
          "value": "2"
        }
      ],
      "component": {
        "width": 356.9128919860628,
        "height": 46.209059233449096,
        "option": {
          "type": "tabs",
          "color": "#eee",
          "empColor": "#4dffff",
          "fontSize": 20,
          "split": 8,
          "empBackgroundImage": "./img/banner/banner5.png",
          "backgroundImage": "./img/banner/banner4.png"
        },
        "name": "tabs",
        "prop": "tabs"
      },
      "index": 1,
      "zIndex": 1,
      "left": 837.06,
      "top": 23.32
    }
  ]
})()