

import { getResult } from '../utils.js'
import Mock from 'mockjs'
Mock.mock('./data8', 'get', () => {
  const data = {
    config: {
      width: 1920,
      height: 1080,
      scale: 1,
      mark: {
        show: true,
        text: 'avue数据大屏水印',
        fontSize: 20,
        textStyle: 'rgba(100,100,100,0.7)',
        degree: -20
      },
      backgroundImage: './img/bg/bg1.png',
      query: {}
    },
    list: []
  }
  return getResult(data)
})