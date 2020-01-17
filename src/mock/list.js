
import Mock from 'mockjs'
import { getResult } from './utils.js'
//模板
Mock.mock('./list1', 'get', () => {
  const data = [{
    id: 3,
    img: './img/data/data3.jpg',
    label: "大屏模版1",
    status: true
  }, {
    id: 0,
    img: './img/data/data0.jpg',
    label: "大屏模版2",
    status: true
  }, {
    id: 1,
    img: './img/data/data1.jpg',
    label: "大屏模版3",
    status: false
  }, {
    id: 9,
    img: './img/data/data9.jpg',
    label: "大屏模版4",
    status: false
  }]
  return getResult(data)
})
//例子
Mock.mock('./list2', 'get', () => {
  const data = [{
    id: 2,
    img: './img/data/data2.jpg',
    label: "滑动组件",
    status: false
  }, {
    id: 4,
    img: './img/data/data4.jpg',
    label: "自定义组件",
    status: false
  }, {
    id: 5,
    img: './img/data/data5.jpg',
    label: "数据格式化",
    status: false
  }, {
    id: 6,
    img: './img/data/data6.jpg',
    label: "提示语格式化",
    status: false
  }, {
    id: 7,
    img: './img/data/data7.jpg',
    label: "选项卡例子",
    status: false
  }, {
    id: 8,
    img: './img/data/data8.jpg',
    label: "水印例子",
    status: false
  }]
  return getResult(data)
})
