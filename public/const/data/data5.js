Mock.mock('./data5', 'get', () => {
  const data = {
    config: {
      name: 'avuex中心驾驶管理舱（全市）',
      width: 1920,
      height: 1080,
      scale: 1,
      backgroundImage: './img/bg/bg2.png',
      url: '.',
      mark: {},
      gradeShow: false,
      gradeLen: 30,
    },
    list: (function () {
      return [
        {
          "name": "柱状图",
          "title": "柱状图",
          "icon": "icon-bar",
          "dataType": 1,
          "url": "${HOME_URL}/bar",
          "dataFormatter": (res) => {
            //res是返回的数据格式，自己编写处理逻辑处理成标准格式
            delete res.data.series.splice(0, 1);
            console.log(res);
            res.data.categories.push('自定义')
            res.data.series[0].data.push(1333222)
            return res
          },
          "time": 0,
          "component": {
            "width": 1200,
            "height": 600,
            "name": "bar",
            "prop": "bar",
          },
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
          },
          "left": 436.72,
          "top": 273.48,
          "index": 0
        }
      ]
    })()

  }
  return getResult(data)
})
