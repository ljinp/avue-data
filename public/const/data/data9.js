Mock.mock('./data9', 'get', () => {
  const data = {
    config: {
      width: 1920,
      height: 1080,
      scale: 1,
      mark: {},
      url: '.',
      backgroundColor: '#0d2027',
      query: {}
    },
    list: [{
      "title": "文件夹",
      "name": "文件夹",
      "index": "8",
      "children": [{
        "title": "文本框",
        "name": "文本框",
        "icon": "icon-text",
        "data": "avue数据大屏",
        "left": 1189.32,
        "top": 19.08,
        "index": "1",
        "component": {
          "width": 239.92,
          "height": 26.68,
          "name": "text",
          "prop": "text"
        },
        "option": {
          "textAlign": "center",
          "fontSize": 26,
          "fontWeight": "normal",
          "color": "#fff"
        },
      }, {
        "title": "文件夹",
        "name": "文件夹",
        "index": "6",
        "children": [
          {
            "title": "文本框",
            "name": "文本框2",
            "icon": "icon-text",
            "data": "avue数据大屏1",
            "left": 289.32,
            "top": 19.08,
            "index": "5",
            "component": {
              "width": 239.92,
              "height": 26.68,
              "name": "text",
              "prop": "text"
            },
            "option": {
              "textAlign": "center",
              "fontSize": 26,
              "fontWeight": "normal",
              "color": "#fff"
            },
          }
        ]
      }]
    },
    {
      "name": "实时时间1",
      "title": "实时时间",
      "icon": "icon-datetime",
      "top": 12.72,
      "left": 1490.36,
      "index": "2",
      "component": {
        "width": 112.2,
        "height": 50,
        "name": "datetime",
        "prop": "datetime",
      },
      "option": {
        "format": "hh:mm",
        "color": "#fff",
        "textAlign": "center",
        "fontSize": 36,
        "fontWeight": "normal"
      }
    },
    {
      "name": "实时时间2",
      "title": "实时时间",
      "icon": "icon-datetime",
      "top": 23.32,
      "left": 1613.32,
      "index": "3",
      "component": {
        "width": 143.4,
        "height": 22.44,
        "name": "datetime",
        "prop": "datetime",
      },
      "option": {
        "format": "yyyy-MM-dd",
        "color": "#fff",
        "textAlign": "left",
        "fontSize": 24,
        "fontWeight": "normal"
      }
    }]
  }
  return getResult(data)
})