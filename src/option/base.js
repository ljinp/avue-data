
//基础公共url
var baseUrl = '.'
//基础组件库
export default [{
  "label": '图表',
  "icon": 'icon-bar',
  "children": [{
    "label": '通用型',
    "option": {
      "name": "通用型",
      "title": "通用型",
      "icon": 'icon-bar',
      "img": require('@/assets/text5.png'),
      "dataType": 1,
      "dataMethod": 'get',
      "data": {
        "categories": [
          "苹果",
          "三星",
          "小米",
          "oppo",
          "vivo"
        ],
        "series": [{
          "name": "手机品牌",
          "data": [
            1000879,
            3400879,
            2300879,
            5400879,
            3400879
          ]
        }]
      },
      "echartFormatter": "(data)=>{\nconsole.log(data);\nreturn {\n            title: {\n\t\t\t\t textStyle: {\n\t\t\t\t\tfontWeight: 'normal',      \n\t\t\t\t\tcolor: '#fff'\n\t\t\t\t},\n                text: 'ECharts 入门示例'\n            },\n            tooltip: {},\n            legend: {\n                data:['销量'],\n\t\t\t\ttextStyle: {\n\t\t\t\t\tfontWeight: 'normal',      \n\t\t\t\t\tcolor: '#fff'\n\t\t\t\t},\n            },\n            xAxis: {\n                data: [\"衬衫\",\"羊毛衫\",\"雪纺衫\",\"裤子\",\"高跟鞋\",\"袜子\"]\n            },\n            yAxis: {},\n            series: [{\n                name: '销量',\n                type: 'bar',\n                data: [5, 20, 36, 10, 10, 20]\n            }]\n        };\n}",
      "dataFormatter": "",
      "stylesFormatter": "",
      "url": baseUrl + "/bar",
      "time": 5000,
      "component": {
        "width": 600,
        "height": 300,
        "name": "common",
        "prop": "common",
      },
    }
  }, {
    label: '自定义',
    option: {
      "name": "自定义",
      "title": "自定义",
      "icon": 'icon-bar',
      "img": require('@/assets/text4.png'),
      "dataType": 0,
      "data": [],
      "dataFormatter": "",
      "stylesFormatter": "",
      "component": {
        "width": 800,
        "height": 500,
        "name": "test",
        "prop": "test",
      },
      "option": {
        "fontSize": 20,
      }
    }
  }, {
    "label": 'datav',
    "option": {
      "name": "datav",
      "title": "datav",
      "icon": 'icon-bar',
      "img": require('@/assets/text6.png'),
      "dataType": 1,
      "dataMethod": 'get',
      "data": {
        "categories": [
          "苹果",
          "三星",
          "小米",
          "oppo",
          "vivo"
        ],
        "series": [{
          "name": "手机品牌",
          "data": [
            1000879,
            3400879,
            2300879,
            5400879,
            3400879
          ]
        }]
      },
      "dataFormatter": "",
      "echartFormatter": "(data)=>{\n  console.log(data);\n  return {\n    config:{\n\t  data: [66] \n\t}\n  }\n}",
      "url": baseUrl + "/bar",
      "time": 5000,
      "component": {
        "width": 150,
        "height": 200,
        "name": "datav",
        "prop": "datav",
      },
      "option": {
        "is": 'dv-water-level-pond'
      }
    }
  }, {
    "label": '柱形图',
    "option": {
      "name": "柱状图",
      "title": "柱状图",
      "icon": 'icon-bar',
      "img": require('@/assets/bar.png'),
      "dataType": 1,
      "dataMethod": 'get',
      "data": {
        "categories": [
          "苹果",
          "三星",
          "小米",
          "oppo",
          "vivo"
        ],
        "series": [{
          "name": "手机品牌",
          "data": [
            1000879,
            3400879,
            2300879,
            5400879,
            3400879
          ]
        }]
      },
      "dataFormatter": "",
      "stylesFormatter": "",
      "url": baseUrl + "/bar",
      "time": 5000,
      "component": {
        "width": 600,
        "height": 300,
        "name": "bar",
        "prop": "bar",
      },
      "option": {
        "gridX": 90,
        "gridY": 0,
        "gridX2": 0,
        "gridY2": 0,
        "legend": true,
        "nameColor": "#eee",
        "lineColor": "#eee",
        "xNameFontSize": 16,
        "yNameFontSize": 16,
        "labelShow": true,
        "labelShowColor": '#fff',
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
  }, {
    "label": '折线图',
    "option": {
      "name": "折线图",
      "title": "折线图",
      "icon": 'icon-line',
      "img": require('@/assets/line.png'),
      "dataType": 1,
      "dataMethod": 'get',
      "data": {
        "categories": [
          "苹果",
          "三星",
          "小米",
          "oppo",
          "vivo"
        ],
        "series": [{
          "name": "手机品牌",
          "data": [
            1000879,
            3400879,
            2300879,
            5400879,
            3400879
          ]
        }]
      },
      "dataFormatter": "",
      "stylesFormatter": "",
      "url": baseUrl + "/bar",
      "time": 5000,
      "component": {
        "width": 600,
        "height": 300,
        "name": "line",
        "prop": "line",
      },
      "option": {
        "gridX": 90,
        "gridY": 0,
        "gridX2": 0,
        "gridY2": 0,
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
        "symbolSize": 6,
        "smooth": true,
        "barMinHeight": 2
      }
    }
  }, {
    label: '饼图',
    option: {
      "name": "饼图",
      "title": "饼图",
      "icon": 'icon-pie',
      "img": require('@/assets/pie.png'),
      "dataType": 1,
      "dataMethod": 'get',
      "time": 5000,
      "url": baseUrl + "/pie",
      "data": [{
        "name": "苹果",
        "value": 1000879,
        "url": "http://www.baidu.com"
      }, {
        "name": "三星",
        "value": 3400879,
        "url": "http://www.baidu.com"
      }, {
        "name": "小米",
        "value": 2300879,
        "url": "http://www.baidu.com"
      }, {
        "name": "oppo",
        "value": 5400879,
        "url": "http://www.baidu.com"
      }, {
        "name": "大疆",
        "value": 3000,
        "url": "http://www.baidu.com"
      }, {
        "name": "抖音",
        "value": 2000,
        "url": "http://www.baidu.com"
      }],
      "dataFormatter": "",
      "stylesFormatter": "",
      "resize": false,
      "component": {
        "width": 600,
        "height": 300,
        "name": "pie",
        "prop": "pie",
      },
      "option": {
        "legend": true,
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
    }
  }, {
    label: '象形图',
    option: {
      "title": "象形图",
      "name": "象形图",
      "icon": "icon-pictorialBar",
      "img": require('@/assets/bar2.png'),
      "dataType": 1,
      "dataMethod": 'get',
      "time": 5000,
      "url": baseUrl + "/pie",
      "data": [{
        "name": "苹果",
        "value": 1000879,
      }, {
        "name": "三星",
        "value": 3400879,
      }, {
        "name": "小米",
        "value": 2300879,
      }, {
        "name": "oppo",
        "value": 5400879,
      }, {
        "name": "大疆",
        "value": 3000,
      }, {
        "name": "抖音",
        "value": 2000,
      }],
      "dataFormatter": "",
      "stylesFormatter": "",
      "component": {
        "width": 600,
        "height": 300,
        "name": "pictorialbar",
        "prop": "pictorialbar",
      },
      "option": {
        symbolSize: 30,
        split: 30,
        symbol: '/img/source/source256.png',
        fontSize: '24',
        xAxisShow: false,
        yAxisShow: true,
        color: '#4dffff',
        nameColor: '#564AA3',
        xNameFontSize: '24',
        yNameFontSize: '24',
      }
    }
  }, {
    label: '雷达图',
    option: {
      "title": "雷达图",
      "name": "雷达图",
      "icon": "icon-radar",
      "img": require('@/assets/radar.png'),
      "dataType": 1,
      "dataMethod": 'get',
      "time": 5000,
      "url": baseUrl + "/radar",
      "data": {
        indicator: [{
          name: '销售',
          max: 6500
        },
        {
          name: '管理',
          max: 16000
        },
        {
          name: '信息技术',
          max: 30000
        },
        {
          name: '客服',
          max: 38000
        },
        {
          name: '研发',
          max: 52000
        },
        {
          name: '市场',
          max: 25000
        }
        ],
        series: [{
          data: [{
            value: [4300, 10000, 28000, 35000, 50000, 19000],
            name: '预算分配（Allocated Budget）'
          },
          {
            value: [5000, 14000, 28000, 31000, 42000, 21000],
            name: '实际开销（Actual Spending）'
          }
          ]
        }]
      },
      "dataFormatter": "",
      "stylesFormatter": "",
      "component": {
        "width": 970,
        "height": 400,
        "name": "radar",
        "prop": "radar",
      },
      "option": {
        width: '100%',
        height: 600,
        titleShow: true,
        title: '各部门开销',
        subtext: '最近一个月',
        titleColor: '#666',
        tipBackgroundColor: 'rgba(50,50,50,0.7)',
        tipColor: "#fff",
        shape: 'polygon',
        radius: "75%",
        splitNumber: 4,
        radarNameColor: '#fff',
        radarNameSize: 18,
        titleFontSize: 18,
        areaOpacity: 0.3,
        legend: true,
        // labelShow: true,
        "barColor": [{
          "color1": "#564AA3",
        },
        {
          "color1": "#188df0",
        }
        ]
      },
    }
  }, {
    label: '散点图',
    option: {
      "title": "散点图",
      "name": "散点图",
      "icon": "icon-scatter",
      "img": require('@/assets/scatter.png'),
      "dataType": 1,
      "dataMethod": 'get',
      "time": 5000,
      "url": baseUrl + "/scatter",
      "data": [{
        "data": [
          [1, 8.04],
          [2, 6.95]
        ]
      },
      {
        "data": [
          [1, 4.04],
          [2, 3.95]
        ]
      }],
      "dataFormatter": "",
      "stylesFormatter": "",
      "component": {
        "width": 600,
        "height": 300,
        "name": "scatter",
        "prop": "scatter",
      },
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
  }, {
    label: '漏斗图',
    option: {
      "title": "漏斗图",
      "name": "漏斗图",
      "icon": "icon-funnel",
      "img": require('@/assets/funnel.png'),
      "dataType": 1,
      "dataMethod": 'get',
      "time": 5000,
      "url": baseUrl + "/funnel",
      "data": [{
        value: 335,
        name: '直接访问'
      },
      {
        value: 310,
        name: '邮件营销'
      },
      {
        value: 234,
        name: '联盟广告'
      }],
      "dataFormatter": "",
      "stylesFormatter": "",
      "component": {
        "width": 400,
        "height": 300,
        "name": "funnel",
        "prop": "funnel",
      },
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
  }, {
    label: '地图',
    option: {
      "name": "地图",
      "title": "地图",
      "icon": "icon-map",
      "img": require('@/assets/map.png'),
      "data": [],
      "dataFormatter": "",
      "stylesFormatter": "",
      "component": {
        "width": 800,
        "height": 500,
        "name": "map",
        "prop": "map",
      },
      "option": {
        "borderWidth": 1,
        "scale": 87,
        "type": 0,
        "borderColor": "#0dffff",
        "areaColor": "#061d33",
        "banner": true,
        "bannerTime": 3000,
        "fontSize": 14,
        "zoom": 0.5,
        "empAreaColor": "rgba(35, 183, 229, 0.42)",
        "empColor": "#fff",
        "index": "894edc1d-d2f0-4616-962c-8e61083ada71",
        "mapData": "https://data.bladex.vip/blade-visual/map/data?id=1235103352843448322",
        "color": "rgba(13, 255, 255, 1)",
      }
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
      "img": require('@/assets/text.png'),
      "dataType": 0,
      "dataFormatter": "",
      "stylesFormatter": "",
      "child": {
        "index": [],
        "paramName": ""
      },
      "data": {
        value: '文本框'
      },
      "component": {
        "width": 100,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 26,
        "fontWeight": "normal",
        "color": "#fff"
      },
    },
  }, {
    "label": '跑马灯',
    "option": {
      "title": "跑马灯",
      "name": "跑马灯",
      "icon": 'icon-scroll',
      "img": require('@/assets/text2.png'),
      "top": 0,
      "left": 0,
      "dataType": 0,
      "data": {
        value: "跑马灯"
      },
      "dataFormatter": "",
      "stylesFormatter": "",
      "component": {
        "width": 100,
        "height": 50,
        "name": "text",
        "prop": "text"
      },
      "option": {
        scroll: true,
        speed: 70,
        "textAlign": "center",
        "fontSize": 26,
        "fontWeight": "normal",
        "color": "#fff"
      },
    },
  }, {
    "label": '超链接',
    "option": {
      "title": "超链接",
      "name": "超链接",
      "icon": 'icon-link',
      "img": require('@/assets/text3.png'),
      "top": 0,
      "left": 0,
      "data": {
        "value": "超链接"
      },
      "dataFormatter": "",
      "stylesFormatter": "",
      "component": {
        "width": 100,
        "height": 50,
        "name": "text",
        "prop": "text"
      },
      "option": {
        link: true,
        linkHref: 'http://avue.top',
        linkTarget: '_self',
        "textAlign": "center",
        "fontSize": 26,
        "fontWeight": "normal",
        "color": "#fff"
      },
    },
  }, {
    "label": '实时时间',
    "option": {
      "name": "实时时间",
      "title": "实时时间",
      "icon": 'icon-datetime',
      "img": require('@/assets/datetime.png'),
      "top": 78,
      "left": 1604,
      "component": {
        "width": 250,
        "height": 50,
        "name": "datetime",
        "prop": "datetime",
      },
      "option": {
        "format": 'yyyy-MM-dd hh:mm:ss',
        "color": "#fff",
        'textAlign': 'left',
        "fontSize": 24,
        "fontWeight": "normal"
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
      "img": require('@/assets/img.png'),
      "top": 0,
      "left": 0,
      "dataType": 0,
      "data": {
        value: ''
      },
      "dataFormatter": "",
      "stylesFormatter": "",
      "component": {
        "width": 140,
        "height": 140,
        "name": "img",
        "prop": "img",
      },
      "option": {
        duration: '1000',
      }
    }
  }, {
    "label": '图片框',
    "option": {
      "title": "图片框",
      "name": "图片框",
      "icon": 'icon-img',
      "img": require('@/assets/imgborder.png'),
      "top": 0,
      "left": 0,
      "component": {
        "width": 140,
        "height": 140,
        "name": "imgborder",
        "prop": "imgborder",
      },
      "option": {
        backgroundColor: 'rgba(180, 181, 198, 0.1)',
      }
    }
  }, {
    label: '轮播图',
    option: {
      "title": "轮播图",
      "name": "轮播图",
      "icon": 'icon-banner',
      "img": require('@/assets/swiper.png'),
      "top": 0,
      "left": 0,
      "dataType": 1,
      "dataMethod": 'get',
      "time": 5000,
      "url": baseUrl + "/swiper",
      "data": [
        {
          value: 'https://img.alicdn.com/tfs/TB1v28TC8v0gK0jSZKbXXbK2FXa-1880-640.jpg',
        }, {
          value: 'https://img.alicdn.com/tfs/TB1uevcCrj1gK0jSZFuXXcrHpXa-1880-640.jpg',
        }],
      "dataFormatter": "",
      "stylesFormatter": "",
      "component": {
        "width": 670,
        "height": 370,
        "name": "swiper",
        "prop": "swiper"
      },
      "option": {
        type: '',
        interval: 5000,
        opacity: 100,
        indicator: 'none'
      },
    }
  }, {
    label: 'iframe',
    option: {
      "title": "iframe",
      "name": "iframe",
      "icon": 'icon-iframe',
      "img": require('@/assets/iframe.png'),
      "top": 0,
      "left": 0,
      "component": {
        "width": 670,
        "height": 370,
        "option": {},
        "name": "iframe",
        "prop": "iframe"
      },
      "option": {},
      "dataType": 0,
      "data": {
        value: 'https://avuejs.com'
      },
      "dataFormatter": "",
      "stylesFormatter": ""
    }
  }, {
    label: 'video播放器',
    option: {
      "title": "video",
      "name": "video",
      "icon": 'icon-video',
      "img": require('@/assets/video.png'),
      "top": 0,
      "left": 0,
      "dataType": 0,
      "data": {
        value: 'http://www.w3school.com.cn/i/movie.ogg'
      },
      "option": {},
      "dataFormatter": "",
      "stylesFormatter": "",
      "component": {
        "width": 670,
        "height": 370,
        "option": {},
        "name": "video",
        "prop": "video"
      },
    }
  }, {
    label: 'hls播放器',
    option: {
      "title": "hls",
      "name": "hls",
      "icon": 'icon-video',
      "img": require('@/assets/video.png'),
      "top": 0,
      "left": 0,
      "dataType": 0,
      "data": {
        value: 'https://open.ys7.com/v3/openlive/E10668433_1_1.m3u8?expire=1664027961&id=363444666731335680&t=346b970f0d5cb5d5b5e4734d966275a61fb9efd5038c7a75b7435423c5716908&ev=100'
      },
      "option": {},
      "dataFormatter": "",
      "stylesFormatter": "",
      "component": {
        "width": 670,
        "height": 370,
        "option": {},
        "name": "clapper",
        "prop": "clapper"
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
      "img": require('@/assets/flop.png'),
      "top": 0,
      "left": 0,
      "dataType": 0,
      "child": {
        "index": [],
        "paramName": ""
      },
      "data": {
        value: '12345'
      },
      "dataFormatter": "",
      "stylesFormatter": "",
      "component": {
        "width": 300,
        "height": 100,
        "name": "flop",
        "prop": "flop",
      },
      "option": {
        "type": "img",
        "suffixText": "",
        "suffixTextAlign": "",
        "suffixSplit": '',
        "suffixColor": "",
        "suffixFontSize": '',
        "borderColor": "#fff",
        "borderWidth": 3,
        "backgroundBorder": "/img/border/border1.png",
        "fontSize": 32,
        "fontWeight": "normal",
        "splitx": 0,
        "splity": 0,
        "backgroundColor": "",
        "color": "#fff"
      },
    }
  }, {
    "label": '颜色块',
    "option": {
      "title": "颜色块",
      "name": "颜色块",
      "icon": 'icon-flop',
      "img": require('@/assets/flop2.png'),
      "child": {
        "index": [],
        "paramName": ""
      },
      "top": 0,
      "left": 0,
      "dataType": 0,
      "data": [{
        "backgroundColor": '#67C23A',
        "prefixText": "某某某总人数",
        "value": '12345',
        "suffixText": '人',
      }, {
        "backgroundColor": '#409EFF',
        "prefixText": "某某某总人数",
        "value": '12345',
        "suffixText": '人',
      }, {
        "backgroundColor": '#E6A23C',
        "prefixText": "某某某总人数",
        "value": '12345',
        "suffixText": '人',
      }, {
        "backgroundColor": '#F56C6C',
        "prefixText": "某某某总人数",
        "value": '12345',
        "suffixText": '人',
      }, {
        "backgroundColor": '#7232dd',
        "prefixText": "某某某总人数",
        "value": '12345',
        "suffixText": '人',
      }, {
        "backgroundColor": 'blue',
        "prefixText": "某某某总人数",
        "value": '12345',
        "suffixText": '人',
      }],
      "dataFormatter": "",
      "stylesFormatter": "",
      "component": {
        "width": 888,
        "height": 203,
        "name": "flop",
        "prop": "flop",
      },
      "option": {
        "span": 3,
        "decimals": 2,
        "whole": true,
        "padding": 12,
        "textAlign": 'left',
        "splity": 23,
        "splitx": 17,
        "fontSize": 28,
        "prefixSplity": 4,
        "prefixFontSize": 13,
        "backgroundColor": "#F56C6C",
        "suffixText": '人',
        "suffixInline": true,
        "suffixSplitx": 10,
        "suffixFontSize": 18,
      },
    }
  }, {
    "label": '环形图',
    "option": {
      "title": "环形图",
      "name": "环形图",
      "icon": 'icon-circle',
      "img": require('@/assets/progress.png'),
      "top": 0,
      "left": 0,
      "dataType": 0,
      "data": {
        "label": "人数增涨",
        "value": 40,
        "data": 80
      },
      "dataFormatter": "",
      "stylesFormatter": "",
      "component": {
        "width": 300,
        "height": 300,
        "name": "progress",
        "prop": "progress"
      },
      "option": {
        "type": "circle",
        "strokeWidth": 25,
        "color": "rgba(154, 168, 212, 1)",
        "fontSize": 40,
        "fontWeight": "normal",
        "suffixColor": "rgba(154, 168, 212, 1)",
        "suffixFontSize": 40,
        "suffixFontWeight": "normal",
        "borderColor": "#564AA3",
        "split": 20,
        "width": 400,
        "height": 80
      },
    }
  }, {
    "label": '进度条',
    "option": {
      "title": "进度条",
      "name": "进度条",
      "icon": 'icon-progress',
      "img": require('@/assets/progress2.png'),
      "top": 0,
      "left": 0,
      "data": {
        "label": "人数增涨",
        "value": 40,
        "data": 80
      },
      "dataFormatter": "",
      "stylesFormatter": "",
      "component": {
        "width": 400,
        "height": 100,
        "name": "progress",
        "prop": "progress"
      },
      "option": {
        "type": "line",
        "color": "#fff",
        "fontSize": 24,
        "suffixColor": "#fff",
        "strokeWidth": 13,
        "fontWeight": "normal",
        "borderColor": "#564AA3"
      },
    }
  }, {
    label: '仪表盘',
    option: {
      "title": "仪表盘",
      "icon": 'icon-gauge',
      "img": require('@/assets/gauge.png'),
      "name": "仪表盘",
      "dataType": 1,
      "dataMethod": 'get',
      "time": 5000,
      "url": baseUrl + "/gauge",
      "data": {
        min: 1,
        max: 10,
        label: '名称',
        value: 4,
        unit: '%'
      },
      "dataFormatter": "",
      "stylesFormatter": "",
      "component": {
        "width": 390,
        "height": 314,
        "name": "gauge",
        "prop": "gauge"
      },
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
    },
  }, {
    label: '字符云',
    option: {
      "title": "字符云",
      "name": "字符云",
      "icon": "icon-wordCloud",
      "img": require('@/assets/wordcloud.png'),
      "top": 725,
      "left": 3780,
      "dataType": 1,
      "dataMethod": 'get',
      "data": [{
        name: '三星',
        value: '1234'
      }, {
        name: '小米',
        value: '1234'
      }, {
        name: '华为',
        value: '1234'
      }, {
        name: 'oppo',
        value: '1234'
      }, {
        name: '抖音',
        value: '1234'
      }, {
        name: '快手',
        value: '1234'
      }, {
        name: '淘宝',
        value: '1234'
      }, {
        name: '百度',
        value: '1234'
      }, {
        name: '京东',
        value: '1234'
      }, {
        name: '天猫',
        value: '1234'
      }, {
        name: '字符1',
        value: '1234'
      }, {
        name: '字符1',
        value: '1234'
      }],
      "dataFormatter": "",
      "stylesFormatter": "",
      "url": baseUrl + "/wordCloud",
      "time": 5000,
      "component": {
        "name": "wordcloud",
        "prop": "wordcloud",
        "width": 600,
        "height": 300,
      },
      option: {
        minFontSize: 30,
        maxFontSize: 80,
        split: 30,
        rotate: true,
      }
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
      "img": require('@/assets/table.png'),
      "top": 0,
      "left": 0,
      "dataType": 0,
      "data": [{
        "type1": '数据1',
        "type2": '数据1'
      }, {
        "type1": '数据2',
        "type2": '数据2'
      }, {
        "type1": '数据3',
        "type2": '数据3'
      }, {
        "type1": '数据4',
        "type2": '数据4'
      }],
      "dataFormatter": "",
      "stylesFormatter": "",
      "component": {
        "width": 500,
        "height": 200,
        "name": "table",
        "prop": "table",
      },
      "option": {
        "columnShow": true,
        "columnViews": true,
        "headerBackground": "rgba(30, 144, 255, 1)",
        "headerColor": "rgba(241, 242, 245, 1)",
        "headerTextAlign": "center",
        "bodyBackground": "rgba(0, 0, 0, 0.01)",
        "bodyColor": "rgba(0, 0, 0, 1)",
        "borderColor": "rgba(51, 65, 107, 1)",
        "bodyTextAlign": "center",
        "column": [{
          "label": "车牌号",
          "prop": "type1"
        }, {
          "label": "驾驶员",
          "prop": "type2"
        }, {
          "label": "里程",
          "prop": "type3"
        }, {
          "label": "油耗",
          "prop": "type4"
        }],
        "align": "center",
        "headerAlign": "center",
        "header": false,
        "scroll": true,
        "scrollTime": 10000,
        "fontSize": 15,
        "count": 4,
        "nthColor": "rgba(127, 185, 242, 1)",
        "othColor": "rgba(164, 205, 244, 1)",
        "index": true,
        "scrollCount": 1
      }
    }
  }, {
    label: '选项卡',
    option: {
      "title": "选项卡",
      "name": "选项卡",
      "icon": "icon-tabs",
      "img": require('@/assets/tabs.png'),
      "child": {
        "index": [],
        "paramName": ""
      },
      "dataFormatter": "",
      "stylesFormatter": "",
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
        "name": "tabs",
        "prop": "tabs"
      },
      "option": {
        "type": 'tabs',
        "color": "#eee",
        "empColor": "#4dffff",
        "fontSize": 20,
        "split": 8,
        "empBackgroundImage": "/img/banner/banner5.png",
        "backgroundImage": "/img/banner/banner4.png"
      },
    },
  }]
}, {
  label: '二次开发',
  icon: 'el-icon-info',
  children: [{
    label: '滚动选项卡',
    option: {
      "name": "滚动选项卡",
      "title": "滚动选项卡",
      "icon": 'icon-bar',
      "img": require('@/assets/text4.png'),
      "dataType": 0,
      data: [{
        text: '领导调研',
        list: [
          "https://img.alicdn.com/tfs/TB1v28TC8v0gK0jSZKbXXbK2FXa-1880-640.jpg",
          "https://img.alicdn.com/tfs/TB1uevcCrj1gK0jSZFuXXcrHpXa-1880-640.jpg"
        ]
      }, {
        text: '先进事件',
        list: [
          "https://img.alicdn.com/imgextra/i1/O1CN01NAnI6W1Vf1kZScscd_!!6000000002679-0-tps-2880-1070.jpg",
          "https://img.alicdn.com/imgextra/i2/O1CN011FMQT21RF8u1nHsem_!!6000000002081-0-tps-2880-1070.jpg"
        ]
      }],
      "dataFormatter": "",
      "stylesFormatter": "",
      "component": {
        "width": 800,
        "height": 400,
        "name": "imgTabs",
        "prop": "imgTabs",
      },
      "option": {
        direction: 'horizontal',
        interval: 3000,
        time: 5000,
        autoplay: true
      }
    }
  }, {
    label: '滚动列表',
    option: {
      "name": "滚动列表",
      "title": "滚动列表",
      "icon": 'icon-bar',
      "img": require('@/assets/text4.png'),
      "dataType": 0,
      "data": [{
        name: 'smallwei',
        age: '28',
        color: 'green',
        img: 'https://avuejs.com/images/logo.png',
        desc: '前端搬砖神器,让数据驱动视图,更加贴合企业开发,前端搬砖神器,让数据驱动视图,更加贴合企业开发,前端搬砖神器,让数据驱动视图,更加贴合企业开发,前端搬砖神器,让数据驱动视图,更加贴合企业开发',
        tag: ['前端']
      }, {
        name: 'smallwei',
        age: '28',
        color: 'red',
        img: 'https://avuejs.com/images/logo.png',
        desc: '前端搬砖神器,让数据驱动视图,更加贴合企业开发,前端搬砖神器,让数据驱动视图,更加贴合企业开发,前端搬砖神器,让数据驱动视图,更加贴合企业开发,前端搬砖神器,让数据驱动视图,更加贴合企业开发',
        tag: ['前端']
      }, {
        name: 'smallwei',
        age: '28',
        color: 'red',
        img: 'https://avuejs.com/images/logo.png',
        desc: '前端搬砖神器,让数据驱动视图,更加贴合企业开发,前端搬砖神器,让数据驱动视图,更加贴合企业开发,前端搬砖神器,让数据驱动视图,更加贴合企业开发,前端搬砖神器,让数据驱动视图,更加贴合企业开发',
        tag: ['前端', '前端', '前端'],
      }],
      "dataFormatter": "",
      "stylesFormatter": "",
      "component": {
        "width": 800,
        "height": 500,
        "name": "imgList",
        "prop": "imgList",
      },
      "option": {
        borderImageSource: '/img/border/border1.png',
        step: 1,
        marginBottom: 20,
        hoverStop: true,

      }
    }
  }]
}]