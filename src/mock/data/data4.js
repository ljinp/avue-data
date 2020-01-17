
import { getResult } from '../utils.js'
import Mock from 'mockjs'
Mock.mock('./data4', 'get', () => {
  const data = {
    config: {
      name: 'avuex中心驾驶管理舱（全市）',
      width: 3840,
      height: 2160,
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
          "name": "自定义组件",
          "title": "自定义组件",
          "icon": "icon-slide",
          "left": 1380.6666666666658,
          "top": 327.6666666666677,
          "component": {
            "width": 1000,
            "height": 500,
            "name": "test",
            "prop": "test",
            "option": {
              "data": '我是参数1234',
              "fontSize": 72,
            }
          },
          "index": 0
        }
      ]
    })()

  }
  return getResult(data)
})
