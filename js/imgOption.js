
function concat (prop, count, type, extend = [], defaults) {
  let list = [];
  for (let i = 1; i <= count; i++) {
    list.push({
      label: prop + i,
      value: `./img/${prop}/${prop}${i}.${extend.includes(i) ? defaults : type}`
    })
  }
  return list;
}
var imgTabs = [{
  title: '背景'
}, {
  title: '边框'
}, {
  title: '素材'
}, {
  title: '其他'
}]
var imgOption = [
  concat('bg', 10, 'jpg', [1, 2, 3], 'png'),
  concat('border', 16, 'png'),
  concat('source', 260, 'svg', [1, 15, 16, 20, 239.240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260], 'png'),
  concat('banner', 10, 'png'),
]