# 数据大屏解决方案

## 介绍
数据大屏解决方案采用html项目编写，可以完美嵌套与任何项目，同时无需webpack+node的环境去编译，此项目只是大屏的解决方案，如果想要用于生产或更多场景的支持需要二次开发。  

如果需要其他数据源（excel,直链数据库等），或以下常用组件不能满足，你可以很灵活的进行二次开发，可以参考项目中data4.js例子的自定义组件开发
### 2种数据源
- 在线api
- 静态数据
- ...

### 20+常用组件
- 图表
  - 柱状图
  - 折线图
  - 饼图
  - 象形图
  - 雷达图
  - 散点图
  - 漏斗图
  - 地图
- 文字
  - 文本框
  - 跑马灯
  - 超链接
  - 实时时间
- 媒体
  - 图片
  - 图片框
  - 轮播图
  - iframe
  - video
- 指标
  - 翻牌器
  - 环形图
  - 进度条
  - 仪表盘
  - 字符云
- 表格
  - 选项卡
  - 表格
- ...

## 核心方法
### formatter
>如果数据移动到图表上需要展示的数据个性化定制，调用formatter-提示事件方法去处理（可以添加html标签和样式）  
```
//name 移动上去的当前数据名字
//data 接口返回的数据
formatter:(name,data)=>{
  return '<div>测试</div>'
}
```
### dataFormatter
>如果接口返回的数据格式和组件规定的格式不一致，如果调用dataFormatter-数据处理方法去处理加工数据  
```
//data 接口返回的数据
dataFormatter:(data)=>{
  var list = [];//这里处理成标准的数据格式,详情参考下面附录1
  return {
    data:list
  }
}
```
### clickFormatter
>如果需要点击图表进行操作，如果调用clickFormatter-点击事件方法去处理事件  
```
//name  点击的当前数据名字
//type  点击的当前数据类型
//value 点击的当前数据值
//data  接口返回的数据
clickFormatter:({name,type,value,data})=>{
 alert(1);
}
```
### labelFormatter
>组件顶部显示的组件，调用labelFormatter-如格式化显示
```
//name  点击的当前数据名字
//data  接口返回的数据
labelFormatter:({name,data})=>{
 return '返回name处理后的数据'
}
```
### mapList
>如果添加其他地图，需要在地图组件中mapList属性加入配置  
[在线地图选择](http://datav.aliyun.com/tools/atlas/)
你可以选择直接赋值给属性，也可以在map.js中赋值给一个变量，同时可以在地图选择字典中dicOption.js加入即可

以上这些例子在data文件夹下中有例子，其他骚操作需要你自己去发觉了，毕竟这个解决方案是比较灵活的.
例子分为2部分，第一部分是大屏模版，第二部分是部分组件的例子使用
## 通用属性
```
{
  name:'组件名称',
  title:'组件别名',
  icon:'组件图标',
  left:'组件x位置',
  top:'组件y位置',
  zIndex:'图层权重',
  display:'组件隐藏',
  destruction:'组件销毁',
  dataType:'数据请求格式| 0-静态数据 | 1-动态数据',
  dataMethod:'数据请求方式| get | post,
  url:'动态数据的请求地址',
  time:'数据的刷新间隔',
  //组件的配置
  component:{ 
    width:'组件的宽度',
    height:'组件的高度',
    name:'加载组件名',
    prop:'加载组件的类型',
    //组件属性配置
    option:{ 
        //每个组件的独立属性
    }
  },
}
```
## 技术栈
- vue //底层核心包  
- axios //发送ajax请求数据的  
- element-ui //底层ui支持包  
- echart //底层的图表支持包  
- echarts-wordcloud //字浮云支持包  
- avue //大屏组件支持包  
- swiper //滑动和轮播支持包  
- Sortable和vuedraggable // 图拽支持包  

## 目录
```
├── cdn //cdn资源  
├── css //样式库  
  ├── common.css //公共样式  
  ├── iconfont.css //阿里巴巴图表库样式  
  ├── list.css //大屏列表页样式  
  ├── style.css //构建起和展示样式  
├── data //大屏的数据和图例  
├── img //图库存储图片  
├── js //js方法包  
  ├── theme // 主题文件夹
  ├── baseList.js //基础组件列表  
  ├── colorOption.js //一些通用的配置  
  ├── common.js //初始化包  
  ├── components.js //公用组件包  
  ├── dicOption.js //项目中的字典  
  ├── imgOption.js //图库坐标配置  
  ├── map.js //地图坐标数据  
  ├── util.js //需要的工具包  
├── lib //底层核心包  
├── build.html //视图构建器页面  
├── index.html //大屏列表页面  
├── test.html //测试页面  
├── view.html //试图展示页面  
```
## 架构讲解
>目前的项目采用的纯前端技术，利用url获取参数动态的加载的对应的js文件中的配置,如果你有后台可以改造成通过ajax去读取数据库动态加载 
- index.html中的list数组为大屏的列表其中id为data目录下对应的文件  
- 当访问build.html和view.html时后面加上id参数便会加载对应的文件（build.html?id=1就会加载/data/data1.js）,相关源码js/util.js中的initData方法  
- build.html为构建器，你拖拽后即可点击生成对应的json串，参考data下的js自己再建立一个即可  
- view.html为视图预览，读取你的data下对应js进行展示  

## 附录1
### 柱状图
>数据格式
```
...
{
  "categories": [
    "苹果",
  ],
  "series": [{
    "name": "手机品牌",
    "data": [
      1000879,
    ]
  }]
}
...
```
### 折线图
>数据格式
```
...
{
  "categories": [
    "苹果",
  ],
  "series": [{
    "name": "手机品牌",
    "data": [
      1000879,
    ]
  }]
}
...
```
### 饼图
>数据格式
```
...
[{
    "name": "PC",
    "value": 97,
    "url": "http://www.baidu.com"
}]
...
```
### 象型图
>数据格式
```
...
{
  "categories": [
    "苹果",
  ],
  "series": [{
    "name": "手机品牌",
    "data": [
      1000879,
    ]
  }]
}
...
```
### 雷达图
```
...
{
  indicator: [{
    name: '销售',
    max: 6500
  }],
  series: [{
    data: [{
      value: [4300, 10000, 28000, 35000, 50000, 19000],
      name: '预算分配（Allocated Budget）'
    }]
  }]
}
...
```
### 散点图
```
...
[{
  data: [
    [1, 8.04],
    [2, 6.95]
]},
{
  data: [
    [1, 4.04],
    [2, 3.95]
  ]
}]
...
```
### 漏斗图
```
...
[{
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
}]
...
```
### 地图
```
...
[
    "name": "测试坐标1",
    "value": 1,
    "lng": 118.30078125,
    "lat": 36.91915611148194,
    "zoom": 1
  },
  {
    "name": "测试坐标2",
    "value": 1,
    "lng": 112.21435546875,
    "lat": 37.965854128749434,
    "zoom": 1
  }
]
...
```


