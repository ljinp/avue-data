
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
var list = (function () {
  return [
    {
      "name": "柱状图",
      "title": "柱状图",
      "icon": "icon-bar",
      "dataType": 1,
      "url": "${HOME_URL}/bar",
      //移动上去的提示语
      "formatter": (name, data) => {
        //name是移动上去某项的属性
        //data是返回的全部数据
        return `<div style="font-size:28px;line-height:40px;padding:5px 30px;">
                <p>自定义内容:1</p>
                <p>自定义内容:2</p>
                <p>自定义内容:3</p>
          </div>`
      },
      //柱顶提示语
      "labelFormatter": (name, data) => {
        //name每一项的相关属性
        return (name.value / 10000).toFixed(2)
      },
      "time": 0,
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
          "labelShow": true,
          "labelShowFontSize": 20,
          "labelShowColor": '#fff',
          "labelShowFontWeight": 300,
          "yAxisInverse": false,
          "xAxisInverse": false,
          "xAxisShow": true,
          "yAxisShow": true,
          "xAxisSplitLineShow": false,
          "yAxisSplitLineShow": false,
          "barWidth": 70,
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
      "left": 436.72,
      "top": 273.48,
      "zIndex": 0,
      "index": 0
    }
  ]
})()