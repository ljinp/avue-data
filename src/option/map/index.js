//自己可以在这里扩展地图参考
//http://datav.aliyun.com/tools/atlas/#&lat=39.30029918615029&lng=105.99609375&zoom=3
import map_china from './china'
import map_weifang from './wf'
import map_hk from './hk'
import map_changle from './cl'

export default [{
  label: '中国',
  value: 0,
  list: map_china
}, {
  label: '潍坊',
  value: 1,
  list: map_weifang
}, {
  label: '香港',
  value: 2,
  list: map_hk
}, {
  label: '昌乐',
  value: 3,
  list: map_changle
}]
