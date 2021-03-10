const option = {
  "detail": {
    "name": "xx一张图测试",
    "width": 1920,
    "height": 1080,
    "scale": 70.3125,
    "backgroundImage": "https://oss.bladex.vip/caster/upload/20210207/a2e53fb3274434e2486443b951ae86e3.png",
    "url": "",
    "mark": {},
    "gradeShow": false,
    "gradeLen": 30,
    "query": {}
  },
  "component": [
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 913.48,
      "left": 449.36,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/483ccf5a404227dcd6a9673d50de16fc.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 39.96,
        "height": 39.96,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "2037eb29-6a79-425b-8834-2208264ec822",
      "zIndex": 91
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "青茶"
      },
      "component": {
        "width": 138.52,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 18,
        "fontWeight": "bolder",
        "color": "rgba(0, 212, 255, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 1453.23,
      "top": 773.25,
      "index": "6a6f4a68-fca2-4870-843d-8a8de5bfab9f",
      "zIndex": 90
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "白鸡冠"
      },
      "component": {
        "width": 120.18,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 18,
        "fontWeight": "bold",
        "color": "rgba(30, 176, 198, 0.42)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 1626.15,
      "top": 892.46,
      "index": "a2d473d2-38ae-4021-8698-2fd22c9e9cc9",
      "zIndex": 89
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "总产量/万吨"
      },
      "component": {
        "width": 82.97,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "left",
        "fontSize": 14,
        "fontWeight": "normal",
        "color": "rgba(255, 255, 255, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 1247.18,
      "top": 233.67,
      "index": "869817a9-911d-4d95-856b-bae756b22bcd",
      "zIndex": 88
    },
    {
      "name": "通用型",
      "title": "通用型",
      "icon": "icon-bar",
      "img": "/img/text5.72604642.png",
      "dataType": 0,
      "dataMethod": "get",
      "data": {
        "categories": [
          "苹果",
          "三星",
          "小米",
          "oppo",
          "vivo"
        ],
        "series": [
          {
            "name": "手机品牌",
            "data": [
              1000879,
              3400879,
              2300879,
              5400879,
              3400879
            ]
          }
        ]
      },
      "echartFormatter": "(data)=>{\nconsole.log(data);\nreturn {\n            legend: {\n    top: '5%',\n    right: '5%',\n    itemGap: 15,\n    itemWidth: 15,\n    itemHeight: 15,\n    data: name,\n    textStyle: {\n        color: '#9298a3',\n        fontStyle: 'normal',\n\n        fontSize: 14,\n    }\n},\ntooltip: {\n    trigger: 'axis',\n    formatter: '{c}',\n    axisPointer: {\n        type: 'cross',\n        label: {\n            backgroundColor: '#163a8a'\n        },\n        crossStyle: {\n            color: '#fff'\n        }\n    }\n\n},\ngrid: {\n    top: '25%',\n    left: '12%',\n    right: '0%',\n    bottom: '15%',\n    // containLabel: true\n},\nxAxis: [{\n    type: 'category',\n    axisLine: {\n        show: false\n    },\n    axisTick: {\n        show: false\n    }, //没有刻度\n    splitArea: {\n        // show: true,\n        color: '#f00',\n        lineStyle: {\n            color: '#f00'\n        },\n    },\n    axisLabel: {\n\n        color: '#9298a3'\n    },\n    splitLine: {\n        show: false\n\n    },\n    boundaryGap: true,\n    data: ['1季度', '1-2季度', '1-3季度', '1-4季度'],\n\n}],\n\nyAxis: [{\n    type: 'value',\n    name: '亿元',\n    position: 'left',\n    min: 0,\n    max: 400,\n    nameTextStyle: {\n        color: '#fff'\n    }, //对应name 的颜色\n    interval: 100,\n    // splitNumber: 5,\n    splitLine: {\n        show: true,\n        lineStyle: {\n            color: 'rgba(12,111,200,0.15)'\n        }\n    },\n    axisLine: {\n        show: false,\n    },\n    axisLabel: {\n        show: true,\n        margin: 15,\n        textStyle: {\n            color: '#9298a3',\n\n        },\n    },\n    axisTick: {\n        show: false,\n    },\n}],\nseries: [{\n        name: '零售总额',\n        type: 'bar',\n        itemStyle: {\n            normal: {\n                show: true,\n                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{\n                    offset: 0,\n                    color: '#02d8ff'\n                }, {\n                    offset: 1,\n                    color: '#0084ff'\n                }]),\n                barBorderRadius: 50,\n                borderWidth: 0,\n            }\n        },\n        zlevel: 2,\n        barWidth: '10%',\n        data: [240, 310, 110, 190, 320, 280]\n    },\n\n\n    {\n        name: '增速',\n        type: 'line',\n        smooth: true, //是否平滑\n        showAllSymbol: true,\n\n        // symbol: 'image://./static/images/guang-circle.png',\n        symbol: 'circle',\n        symbolSize: 15,\n        lineStyle: {\n            normal: {\n                color: \"#1ed462\"\n\n            },\n        },\n        label: {\n            show: false,\n            position: 'top',\n            textStyle: {\n                color: '#00ca95',\n            }\n        },\n\n        itemStyle: {\n            color: \"#1ed462\",\n            borderColor: \"#fff\",\n            borderWidth: 3\n            // shadowColor: 'rgba(0, 0, 0, .3)',\n\n        },\n        tooltip: {\n            show: true\n        },\n        zlevel: 3,\n        areaStyle: {\n            normal: {\n                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{\n                        offset: 0,\n                        color: 'rgba(48,205,85,0.3)'\n                    },\n                    {\n                        offset: 1,\n                        color: 'rgba(48,205,85,0)'\n                    }\n                ], false),\n                // shadowColor: 'rgba(48,205,85, 0.9)',\n                // shadowBlur: 20\n            }\n        },\n        data: [180, 285, 228, 240],\n    },\n]\n        };\n}",
      "url": "./bar",
      "time": 5000,
      "component": {
        "width": 349.44,
        "height": 239.68,
        "name": "common",
        "prop": "common"
      },
      "left": 60.32,
      "top": 438.48,
      "index": "2e719c7b-6ec7-44a7-88be-2ebec3461c89",
      "zIndex": 87
    },
    {
      "name": "实时时间",
      "title": "实时时间",
      "icon": "icon-datetime",
      "img": "data:image/png;base64,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",
      "top": -1.58,
      "left": 250.92,
      "component": {
        "width": 250,
        "height": 50,
        "name": "datetime",
        "prop": "datetime"
      },
      "option": {
        "format": "yyyy-MM-dd hh:mm:ss",
        "color": "#fff",
        "textAlign": "left",
        "fontSize": 24,
        "fontWeight": "normal"
      },
      "index": "3479af18-2ae1-4c7c-9e45-ecd480a17b1b",
      "zIndex": 86
    },
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 569.62,
      "left": 1661.42,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/3d87fd54355824ffa4bf503d4d852934.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 78.97,
        "height": 75.51,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "b0631a04-e7ca-4c5c-8d9b-1e7fd9553a92",
      "zIndex": 85
    },
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 467.54,
      "left": 1660.11,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/3d87fd54355824ffa4bf503d4d852934.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 78.97,
        "height": 75.51,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "264d94fa-951d-4337-8c34-e555d6f382bd",
      "zIndex": 84
    },
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 569.62,
      "left": 1485.1,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/3d87fd54355824ffa4bf503d4d852934.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 78.97,
        "height": 75.51,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "e4433280-6569-407d-acb3-233a10666720",
      "zIndex": 83
    },
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 507.34,
      "left": 1635.57,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/710d2fdd1ccc02f51efc98f201042ee2.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 14.97,
        "height": 17.89,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "66710ad8-3639-41a8-832c-387becae0577",
      "zIndex": 82
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "区块链溯源"
      },
      "component": {
        "width": 141.92,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 18,
        "fontWeight": "normal",
        "color": "rgba(168, 255, 234, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 53.72,
      "top": 697.94,
      "index": "5bc850ce-dce1-4ddf-841a-09b82675b922",
      "zIndex": 81
    },
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 467.54,
      "left": 1482.78,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/3d87fd54355824ffa4bf503d4d852934.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 78.97,
        "height": 75.51,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "ae1fbfcf-75c4-4733-bbdc-78274a26408b",
      "zIndex": 80
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "XXXX茶叶"
      },
      "component": {
        "width": 100,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 14,
        "fontWeight": "normal",
        "color": "rgba(255, 255, 255, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 67.28,
      "top": 225.04,
      "index": "8281bf7c-d5f5-490a-8a7d-1ef741743514",
      "zIndex": 79
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "品牌价值"
      },
      "component": {
        "width": 100,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 14,
        "fontWeight": "normal",
        "color": "rgba(255, 255, 255, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 169.36,
      "top": 171.68,
      "index": "5f9b61d6-b486-4d20-8316-cc4790914277",
      "zIndex": 78
    },
    {
      "title": "颜色块",
      "name": "颜色块",
      "icon": "icon-flop",
      "img": "/img/flop2.31ee8a48.png",
      "top": 889.37,
      "left": 324.62,
      "dataType": 0,
      "data": [
        {
          "value": "157"
        }
      ],
      "dataFormatter": "",
      "component": {
        "width": 76.87,
        "height": 28.46,
        "name": "flop",
        "prop": "flop"
      },
      "option": {
        "span": 1,
        "decimals": 1,
        "whole": true,
        "padding": 12,
        "textAlign": "left",
        "splity": 23,
        "splitx": 17,
        "fontSize": 28,
        "prefixSplity": 0,
        "prefixFontSize": 13,
        "backgroundColor": "#F56C6C",
        "suffixText": "人",
        "suffixInline": true,
        "suffixSplitx": 0,
        "suffixFontSize": 14,
        "prefixSplitx": 0,
        "suffixSplity": 0,
        "type": "",
        "color": "rgba(248, 250, 47, 1)",
        "suffixColor": "rgba(255, 255, 255, 1)"
      },
      "index": "9b0c2f4f-49db-47ab-ba98-bdafa31afb01",
      "zIndex": 77
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "品牌价值"
      },
      "component": {
        "width": 100,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 14,
        "fontWeight": "normal",
        "color": "rgba(255, 255, 255, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 169.36,
      "top": 206.07,
      "index": "fd09dbb0-ead0-430c-8b05-a4c5f362a482",
      "zIndex": 76
    },
    {
      "title": "颜色块",
      "name": "颜色块",
      "icon": "icon-flop",
      "img": "/img/flop2.31ee8a48.png",
      "top": 204.15,
      "left": 260.66,
      "dataType": 0,
      "data": [
        {
          "value": "905"
        }
      ],
      "dataFormatter": "",
      "component": {
        "width": 87.35,
        "height": 28.46,
        "name": "flop",
        "prop": "flop"
      },
      "option": {
        "span": 1,
        "decimals": 1,
        "whole": true,
        "padding": 12,
        "textAlign": "left",
        "splity": 23,
        "splitx": 17,
        "fontSize": 28,
        "prefixSplity": 4,
        "prefixFontSize": 13,
        "backgroundColor": "#F56C6C",
        "suffixText": "人",
        "suffixInline": true,
        "suffixSplitx": 10,
        "suffixFontSize": 14,
        "prefixSplitx": 0,
        "suffixSplity": 0,
        "type": "",
        "color": "rgba(248, 250, 47, 1)",
        "suffixColor": "rgba(248, 250, 47, 1)"
      },
      "index": "a89fb9d5-cd43-4408-9723-83381cb3dad5",
      "zIndex": 75
    },
    {
      "title": "颜色块",
      "name": "颜色块",
      "icon": "icon-flop",
      "img": "/img/flop2.31ee8a48.png",
      "top": 613.86,
      "left": 1754.06,
      "dataType": 0,
      "data": [
        {
          "value": "9.1",
          "suffixText": "℃"
        }
      ],
      "dataFormatter": "",
      "component": {
        "width": 100.27,
        "height": 28.46,
        "name": "flop",
        "prop": "flop"
      },
      "option": {
        "span": 1,
        "decimals": 1,
        "whole": true,
        "padding": 12,
        "textAlign": "left",
        "splity": 23,
        "splitx": 17,
        "fontSize": 24,
        "prefixSplity": 4,
        "prefixFontSize": 13,
        "backgroundColor": "#F56C6C",
        "suffixText": "人",
        "suffixInline": true,
        "suffixSplitx": 0,
        "suffixFontSize": 14,
        "prefixSplitx": 0,
        "suffixSplity": 0,
        "type": "",
        "color": "rgba(248, 250, 47, 1)",
        "suffixColor": "rgba(248, 250, 47, 1)",
        "fontWeight": "bolder"
      },
      "index": "ab5bdabe-7b6d-41b1-ae95-4570ccf3006e",
      "zIndex": 74
    },
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 280.72,
      "left": 85.84,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/4c168eb83d4d2a038ff1ffb478a112d3.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 309.36,
        "height": 68.08,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "644de21a-b4c1-4865-98c2-fa1ffd642da4",
      "zIndex": 73
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "智能检索"
      },
      "component": {
        "width": 134.06,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 18,
        "fontWeight": "normal",
        "color": "rgba(168, 255, 234, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 1709.56,
      "top": 696.63,
      "index": "dbbf2841-830e-42a0-8182-a939eb05274f",
      "zIndex": 72
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "近10年销售趋势"
      },
      "component": {
        "width": 141.92,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 18,
        "fontWeight": "normal",
        "color": "rgba(168, 255, 234, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 60.27,
      "top": 403.19,
      "index": "c13ebc09-c749-4544-86b3-1eb1087c9533",
      "zIndex": 71
    },
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 391.84,
      "left": 43.5,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/2a03d2f52762e6569d597eb5cf728f0e.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 392.76,
        "height": 290.1,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "8fabac1e-d6e6-4635-88b1-652fc7d62707",
      "zIndex": 70
    },
    {
      "title": "颜色块",
      "name": "颜色块",
      "icon": "icon-flop",
      "img": "/img/flop2.31ee8a48.png",
      "top": 292.01,
      "left": 314.14,
      "dataType": 0,
      "data": [
        {
          "value": "8",
          "suffixText": "件"
        }
      ],
      "dataFormatter": "",
      "component": {
        "width": 87.35,
        "height": 28.46,
        "name": "flop",
        "prop": "flop"
      },
      "option": {
        "span": 1,
        "decimals": 1,
        "whole": true,
        "padding": 12,
        "textAlign": "left",
        "splity": 23,
        "splitx": 17,
        "fontSize": 28,
        "prefixSplity": 4,
        "prefixFontSize": 13,
        "backgroundColor": "#F56C6C",
        "suffixText": "人",
        "suffixInline": true,
        "suffixSplitx": 10,
        "suffixFontSize": 14,
        "prefixSplitx": 0,
        "suffixSplity": 0,
        "type": "",
        "color": "rgba(248, 250, 47, 1)",
        "suffixColor": "rgba(255, 255, 255, 1)"
      },
      "index": "853ed80d-cbc5-49dd-8461-cce68f4f2bc1",
      "zIndex": 69
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "驰名商标"
      },
      "component": {
        "width": 100,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 18,
        "fontWeight": "normal",
        "color": "rgba(255, 255, 255, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 89.14,
      "top": 293.93,
      "index": "cc034657-757f-404e-826b-d026d7af39ac",
      "zIndex": 68
    },
    {
      "title": "颜色块",
      "name": "颜色块",
      "icon": "icon-flop",
      "img": "/img/flop2.31ee8a48.png",
      "top": 784.57,
      "left": 84.89,
      "dataType": 0,
      "data": [
        {
          "value": "231"
        }
      ],
      "dataFormatter": "",
      "component": {
        "width": 76.87,
        "height": 28.46,
        "name": "flop",
        "prop": "flop"
      },
      "option": {
        "span": 1,
        "decimals": 1,
        "whole": true,
        "padding": 12,
        "textAlign": "left",
        "splity": 23,
        "splitx": 17,
        "fontSize": 28,
        "prefixSplity": 0,
        "prefixFontSize": 13,
        "backgroundColor": "#F56C6C",
        "suffixText": "人",
        "suffixInline": true,
        "suffixSplitx": 0,
        "suffixFontSize": 14,
        "prefixSplitx": 0,
        "suffixSplity": 0,
        "type": "",
        "color": "rgba(248, 250, 47, 1)",
        "suffixColor": "rgba(255, 255, 255, 1)"
      },
      "index": "4f38ec5a-6e25-436d-bdd1-742fe95b580a",
      "zIndex": 67
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "茶品牌"
      },
      "component": {
        "width": 100,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "left",
        "fontSize": 18,
        "fontWeight": "normal",
        "color": "rgba(255, 255, 255, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 91.76,
      "top": 821.86,
      "index": "c62dd161-6bb6-427c-86f7-bd588c40bcfe",
      "zIndex": 66
    },
    {
      "title": "颜色块",
      "name": "颜色块",
      "icon": "icon-flop",
      "img": "/img/flop2.31ee8a48.png",
      "top": 301.18,
      "left": 1725.01,
      "dataType": 0,
      "data": [
        {
          "value": "3.2"
        }
      ],
      "dataFormatter": "",
      "component": {
        "width": 76.87,
        "height": 28.46,
        "name": "flop",
        "prop": "flop"
      },
      "option": {
        "span": 1,
        "decimals": 1,
        "whole": true,
        "padding": 12,
        "textAlign": "left",
        "splity": 23,
        "splitx": 17,
        "fontSize": 28,
        "prefixSplity": 0,
        "prefixFontSize": 13,
        "backgroundColor": "#F56C6C",
        "suffixText": "人",
        "suffixInline": true,
        "suffixSplitx": 0,
        "suffixFontSize": 14,
        "prefixSplitx": 0,
        "suffixSplity": 0,
        "type": "",
        "color": "rgba(248, 250, 47, 1)",
        "suffixColor": "rgba(255, 255, 255, 1)"
      },
      "index": "c3373d64-a4cb-4658-8508-b2250eda846f",
      "zIndex": 65
    },
    {
      "title": "颜色块",
      "name": "颜色块",
      "icon": "icon-flop",
      "img": "/img/flop2.31ee8a48.png",
      "top": 890.68,
      "left": 86.2,
      "dataType": 0,
      "data": [
        {
          "value": "36"
        }
      ],
      "dataFormatter": "",
      "component": {
        "width": 76.87,
        "height": 28.46,
        "name": "flop",
        "prop": "flop"
      },
      "option": {
        "span": 1,
        "decimals": 1,
        "whole": true,
        "padding": 12,
        "textAlign": "left",
        "splity": 23,
        "splitx": 17,
        "fontSize": 28,
        "prefixSplity": 0,
        "prefixFontSize": 13,
        "backgroundColor": "#F56C6C",
        "suffixText": "人",
        "suffixInline": true,
        "suffixSplitx": 0,
        "suffixFontSize": 14,
        "prefixSplitx": 0,
        "suffixSplity": 0,
        "type": "",
        "color": "rgba(248, 250, 47, 1)",
        "suffixColor": "rgba(255, 255, 255, 1)"
      },
      "index": "69d4976c-f220-4ff1-bf18-2472f3ad9242",
      "zIndex": 64
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "企业数"
      },
      "component": {
        "width": 67.25,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "left",
        "fontSize": 18,
        "fontWeight": "normal",
        "color": "rgba(255, 255, 255, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 327.56,
      "top": 807.45,
      "index": "284f7515-4699-4e94-a009-8880c56efd2b",
      "zIndex": 63
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "上链企业"
      },
      "component": {
        "width": 79.04,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "left",
        "fontSize": 18,
        "fontWeight": "normal",
        "color": "rgba(255, 255, 255, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 87.83,
      "top": 921.42,
      "index": "00e4f905-96f0-4582-8c56-74852041e77a",
      "zIndex": 62
    },
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 773.87,
      "left": 180.85,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/507f9024298709dd096ed0f463a76c5b.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 126.08,
        "height": 121.44,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "62e494a1-f406-4921-86ec-2472d2be69aa",
      "zIndex": 61
    },
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 846.8,
      "left": 118.21,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/fa98c9762afd9fd042b145aaa4fa55fc.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 253.68,
        "height": 93.6,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "372eb1a9-3606-4b76-b6d9-c5a7100095b6",
      "zIndex": 60
    },
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 886.24,
      "left": 90.48,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/697863eb584dd6eb200771575983cc1f.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 317.22,
        "height": 68.08,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "cce9f22c-0f90-44ac-8666-dd58d0cb496c",
      "zIndex": 59
    },
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 685.72,
      "left": 47.4,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/380e5f8960d6916b80efd64c837dc1ad.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 395.08,
        "height": 315.38,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "b23b6bfa-16b0-44fa-aff7-03a142ecfa3e",
      "zIndex": 58
    },
    {
      "title": "颜色块",
      "name": "颜色块",
      "icon": "icon-flop",
      "img": "/img/flop2.31ee8a48.png",
      "top": 779.33,
      "left": 325.93,
      "dataType": 0,
      "data": [
        {
          "value": "133"
        }
      ],
      "dataFormatter": "",
      "component": {
        "width": 76.87,
        "height": 28.46,
        "name": "flop",
        "prop": "flop"
      },
      "option": {
        "span": 1,
        "decimals": 1,
        "whole": true,
        "padding": 12,
        "textAlign": "left",
        "splity": 23,
        "splitx": 17,
        "fontSize": 28,
        "prefixSplity": 0,
        "prefixFontSize": 13,
        "backgroundColor": "#F56C6C",
        "suffixText": "人",
        "suffixInline": true,
        "suffixSplitx": 0,
        "suffixFontSize": 14,
        "prefixSplitx": 0,
        "suffixSplity": 0,
        "type": "",
        "color": "rgba(248, 250, 47, 1)",
        "suffixColor": "rgba(255, 255, 255, 1)"
      },
      "index": "42753e0b-01ce-4f37-9b60-19d9463f13f1",
      "zIndex": 57
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "青卡数量"
      },
      "component": {
        "width": 79.04,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "left",
        "fontSize": 18,
        "fontWeight": "normal",
        "color": "rgba(255, 255, 255, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 330.18,
      "top": 926.66,
      "index": "29c2f6f3-dc23-4907-8cb8-6977645fc507",
      "zIndex": 56
    },
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 131.14,
      "left": 536.22,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/5dc89283b9402cab7aee5cf48e79bdda.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 127.69,
        "height": 110.31,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "75550c1b-f865-42ed-ba15-089d0d932a48",
      "zIndex": 55
    },
    {
      "title": "颜色块",
      "name": "颜色块",
      "icon": "icon-flop",
      "img": "/img/flop2.31ee8a48.png",
      "top": 175.42,
      "left": 561.73,
      "dataType": 0,
      "data": [
        {
          "value": "106"
        }
      ],
      "dataFormatter": "",
      "component": {
        "width": 76.87,
        "height": 28.46,
        "name": "flop",
        "prop": "flop"
      },
      "option": {
        "span": 1,
        "decimals": 1,
        "whole": true,
        "padding": 12,
        "textAlign": "left",
        "splity": 23,
        "splitx": 17,
        "fontSize": 28,
        "prefixSplity": 0,
        "prefixFontSize": 13,
        "backgroundColor": "#F56C6C",
        "suffixText": "人",
        "suffixInline": true,
        "suffixSplitx": 0,
        "suffixFontSize": 14,
        "prefixSplitx": 0,
        "suffixSplity": 0,
        "type": "",
        "color": "rgba(248, 250, 47, 1)",
        "suffixColor": "rgba(255, 255, 255, 1)"
      },
      "index": "18a378bf-ee3a-434c-9029-f74567b43046",
      "zIndex": 54
    },
    {
      "title": "颜色块",
      "name": "颜色块",
      "icon": "icon-flop",
      "img": "/img/flop2.31ee8a48.png",
      "top": 174.11,
      "left": 728.1,
      "dataType": 0,
      "data": [
        {
          "value": "106"
        }
      ],
      "dataFormatter": "",
      "component": {
        "width": 76.87,
        "height": 28.46,
        "name": "flop",
        "prop": "flop"
      },
      "option": {
        "span": 1,
        "decimals": 1,
        "whole": true,
        "padding": 12,
        "textAlign": "left",
        "splity": 23,
        "splitx": 17,
        "fontSize": 28,
        "prefixSplity": 0,
        "prefixFontSize": 13,
        "backgroundColor": "#F56C6C",
        "suffixText": "人",
        "suffixInline": true,
        "suffixSplitx": 0,
        "suffixFontSize": 14,
        "prefixSplitx": 0,
        "suffixSplity": 0,
        "type": "",
        "color": "rgba(248, 250, 47, 1)",
        "suffixColor": "rgba(255, 255, 255, 1)"
      },
      "index": "af22136c-9481-46c1-9567-50df396985cc",
      "zIndex": 53
    },
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 129.83,
      "left": 703.26,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/5dc89283b9402cab7aee5cf48e79bdda.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 127.69,
        "height": 110.31,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "b0d825a9-a057-4cf6-810f-7c11de746964",
      "zIndex": 52
    },
    {
      "title": "颜色块",
      "name": "颜色块",
      "icon": "icon-flop",
      "img": "/img/flop2.31ee8a48.png",
      "top": 175.42,
      "left": 899.71,
      "dataType": 0,
      "data": [
        {
          "value": "106"
        }
      ],
      "dataFormatter": "",
      "component": {
        "width": 76.87,
        "height": 28.46,
        "name": "flop",
        "prop": "flop"
      },
      "option": {
        "span": 1,
        "decimals": 1,
        "whole": true,
        "padding": 12,
        "textAlign": "left",
        "splity": 23,
        "splitx": 17,
        "fontSize": 28,
        "prefixSplity": 0,
        "prefixFontSize": 13,
        "backgroundColor": "#F56C6C",
        "suffixText": "人",
        "suffixInline": true,
        "suffixSplitx": 0,
        "suffixFontSize": 14,
        "prefixSplitx": 0,
        "suffixSplity": 0,
        "type": "",
        "color": "rgba(248, 250, 47, 1)",
        "suffixColor": "rgba(255, 255, 255, 1)"
      },
      "index": "d2e0e3e5-efa0-4237-8021-b86358e75ad4",
      "zIndex": 51
    },
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 131.14,
      "left": 874.94,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/5dc89283b9402cab7aee5cf48e79bdda.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 127.69,
        "height": 110.31,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "33487335-d52e-487e-803d-99ee227403ba",
      "zIndex": 50
    },
    {
      "title": "颜色块",
      "name": "颜色块",
      "icon": "icon-flop",
      "img": "/img/flop2.31ee8a48.png",
      "top": 179.35,
      "left": 1072.63,
      "dataType": 0,
      "data": [
        {
          "value": "106"
        }
      ],
      "dataFormatter": "",
      "component": {
        "width": 76.87,
        "height": 28.46,
        "name": "flop",
        "prop": "flop"
      },
      "option": {
        "span": 1,
        "decimals": 1,
        "whole": true,
        "padding": 12,
        "textAlign": "left",
        "splity": 23,
        "splitx": 17,
        "fontSize": 28,
        "prefixSplity": 0,
        "prefixFontSize": 13,
        "backgroundColor": "#F56C6C",
        "suffixText": "人",
        "suffixInline": true,
        "suffixSplitx": 0,
        "suffixFontSize": 14,
        "prefixSplitx": 0,
        "suffixSplity": 0,
        "type": "",
        "color": "rgba(248, 250, 47, 1)",
        "suffixColor": "rgba(255, 255, 255, 1)"
      },
      "index": "89c02bfe-42cf-48de-93be-fd78fd40f78e",
      "zIndex": 49
    },
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 135.78,
      "left": 1218.3,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/5dc89283b9402cab7aee5cf48e79bdda.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 127.69,
        "height": 110.31,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "b2970b80-29cb-4d3a-8c2a-1b8f2eaafd2e",
      "zIndex": 48
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "总面积/万亩"
      },
      "component": {
        "width": 80.35,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "left",
        "fontSize": 14,
        "fontWeight": "normal",
        "color": "rgba(255, 255, 255, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 560.74,
      "top": 236.29,
      "index": "e1108624-25de-4705-838a-1ceb55de71be",
      "zIndex": 47
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "生态面积/万亩"
      },
      "component": {
        "width": 106.55,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "left",
        "fontSize": 14,
        "fontWeight": "normal",
        "color": "rgba(255, 255, 255, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 721.87,
      "top": 231.05,
      "index": "90866242-61de-46a8-86c1-048cbdaed6a8",
      "zIndex": 46
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "产业链产值/亿"
      },
      "component": {
        "width": 106.55,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "left",
        "fontSize": 14,
        "fontWeight": "normal",
        "color": "rgba(255, 255, 255, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 893.48,
      "top": 233.67,
      "index": "24d2cab1-29bb-4534-89ca-55f6639f7658",
      "zIndex": 45
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "毛茶产值/亿"
      },
      "component": {
        "width": 106.55,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "left",
        "fontSize": 14,
        "fontWeight": "normal",
        "color": "rgba(255, 255, 255, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 1071.64,
      "top": 233.67,
      "index": "b05ad4e9-7fbd-404c-83e0-1fe3b0358e5e",
      "zIndex": 44
    },
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 135.78,
      "left": 1044.3,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/5dc89283b9402cab7aee5cf48e79bdda.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 127.69,
        "height": 110.31,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "9f630197-ff47-494a-af71-128226ca584b",
      "zIndex": 43
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "品牌价值"
      },
      "component": {
        "width": 100,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 18,
        "fontWeight": "normal",
        "color": "rgba(168, 255, 234, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 111.36,
      "top": 113.68,
      "index": "3fb5c061-5833-4077-963d-25c8f89ff4f3",
      "zIndex": 42
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "案件上报数/件"
      },
      "component": {
        "width": 149.78,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 14,
        "fontWeight": "normal",
        "color": "rgba(74, 252, 216, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 1668.95,
      "top": 259.09,
      "index": "15bf45e1-2c44-48dc-8f90-c4157fa101a9",
      "zIndex": 41
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "智慧茶山"
      },
      "component": {
        "width": 134.06,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 18,
        "fontWeight": "normal",
        "color": "rgba(168, 255, 234, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 1709.56,
      "top": 400.57,
      "index": "74a5b189-ac0c-44ee-bb14-af9108d337fa",
      "zIndex": 40
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "空气温度"
      },
      "component": {
        "width": 64.63,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "left",
        "fontSize": 14,
        "fontWeight": "normal",
        "color": "rgba(74, 252, 216, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 1754.1,
      "top": 580.04,
      "index": "eb78eda8-d82c-4383-ba40-fa5e575088ec",
      "zIndex": 39
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "累计拔除茶山面积/万亩"
      },
      "component": {
        "width": 149.78,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 14,
        "fontWeight": "normal",
        "color": "rgba(74, 252, 216, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 1473.76,
      "top": 154.29,
      "index": "83abd002-4742-444e-8344-b4addc97ab8c",
      "zIndex": 38
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "复绿造林面积/万亩"
      },
      "component": {
        "width": 149.78,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 14,
        "fontWeight": "normal",
        "color": "rgba(74, 252, 216, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 1662.4,
      "top": 155.6,
      "index": "6c8fefb1-3ea7-492e-90d2-16298e7e9e62",
      "zIndex": 37
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "围垦案件总数 /起"
      },
      "component": {
        "width": 149.78,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 14,
        "fontWeight": "normal",
        "color": "rgba(74, 252, 216, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 1475.07,
      "top": 257.78,
      "index": "6ba2bd04-4e60-4da6-87e6-28a262448d9e",
      "zIndex": 36
    },
    {
      "title": "颜色块",
      "name": "颜色块",
      "icon": "icon-flop",
      "img": "/img/flop2.31ee8a48.png",
      "top": 176.73,
      "left": 1244.24,
      "dataType": 0,
      "data": [
        {
          "value": "106"
        }
      ],
      "dataFormatter": "",
      "component": {
        "width": 76.87,
        "height": 28.46,
        "name": "flop",
        "prop": "flop"
      },
      "option": {
        "span": 1,
        "decimals": 1,
        "whole": true,
        "padding": 12,
        "textAlign": "left",
        "splity": 23,
        "splitx": 17,
        "fontSize": 28,
        "prefixSplity": 0,
        "prefixFontSize": 13,
        "backgroundColor": "#F56C6C",
        "suffixText": "人",
        "suffixInline": true,
        "suffixSplitx": 0,
        "suffixFontSize": 14,
        "prefixSplitx": 0,
        "suffixSplity": 0,
        "type": "",
        "color": "rgba(248, 250, 47, 1)",
        "suffixColor": "rgba(255, 255, 255, 1)"
      },
      "index": "7ed75d7a-4d19-41d4-af01-ca21a1b25d66",
      "zIndex": 35
    },
    {
      "title": "颜色块",
      "name": "颜色块",
      "icon": "icon-flop",
      "img": "/img/flop2.31ee8a48.png",
      "top": 196.38,
      "left": 1507.22,
      "dataType": 0,
      "data": [
        {
          "value": "7657"
        }
      ],
      "dataFormatter": "",
      "component": {
        "width": 76.87,
        "height": 28.46,
        "name": "flop",
        "prop": "flop"
      },
      "option": {
        "span": 1,
        "decimals": 1,
        "whole": true,
        "padding": 12,
        "textAlign": "left",
        "splity": 23,
        "splitx": 17,
        "fontSize": 28,
        "prefixSplity": 0,
        "prefixFontSize": 13,
        "backgroundColor": "#F56C6C",
        "suffixText": "人",
        "suffixInline": true,
        "suffixSplitx": 0,
        "suffixFontSize": 14,
        "prefixSplitx": 0,
        "suffixSplity": 0,
        "type": "",
        "color": "rgba(248, 250, 47, 1)",
        "suffixColor": "rgba(255, 255, 255, 1)"
      },
      "index": "20eff303-571c-42ff-8a70-7f834dd11a23",
      "zIndex": 34
    },
    {
      "title": "颜色块",
      "name": "颜色块",
      "icon": "icon-flop",
      "img": "/img/flop2.31ee8a48.png",
      "top": 196.38,
      "left": 1705.36,
      "dataType": 0,
      "data": [
        {
          "value": "934"
        }
      ],
      "dataFormatter": "",
      "component": {
        "width": 76.87,
        "height": 28.46,
        "name": "flop",
        "prop": "flop"
      },
      "option": {
        "span": 1,
        "decimals": 1,
        "whole": true,
        "padding": 12,
        "textAlign": "left",
        "splity": 23,
        "splitx": 17,
        "fontSize": 28,
        "prefixSplity": 0,
        "prefixFontSize": 13,
        "backgroundColor": "#F56C6C",
        "suffixText": "人",
        "suffixInline": true,
        "suffixSplitx": 0,
        "suffixFontSize": 14,
        "prefixSplitx": 0,
        "suffixSplity": 0,
        "type": "",
        "color": "rgba(248, 250, 47, 1)",
        "suffixColor": "rgba(255, 255, 255, 1)"
      },
      "index": "518710f1-9043-4ba7-888d-47380bad3a2a",
      "zIndex": 33
    },
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 170.58,
      "left": 1466.54,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/e611d5d26c6bef9fe0739f37d3dfe828.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 357.37,
        "height": 170.63,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "b9c2c31b-4949-4ce3-9887-5a907ab31f4e",
      "zIndex": 32
    },
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 102.7,
      "left": 1441.3,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/a198a27fe91cbcbc679b948247f23ed8.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 408.26,
        "height": 282.2,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "54bd9083-eb36-4b34-852b-3a382ef6255d",
      "zIndex": 31
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "茶山管控"
      },
      "component": {
        "width": 134.06,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 18,
        "fontWeight": "normal",
        "color": "rgba(168, 255, 234, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 1679.43,
      "top": 113.68,
      "index": "a8dd414a-aeb2-4805-af74-627ef830ff03",
      "zIndex": 30
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "名园茶叶有限公司"
      },
      "component": {
        "width": 175.98,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 18,
        "fontWeight": "normal",
        "color": "rgba(255, 255, 255, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 1492.1,
      "top": 404.5,
      "index": "28b35058-b007-4ae1-891b-6e99f379e2fa",
      "zIndex": 29
    },
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 405.61,
      "left": 1490.34,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/d41aa98e3299d00279f9ce371efa0ed5.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 188.01,
        "height": 33.75,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "fe2e0ba8-c9a9-4552-8557-0ea45a105cf2",
      "zIndex": 28
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "名园茶叶有限公司"
      },
      "component": {
        "width": 175.98,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 18,
        "fontWeight": "normal",
        "color": "rgba(255, 255, 255, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 1492.1,
      "top": 404.5,
      "index": "5d986e2d-5735-4dce-b135-4712139ec83f",
      "zIndex": 27
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "土壤湿度"
      },
      "component": {
        "width": 64.63,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "left",
        "fontSize": 14,
        "fontWeight": "normal",
        "color": "rgba(74, 252, 216, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 1566.77,
      "top": 466.07,
      "index": "00eac8ab-d8d5-42ac-8325-50ed7d2b8862",
      "zIndex": 26
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "土壤温度"
      },
      "component": {
        "width": 64.63,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "left",
        "fontSize": 14,
        "fontWeight": "normal",
        "color": "rgba(74, 252, 216, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 1748.86,
      "top": 470,
      "index": "a546771e-b3e6-4533-8ff5-ce1104663d66",
      "zIndex": 25
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "空气湿度"
      },
      "component": {
        "width": 64.63,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "left",
        "fontSize": 14,
        "fontWeight": "normal",
        "color": "rgba(74, 252, 216, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 1574.63,
      "top": 578.73,
      "index": "421dd01d-af9d-4c82-86f5-c7b8d9ee5447",
      "zIndex": 24
    },
    {
      "title": "颜色块",
      "name": "颜色块",
      "icon": "icon-flop",
      "img": "/img/flop2.31ee8a48.png",
      "top": 301.18,
      "left": 1510.17,
      "dataType": 0,
      "data": [
        {
          "value": "235"
        }
      ],
      "dataFormatter": "",
      "component": {
        "width": 76.87,
        "height": 28.46,
        "name": "flop",
        "prop": "flop"
      },
      "option": {
        "span": 1,
        "decimals": 1,
        "whole": true,
        "padding": 12,
        "textAlign": "left",
        "splity": 23,
        "splitx": 17,
        "fontSize": 28,
        "prefixSplity": 0,
        "prefixFontSize": 13,
        "backgroundColor": "#F56C6C",
        "suffixText": "人",
        "suffixInline": true,
        "suffixSplitx": 0,
        "suffixFontSize": 14,
        "prefixSplitx": 0,
        "suffixSplity": 0,
        "type": "",
        "color": "rgba(248, 250, 47, 1)",
        "suffixColor": "rgba(255, 255, 255, 1)"
      },
      "index": "a0d294e0-05b1-4c07-9529-d81e92297c4b",
      "zIndex": 23
    },
    {
      "title": "颜色块",
      "name": "颜色块",
      "icon": "icon-flop",
      "img": "/img/flop2.31ee8a48.png",
      "top": 169.77,
      "left": 260.66,
      "dataType": 0,
      "data": [
        {
          "value": "700.17",
          "suffixText": "亿元"
        }
      ],
      "dataFormatter": "",
      "component": {
        "width": 161.84,
        "height": 28.46,
        "name": "flop",
        "prop": "flop"
      },
      "option": {
        "span": 1,
        "decimals": 1,
        "whole": true,
        "padding": 12,
        "textAlign": "left",
        "splity": 23,
        "splitx": 17,
        "fontSize": 28,
        "prefixSplity": 4,
        "prefixFontSize": 13,
        "backgroundColor": "#F56C6C",
        "suffixText": "人",
        "suffixInline": true,
        "suffixSplitx": 10,
        "suffixFontSize": 14,
        "prefixSplitx": 0,
        "suffixSplity": 0,
        "type": "",
        "color": "rgba(248, 250, 47, 1)",
        "suffixColor": "rgba(248, 250, 47, 1)"
      },
      "index": "6e9c4e80-9076-46aa-8556-6696fa1c9e97",
      "zIndex": 22
    },
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 169.36,
      "left": 183.28,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/f64e4da43a7d3153f05eaff82f102c80.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 211.92,
        "height": 84.32,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "99f50805-4dcc-4a07-892c-aaac5fabc001",
      "zIndex": 21
    },
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 102.7,
      "left": 47.4,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/72d1e6ba0c06521d79e6f1e74266ade2.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 389.6,
        "height": 282.2,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "9921342c-054f-4212-bf01-6cb7f1b58df5",
      "zIndex": 20
    },
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 169.36,
      "left": 85.84,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/f688b2b549513cb6354e9c49171da386.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 63.44,
        "height": 61.12,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "34d3fe97-61d3-42ec-8f6e-7e434f2880dc",
      "zIndex": 19
    },
    {
      "title": "颜色块",
      "name": "颜色块",
      "icon": "icon-flop",
      "img": "/img/flop2.31ee8a48.png",
      "top": 615.17,
      "left": 1571.97,
      "dataType": 0,
      "data": [
        {
          "value": "87.9",
          "suffixText": "%"
        }
      ],
      "dataFormatter": "",
      "component": {
        "width": 100.27,
        "height": 28.46,
        "name": "flop",
        "prop": "flop"
      },
      "option": {
        "span": 1,
        "decimals": 1,
        "whole": true,
        "padding": 12,
        "textAlign": "left",
        "splity": 23,
        "splitx": 17,
        "fontSize": 24,
        "prefixSplity": 4,
        "prefixFontSize": 13,
        "backgroundColor": "#F56C6C",
        "suffixText": "人",
        "suffixInline": true,
        "suffixSplitx": 0,
        "suffixFontSize": 14,
        "prefixSplitx": 0,
        "suffixSplity": 0,
        "type": "",
        "color": "rgba(248, 250, 47, 1)",
        "suffixColor": "rgba(248, 250, 47, 1)",
        "fontWeight": "bolder"
      },
      "index": "5832c7ae-c197-44fb-821a-575bfe514b86",
      "zIndex": 18
    },
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 391.84,
      "left": 1441.5,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/2e70fb339aa8097602961193d30dd35b.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 402.68,
        "height": 290.1,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "0e21d0fb-7800-446d-8610-a4561c3a81d3",
      "zIndex": 17
    },
    {
      "title": "颜色块",
      "name": "颜色块",
      "icon": "icon-flop",
      "img": "/img/flop2.31ee8a48.png",
      "top": 498.58,
      "left": 1564.11,
      "dataType": 0,
      "data": [
        {
          "value": "15.3",
          "suffixText": "%"
        }
      ],
      "dataFormatter": "",
      "component": {
        "width": 100.27,
        "height": 28.46,
        "name": "flop",
        "prop": "flop"
      },
      "option": {
        "span": 1,
        "decimals": 1,
        "whole": true,
        "padding": 12,
        "textAlign": "left",
        "splity": 23,
        "splitx": 17,
        "fontSize": 24,
        "prefixSplity": 4,
        "prefixFontSize": 13,
        "backgroundColor": "#F56C6C",
        "suffixText": "人",
        "suffixInline": true,
        "suffixSplitx": 0,
        "suffixFontSize": 14,
        "prefixSplitx": 0,
        "suffixSplity": 0,
        "type": "",
        "color": "rgba(247, 57, 57, 1)",
        "suffixColor": "rgba(247, 57, 57, 1)",
        "fontWeight": "bolder"
      },
      "index": "efcd4422-294a-4d8e-8a5a-185455b9dfd0",
      "zIndex": 16
    },
    {
      "title": "颜色块",
      "name": "颜色块",
      "icon": "icon-flop",
      "img": "/img/flop2.31ee8a48.png",
      "top": 502.51,
      "left": 1744.89,
      "dataType": 0,
      "data": [
        {
          "value": "15.3",
          "suffixText": "℃"
        }
      ],
      "dataFormatter": "",
      "component": {
        "width": 100.27,
        "height": 28.46,
        "name": "flop",
        "prop": "flop"
      },
      "option": {
        "span": 1,
        "decimals": 1,
        "whole": true,
        "padding": 12,
        "textAlign": "left",
        "splity": 23,
        "splitx": 17,
        "fontSize": 24,
        "prefixSplity": 4,
        "prefixFontSize": 13,
        "backgroundColor": "#F56C6C",
        "suffixText": "人",
        "suffixInline": true,
        "suffixSplitx": 0,
        "suffixFontSize": 14,
        "prefixSplitx": 0,
        "suffixSplity": 0,
        "type": "",
        "color": "rgba(248, 250, 47, 1)",
        "suffixColor": "rgba(248, 250, 47, 1)",
        "fontWeight": "bolder"
      },
      "index": "e39f9ce2-1ce7-45d8-9c4b-fce1b9ec5671",
      "zIndex": 15
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "XXX一张图测试"
      },
      "component": {
        "width": 463.4,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 44,
        "fontWeight": "bolder",
        "color": "#fff",
        "split": 0,
        "lineHeight": 0
      },
      "left": 707.84,
      "top": 17.38,
      "index": "322b8c17-aed1-48a6-8b36-b819df0bca10",
      "zIndex": 14
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "大红袍"
      },
      "component": {
        "width": 79.57,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 24,
        "fontWeight": "bolder",
        "color": "rgba(74, 252, 216, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 1597.33,
      "top": 825.65,
      "index": "9d715613-1534-458a-8e5c-d86813606342",
      "zIndex": 13
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "铁罗汉"
      },
      "component": {
        "width": 79.57,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 20,
        "fontWeight": "normal",
        "color": "rgba(25, 191, 175, 0.72)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 1555.41,
      "top": 876.74,
      "index": "418cf1c1-71c1-4f96-99f3-9d4707812e5f",
      "zIndex": 12
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "岩茶"
      },
      "component": {
        "width": 79.57,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 14,
        "fontWeight": "normal",
        "color": "rgba(36, 197, 255, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 1509.56,
      "top": 804.69,
      "index": "57e3a44b-84ed-4fdf-875b-ad2eef8f280c",
      "zIndex": 11
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "新茶上市"
      },
      "component": {
        "width": 120.18,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 20,
        "fontWeight": "bold",
        "color": "rgba(2, 255, 205, 0.43)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 1609.12,
      "top": 788.97,
      "index": "ec6f6b02-3a40-4a6d-8d86-b9039c38e344",
      "zIndex": 10
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "官方旗舰店"
      },
      "component": {
        "width": 120.18,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 20,
        "fontWeight": "bold",
        "color": "rgba(255, 255, 255, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 1707.37,
      "top": 807.31,
      "index": "bdaba762-230a-42e7-98aa-fc604038aff4",
      "zIndex": 9
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "驰名商标"
      },
      "component": {
        "width": 120.18,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 18,
        "fontWeight": "bold",
        "color": "rgba(255, 255, 255, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 1455.85,
      "top": 847.92,
      "index": "d3e4611a-545e-4e91-8bb1-b18e7e64ceba",
      "zIndex": 8
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "武夷茶"
      },
      "component": {
        "width": 138.52,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 18,
        "fontWeight": "normal",
        "color": "rgba(107, 183, 255, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 1664.14,
      "top": 859.71,
      "index": "f0414dbf-411a-4bf0-b8be-d91f8f3466e5",
      "zIndex": 7
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "茶树"
      },
      "component": {
        "width": 138.52,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 12,
        "fontWeight": "bolder",
        "color": "rgba(0, 212, 255, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 1592.09,
      "top": 859.71,
      "index": "0d34928d-dd9f-49b0-8520-bc7d73eeec0c",
      "zIndex": 6
    },
    {
      "title": "文本框",
      "name": "文本框",
      "icon": "icon-text",
      "img": "/img/text.852a3c54.png",
      "dataType": 0,
      "dataFormatter": "",
      "data": {
        "value": "新茶上市"
      },
      "component": {
        "width": 120.18,
        "height": 40,
        "name": "text",
        "prop": "text"
      },
      "option": {
        "textAlign": "center",
        "fontSize": 24,
        "fontWeight": "bold",
        "color": "rgba(2, 255, 205, 1)",
        "split": 0,
        "lineHeight": 0
      },
      "left": 1584.23,
      "top": 756.22,
      "index": "6c6cac2c-179f-4afc-a648-231ccac2270e",
      "zIndex": 5
    },
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 725.06,
      "left": 1483.79,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/8267555e03793b38374da7ef9822b305.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 317.93,
        "height": 223.99,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "c68b8733-af60-4b33-9619-12da5f7cbe3d",
      "zIndex": 4
    },
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 685.72,
      "left": 1442.14,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/afd456601d4329eba6c7e2f570f51d70.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 409,
        "height": 315.38,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "3c37d23a-8533-4145-877b-d050de3d111d",
      "zIndex": 3
    },
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 821.64,
      "left": 1354.64,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/2e7373217476e8cb8dbad822397ffb23.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 66.2,
        "height": 62.92,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "78a62445-b2f8-4eba-8453-71e2f2bab868",
      "zIndex": 2
    },
    {
      "title": "图片",
      "name": "图片",
      "icon": "icon-img",
      "img": "/img/img.97e50755.png",
      "top": 898.72,
      "left": 1377.6,
      "dataType": 0,
      "data": {
        "value": "https://oss.bladex.vip/caster/upload/20210207/165513f141e4d0dcab601a6428f3c389.png"
      },
      "dataFormatter": "",
      "component": {
        "width": 39.96,
        "height": 39.96,
        "name": "img",
        "prop": "img"
      },
      "option": {
        "duration": "1000",
        "opacity": 0
      },
      "index": "2e81d26a-fb02-4bae-9676-d7c2db2988d7",
      "zIndex": 1
    },
    {
      "name": "地图",
      "title": "地图",
      "icon": "icon-map",
      "img": "/img/map.8bf92896.png",
      "data": [],
      "dataFormatter": "",
      "component": {
        "width": 963.96,
        "height": 662.7,
        "name": "map",
        "prop": "map"
      },
      "option": {
        "borderWidth": 3,
        "scale": 87,
        "type": 0,
        "borderColor": "rgba(27, 246, 254, 1)",
        "areaColor": "rgba(4, 167, 140, 0.34)",
        "banner": true,
        "bannerTime": 3000,
        "fontSize": 20,
        "zoom": 0.7,
        "empAreaColor": "rgba(28, 222, 171, 131.4)",
        "empColor": "#fff",
        "index": "894edc1d-d2f0-4616-962c-8e61083ada71",
        "mapData": "https://data.bladex.vip/blade-visual/map/data?id=1344323018949726210",
        "color": "rgba(255, 255, 255, 1)"
      },
      "left": 424.83,
      "top": 275.1,
      "index": "0900b000-7392-418e-89d9-dee76c11dad9",
      "zIndex": 0,
      "dataType": 0
    }
  ]
}