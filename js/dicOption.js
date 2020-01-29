var dicOption = {
  line: [{ label: '线条', value: 'line' }, { label: '圆环', value: 'circle' }],
  fontWeight: [{ label: 'normal', value: 'normal' }, { label: 'bold', value: 'bold' }, { label: 'bolder', value: 'bolder' }, { label: 'ligter', value: 'ligter' }],
  border: [{ label: '无边框', value: '' }, { label: '内置图片', value: 'img' }, { label: '内置边框', value: 'border' }],
  textAlign: [{ label: '居中', value: 'center' }, { label: '左对齐', value: 'left' }, { label: '右对齐', value: 'right' }],
  dataType: [{ label: '静态数据', value: 0 }, { label: '动态数据', value: 1 }],
  orientList: [{ label: '竖排', value: 'vertical' }, { label: '横排', value: 'horizontal' }],
  dataMethod: [{ label: 'POST', value: 'post' }, { label: 'GET', value: 'get' }],
  eventList: ['tabs'],
  dataList: ['tabs', 'map', 'video', 'wordCloud', 'pie', 'pictorialBar', 'iframe', 'swiper', 'flop', 'bar', 'line', 'progress', 'table', 'gauge', 'funnel', 'scatter', 'radar'],
  themeList: [{
    label: '默认配色',
    value: 'avue'
  }, {
    label: '紫色主题',
    value: 'macarons'
  }, {
    label: '绿色主题',
    value: 'wonderland'
  }],
  barList: ['bar', 'line'],
  titleList: ['bar', 'pie', 'line', 'radar', 'funnel'],
  labelList: ['bar', 'line', 'pie', 'radar', 'scatter'],
  legendList: ['bar', 'pie', 'line', 'radar', 'funnel'],
  colorList: ['bar', 'pie', 'line', 'gauge', 'funnel', 'scatter', 'radar'],
  tipList: ['bar', 'pie', 'line', 'gauge', 'funnel', 'scatter', 'radar'],
  postionList: ['bar', 'line', 'pictorialbar'],
  formatterList: ['bar', 'map', 'line', 'pie', 'gauge', 'funnel', 'scatter', 'radar'],
  clickFormatterList: ['map'],
  labelFormatterList: ['bar'],
  tabsTypeList: [{
    label: '选项卡',
    value: 'tabs',
  }, {
    label: '选择框',
    value: 'select',
  }],
  mapList: [{
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
  }],
  mapType: [{
    label: '原生',
    value: 0
  }],
  target: [{ label: '本窗口', value: '_self' }, { label: '新窗口', value: '_blank', }],
  swiperType: [{ label: '普通', value: '' }, { label: '立体', value: 'card' }],
  swiperIndicator: [{ label: '外部', value: 'indicator' }, { label: '不显示', value: 'none' }],
  format: [{ label: '日期', value: 'yyyy-MM-dd' }, { label: '日期+时分', value: 'yyyy-MM-dd hh:mm' }, { label: '日期+时分秒', value: 'yyyy-MM-dd hh:mm:ss' }, { label: '日期(无年)', value: 'MM-dd' }, { label: '时分', value: 'hh:mm' }, { label: '时分秒', value: 'hh:mm:ss' }, { label: '星期', value: 'day' }]
}