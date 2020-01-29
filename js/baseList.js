
var baseUrl = 'https://yapi.avuejs.com'
var baseList = [{
  "label": '图表',
  "icon": 'icon-bar',
  "children": [{
    "label": '柱形图',
    "option": {
      "name": "柱状图",
      "title": "柱状图",
      "icon": 'icon-bar',
      "dataType": 1,
      "dataMethod": 'get',
      "url": baseUrl+"/bar",
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
          "barWidth": 30,
          "barRadius": 8,
          "barColor": [{
            "color1": "#83bff6",
            "color2": "#188df0",
            "postion": 90,
            "$index": 0,
            "_show": true
          }, {
            "color1": "#23B7E5",
            "color2": "#564AA3",
            "postion": 50,
            "$index": 1,
            "_show": true
          }],
          "barMinHeight": 2
        }
      }
    }
  }, {
    "label": '折线图',
    "option": {
      "name": "折线图",
      "title": "折线图",
      "icon": 'icon-line',
      "dataType": 1,
      "dataMethod": 'get',
      "url": baseUrl+"/bar",
      "time": 5000,
      "component": {
        "width": 1200,
        "height": 600,
        "name": "line",
        "prop": "line",
        "option": {
          "gridX": 105,
          "gridY": 50,
          "gridX2": 80,
          "gridY2": 100,
          "nameColor": "#eee",
          "lineColor": "#eee",
          "lineWidth": 5,
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
          "barWidth": 30,
          "barRadius": 8,
          "barColor": [{
            "color1": "#83bff6",
            "color2": "#188df0",
            "postion": 90,
            "$index": 0,
            "_show": true
          }, {
            "color1": "#23B7E5",
            "color2": "#564AA3",
            "postion": 50,
            "$index": 1,
            "_show": true
          }],
          "barMinHeight": 2
        }
      },
    }
  }, {
    label: '饼图',
    option: {
      "name": "饼图",
      "title": "饼图",
      "icon": 'icon-pie',
      "dataType": 1,
      "dataMethod": 'get',
      "time": 5000,
      "url": baseUrl+"/pie",
      "data": [],
      "resize": false,
      "component": {
        "width": 588,
        "height": 340,
        "name": "pie",
        "prop": "pie",
        "option": {
          "labelShow": true,
          "barColor": [
            {
              "color1": "#83bff6"
            },
            {
              "color1": "#23B7E5"
            },
            {
              "color1": "rgba(154, 168, 212, 1)"
            },
            {
              "color1": "#188df0"
            },
            {
              "color1": "#564AA3"
            }
          ]
        }
      },
    }
  }, {
    label: '象形图',
    option: {
      "title": "象形图",
      "name": "象形图",
      "icon": "icon-pictorialBar",
      "dataType": 1,
      "dataMethod": 'get',
      "time": 5000,
      "url": baseUrl+"/pie",
      "data": [],
      "component": {
        "width": 970,
        "height": 400,
        "name": "pictorialbar",
        "prop": "pictorialbar",
        "option": {
          symbolSize: 30,
          split: 30,
          fontSize: '24',
          xAxisShow: false,
          yAxisShow: true,
          color: '#4dffff',
          nameColor: '#564AA3',
          xNameFontSize: '24',
          yNameFontSize: '24',
        }
      }
    }
  }, {
    label: '雷达图',
    option: {
      "title": "雷达图",
      "name": "雷达图",
      "icon": "icon-radar",
      "dataType": 1,
      "dataMethod": 'get',
      "time": 5000,
      "url": baseUrl+"/radar",
      "data": [],
      "component": {
        "width": 970,
        "height": 400,
        "name": "radar",
        "prop": "radar",
        "option": {
          shape: 'polygon',
          radius: "75%",
          splitNumber: 4,
          radarNameColor: '#fff',
          areaOpacity: 0.2,
          radarNameSize: 30,
          titleFontSize: 18,
          legendShow: true,
          labelShow: true,
          "barColor": [{
            "color1": "#83bff6",
          },
          {
            "color1": "#23B7E5",
          },
          {
            "color1": "rgba(154, 168, 212, 1)",
          },
          {
            "color1": "#188df0",
          },
          {
            "color1": "#564AA3",
          }
          ]
        }
      }
    }
  }, {
    label: '散点图',
    option: {
      "title": "散点图",
      "name": "散点图",
      "icon": "icon-scatter",
      "dataType": 1,
      "dataMethod": 'get',
      "time": 5000,
      "url": baseUrl+"/scatter",
      "data": [],
      "component": {
        "width": 970,
        "height": 400,
        "name": "scatter",
        "prop": "scatter",
        "option": {
          lineSize: 25,
          barColor: [{
            postion: 0.2,
            color1: '#91c7ae'
          },
          {
            postion: 0.8,
            color1: '#63869e'
          },
          {
            postion: 1,
            color1: '#c23531'
          }]
        }
      }
    }
  }, {
    label: '漏斗图',
    option: {
      "title": "漏斗图",
      "name": "漏斗图",
      "icon": "icon-funnel",
      "dataType": 1,
      "dataMethod": 'get',
      "time": 5000,
      "url": baseUrl+"/funnel",
      "data": [],
      "component": {
        "width": 970,
        "height": 400,
        "name": "funnel",
        "prop": "funnel",
        "option": {
          radius: true,
          "barColor": [{
            "color1": "#83bff6",
          },
          {
            "color1": "#23B7E5",
          },
          {
            "color1": "rgba(154, 168, 212, 1)",
          },
          {
            "color1": "#188df0",
          },
          {
            "color1": "#564AA3",
          }
          ]
        }
      }
    }
  }, {
    label: '地图',
    option: {
      "name": "地图",
      "title": "地图",
      "icon": "icon-map",
      "data": [],
      "component": {
        "width": 1726,
        "height": 1552,
        "name": "map",
        "prop": "map",
        "option": {
          borderWidth: 3,
          "scale": 87,
          "type": 0,
          "borderColor": "#0dffff",
          "areaColor": "#061d33",
          "banner": true,
          "bannerTime": 3000,
          "fontSize": 39,
          "zoom": 1,
          "empAreaColor": "rgba(35, 183, 229, 0.42)",
          "empColor": "#fff",
          "color": "rgba(13, 255, 255, 1)",
        }
      },
    },
  }]
}, {
  "label": '文字',
  "icon": 'icon-text',
  "children": [{
    "label": '文本框',
    "option": {
      "title": "文本框",
      "name": "文本框",
      "icon": 'icon-text',
      "data": "文本框",
      "component": {
        "width": 100,
        "height": 50,
        "option": {
          "textAlign": "center",
          "fontSize": 26,
          "fontWeight": "normal",
          "color": "#fff"
        },
        "name": "text",
        "prop": "text"
      },
    },
  }, {
    "label": '跑马灯',
    "option": {
      "title": "跑马灯",
      "name": "跑马灯",
      "icon": 'icon-scroll',
      "top": 0,
      "left": 0,
      "data": "跑马灯",
      "component": {
        "width": 100,
        "height": 50,
        "option": {
          scroll: true,
          speed: 70,
          "textAlign": "center",
          "fontSize": 26,
          "fontWeight": "normal",
          "color": "#fff"
        },
        "name": "text",
        "prop": "text"
      },
    },
  }, {
    "label": '超链接',
    "option": {
      "title": "超链接",
      "name": "超链接",
      "icon": 'icon-link',
      "top": 0,
      "left": 0,
      "data": "超链接",
      "component": {
        "width": 100,
        "height": 50,
        "option": {
          link: true,
          linkHref: 'http://avue.top',
          linkTarget: '_self',
          "textAlign": "center",
          "fontSize": 26,
          "fontWeight": "normal",
          "color": "#fff"
        },
        "name": "text",
        "prop": "text"
      },
    },
  }, {
    "label": '实时时间',
    "option": {
      "name": "实时时间",
      "title": "实时时间",
      "icon": 'icon-datetime',
      "top": 78,
      "left": 1604,
      "zIndex": 31,
      "component": {
        "width": 250,
        "height": 50,
        "name": "datetime",
        "prop": "datetime",
        "option": {
          "format": 'yyyy-MM-dd hh:mm:ss',
          "color": "#fff",
          'textAlign': 'left',
          "fontSize": 24,
          "fontWeight": "normal"
        }
      }
    },
  }]
}, {
  "label": '媒体',
  "icon": 'icon-img',
  "children": [{
    "label": '图片',
    "option": {
      "title": "图片",
      "name": "图片",
      "icon": 'icon-img',
      "top": 0,
      "left": 0,
      "component": {
        "width": 140,
        "height": 140,
        "name": "img",
        "prop": "img",
        "option": {
          duration: '1000',
        }
      },
    }
  }, {
    "label": '图片框',
    "option": {
      "title": "图片框",
      "name": "图片框",
      "icon": 'icon-img',
      "top": 0,
      "left": 0,
      "component": {
        "width": 140,
        "height": 140,
        "name": "imgborder",
        "prop": "imgborder",
        "option": {
          backgroundColor: 'rgba(180, 181, 198, 0.1)',
        }
      },
    }
  }, {
    label: '轮播图',
    option: {
      "title": "轮播图",
      "name": "轮播图",
      "icon": 'icon-banner',
      "top": 0,
      "left": 0,
      "dataType": 1,
      "dataMethod": 'get',
      "time": 5000,
      "url": baseUrl+"/swiper",
      "data": [],
      "component": {
        "width": 670,
        "height": 370,
        "option": {
          type: '',
          interval: 5000,
          opacity: 100,
          indicator: 'none'
        },
        "name": "swiper",
        "prop": "swiper"
      },
    }
  }, {
    label: 'iframe',
    option: {
      "title": "iframe",
      "name": "iframe",
      "icon": 'icon-iframe',
      "top": 0,
      "left": 0,
      "dataType": 0,
      "data": {
        value: 'https://cloud.baidu.com'
      },
      "component": {
        "width": 670,
        "height": 370,
        "option": {},
        "name": "iframe",
        "prop": "iframe"
      },
    }
  }, {
    label: 'video',
    option: {
      "title": "video",
      "name": "video",
      "icon": 'icon-video',
      "top": 0,
      "left": 0,
      "dataType": 0,
      "data": {
        value: 'http://www.w3school.com.cn/i/movie.ogg'
      },
      "component": {
        "width": 670,
        "height": 370,
        "option": {},
        "name": "video",
        "prop": "video"
      },
    }
  }]
}, {
  "label": '指标',
  "icon": 'icon-flop',
  "children": [{
    "label": '翻牌器',
    "option": {
      "title": "翻牌器",
      "name": "翻牌器",
      "icon": 'icon-flop',
      "top": 0,
      "left": 0,
      "dataType": 0,
      "data": {
        value: '12345'
      },
      "component": {
        "width": 260,
        "height": 100,
        "name": "flop",
        "prop": "flop",
        "option": {
          "type": "img",
          "suffixText": "",
          "suffixTextAlign": "",
          "suffixSplit": '',
          "suffixColor": "",
          "suffixFontSize": '',
          "borderColor": "#fff",
          "borderWidth": 3,
          "backgroundBorder": "./img/border/border1.png",
          "fontSize": 42,
          "fontWeight": "normal",
          "splitx": 0,
          "splity": 0,
          "backgroundColor": "",
          "color": "#fff"
        }
      },
      "index": 10
    }
  }, {
    "label": '环形图',
    "option": {
      "title": "环形图",
      "name": "环形图",
      "icon": 'icon-circle',
      "top": 0,
      "left": 0,
      "dataType": 0,
      "data": {
        "label": "人数增涨",
        "value": 40,
        "data": 80
      },
      "component": {
        "width": 620,
        "height": 665,
        "option": {
          "type": "circle",
          "strokeWidth": 30,
          "color": "rgba(154, 168, 212, 1)",
          "fontSize": 120,
          "fontWeight": "normal",
          "suffixColor": "rgba(154, 168, 212, 1)",
          "suffixFontSize": 80,
          "suffixFontWeight": "normal",
          "borderColor": "#564AA3",
          "split": 20,
          "width": 400,
          "height": 80
        },
        "name": "progress",
        "prop": "progress"
      },
      "index": 25
    }
  }, {
    "label": '进度条',
    "option": {
      "title": "进度条",
      "name": "进度条",
      "icon": 'icon-progress',
      "top": 0,
      "left": 0,
      "data": {
        "label": "人数增涨",
        "value": 40,
        "data": 80
      },
      "component": {
        "width": 400,
        "height": 80,
        "option": {
          "type": "line",
          "color": "rgba(154, 168, 212, 1)",
          "fontSize": 24,
          "strokeWidth": 18,
          "fontWeight": "normal",
          "borderColor": "#564AA3",
          "width": 400,
          "height": 80
        },
        "name": "progress",
        "prop": "progress"
      },
      "index": 25
    }
  }, {
    label: '仪表盘',
    option: {
      "title": "仪表盘",
      "icon": 'icon-gauge',
      "name": "仪表盘",
      "dataType": 1,
      "dataMethod": 'get',
      "time": 5000,
      "url": baseUrl+"/gauge",
      "data": [],
      "component": {
        "width": 390,
        "height": 314,
        "option": {
          "lineSize": 15,
          "axisLabelShow": false,
          "axisLabelFontSize": 25,
          "nameFontSize": 20,
          "valueFontSize": 30,
          "nameColor": "",
          "lineColor": "#eee",
          "barColor": [
            {
              "color1": "rgba(154, 168, 212, 1)",
              "postion": "0.2",
            },
            {
              "color1": "#23B7E5",
              "postion": "0.8",
            },
            {
              "color1": "#564AA3",
              "postion": "1",
            }
          ]
        },
        "name": "gauge",
        "prop": "gauge"
      },
    },
  }, {
    label: '字符云',
    option: {
      "title": "字符云",
      "name": "字符云",
      "icon": "icon-wordCloud",
      "top": 725,
      "left": 3780,
      "dataType": 1,
      "dataMethod": 'get',
      "url": baseUrl+"/wordCloud",
      "time": 5000,
      "component": {
        "name": "wordcloud",
        "prop": "wordcloud",
        "width": 955,
        "height": 565,
        option: {
          minFontSize: 30,
          maxFontSize: 80,
          split: 30,
          rotate: true,
        }
      },
    }
  }]
}, {
  "label": '表格',
  "icon": 'icon-table',
  "children": [{
    "label": '表格',
    "option": {
      "title": "表格",
      "name": "表格",
      "icon": 'icon-table',
      "top": 0,
      "left": 0,
      "dataType": 0,
      "data": [{
        "type1": '数据1',
        "type2": '数据2'
      }, {
        "type1": '数据1',
        "type2": '数据2'
      }],
      "component": {
        "width": 500,
        "height": 200,
        "name": "table",
        "prop": "table",
        "option": {
          headerBackground: 'rgba(0, 0, 0, 0.01)',
          headerColor: 'rgba(154, 168, 212, 1)',
          headerTextAlign: 'center',
          bodyBackground: 'rgba(0, 0, 0, 0.01)',
          bodyColor: 'rgba(154, 168, 212, 1)',
          borderColor: 'rgba(51, 65, 107, 1)',
          bodyTextAlign: 'center',
          "column": [
            {
              "label": "类型1",
              "prop": "type1"
            },
            {
              "label": "类型2",
              "prop": "type2"
            },
          ]
        }
      },
    }
  }, {
    label: '选项卡',
    option: {
      "title": "选项卡",
      "name": "选项卡",
      "icon": "icon-tabs",
      "child": {
        "index": [],
        "paramName": ""
      },
      "dataType": 0,
      "data": [
        {
          "label": "选项卡1",
          "value": "1"
        },
        {
          "label": "选项卡2",
          "value": "2"
        }
      ],
      "component": {
        "width": 356.9128919860628,
        "height": 46.209059233449096,
        "option": {
          "type": 'tabs',
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
      "index": 36,
      "zIndex": 1
    },
  }]
}]