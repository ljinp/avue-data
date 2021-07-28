# 数据大屏解决方案

## 介绍
数据大屏解决方案采用vue-cli项目编写，可以完美嵌套与任何项目，此项目只是大屏的解决方案，如果想要用于生产或更多场景的支持需要自己根据情况二次开发,[在线文档](https://www.kancloud.cn/smallwei/avue-doc)。


## 3种数据源
- 在线api（本项目采用了mock拦截方式模拟，具体文件/mock/index.js）
- 静态数据
- SQL数据库
- ...

## 引入其他项目使用
执行npm run lib 打出对应的包(public/lib)
- index.css
- index.umd.min.js  
引入相应的文件即可，可以参考public/view.html文件,传入对应的id，打开对应的大屏幕，例如view.html?id=xxxx
- [例子1](https://data.avuejs.com/view.html?id=5)
- [例子2](https://data.avuejs.com/view.html?id=8)

## 20+常用组件
- 图表
  - 万能自定义组件
  - 万能Echart组件 
  - dataV
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

## 自定义组件
- 组件配置
- /src/components/test/index
- /src/components/test/option
- /src/components/index.js
- 添加组件
- /src/option/base.js
- /src/option/components.js

## 其他例子
- [数据格式化例子](https://data.avuejs.com/build/16)
- [选项卡例子](https://data.avuejs.com/build/18)
- [地图事件例子](https://data.avuejs.com/build/19)
- [柱状图和折线图](https://data.avuejs.com/build/28)
- [任意echart使用](https://data.avuejs.com/build/29)
- [SQL使用例子](https://data.avuejs.com/build/55)

## 技术栈
- vue //底层核心包  
- axios //发送ajax请求数据的  
- element-ui //底层ui支持包  
- echart //底层的图表支持包  
- echarts-wordcloud //字浮云支持包  
- avue //大屏组件支持包  
- swiper //滑动和轮播支持包  
- Sortable和vuedraggable // 图拽支持包  

## 项目部署

```
//nginx为例子
location /{
    root /data/avue/avue-data;
    index index.html;
    error_page 404 /index.html; //根据vue路由特性，这句一定要配置，否则会出现404问题
}  
```
