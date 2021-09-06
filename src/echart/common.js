import { setPx, getUrlParams } from './util';
import config from './config';
export default (() => {
  return {
    props: {
      click: Function,
      stylesFormatter: Function,
      dataFormatter: Function,
      titleFormatter: Function,
      labelFormatter: Function,
      clickFormatter: Function,
      sqlFormatter: Function,
      formatter: Function,
      echartFormatter: Function,
      width: {
        type: [Number, String],
        default: 600
      },
      height: {
        type: [Number, String],
        default: 600
      },
      theme: {
        type: String
      },
      animation: {
        type: Boolean,
        default: true
      },
      child: {
        type: Object,
        default: () => {
          return {};
        }
      },
      sql: {
        type: String
      },
      time: {
        type: Number,
        default: 0
      },
      url: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: true
      },
      dataType: {
        type: Number,
        default: 0
      },
      dataQuery: {
        type: Object,
        default: () => {
          return {};
        }
      },
      homeUrl: {
        type: String
      },
      dataAppend: {
        type: Boolean,
        default: false
      },
      dataMethod: {
        type: String,
        default: 'get'
      },
      id: {
        type: String,
        default: 'main_' + new Date().getTime()
      },
      data: {
        type: [Object, String, Array]
      },
      component: {
        type: Object,
        default: () => {
          return {};
        }
      },
      option: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    data () {
      return {
        propQuery: {},
        dataCount: 0,
        headerHeight: '',
        checkChart: '',
        myChart: '',
        dataChart: [],
        dataUrl: '',
        key: false,
        isChart: false,
        styles: {}
      };
    },
    watch: {
      echartFormatter () {
        this.updateChart();
      },
      url: {
        handler (val) {
          this.dataUrl = val || '';
        },
        deep: true,
        immediate: true
      },
      data: {
        handler () {
          this.updateData();
        },
        deep: true,
        immediate: true
      },
      width () {
        this.updateData();
      },
      height () {
        this.updateData();
      },
      theme () {
        // 这三句一句都不能少
        this.myChart.dispose();
        this.init();
        this.updateData();
      },
      option: {
        handler () {
          if (this.myChart && this.isChart) {
            this.updateData();
          }
        },
        deep: true,
        immediate: true
      }
    },
    computed: {
      dataChartLen () {
        return (this.dataChart || []).length;
      },
      switchTheme () {
        return this.vaildData(this.option.switchTheme, false);
      },
      name () {
        const result = this.$el.className.replace(config.name, '');
        return result;
      },
      minWidth () {
        const val = this.option.minWidth;
        if (val > this.width) return val;

      },
      isApi () {
        return this.dataType === 1;
      },
      isSql () {
        return this.dataType === 2;
      },
      style () {
        return this.component.style || {};
      },
      styleChartName () {
        const obj = {
          width: setPx(this.minWidth || this.width),
          height: setPx(this.height)
        };
        return obj;
      },
      styleSizeName () {
        return Object.assign({
          width: setPx(this.width),
          height: setPx(this.height)
        }, (() => {
          if (this.minWidth) {
            return {
              overflowX: 'auto',
              overflowY: 'hidden'
            };
          }
          return {};
        })(), this.styles);
      }
    },
    mounted () {
      this.init();
    },
    methods: {
      init () {
        const main = this.$refs[this.id];
        if (main) {
          // 判断是否图表去初始化
          this.isChart = config.echart.includes(this.name);
          if (this.isChart) this.myChart = window.echarts.init(main, this.theme);
          if (this.name == 'datav') {
            this.isChart = true;
            this.updateData()
          }
        }
      },
      updateUrl (url) {
        this.dataUrl = url;
        this.updateData();
      },
      // 更新数据核心方法
      updateData () {
        return new Promise((resolve, reject) => {
          this.resetData && this.resetData();
          if (this.key) return;
          this.key = true;
          const callback = () => {
            this.key = false;
            const bindEvent = () => {
              if (this.isChart) this.updateChart();
              if (this.myChart) this.bindClick();
              if (typeof this.stylesFormatter === 'function') {
                this.styles = this.stylesFormatter(this.dataChart) || {};
              }
              resolve(this.dataChart);

            }
            // 动态数据
            if (this.isApi) {
              let dataUrl = this.dataUrl.replace(config.homeurl, this.homeUrl);
              const detail = (res) => {
                // 处理返回的数据
                const result = (() => {
                  if (typeof this.dataFormatter === 'function') {
                    return this.dataFormatter(res.data);
                  };
                  return res.data || {};
                })();
                // 延迟效果数据逐步增加
                if (this.dataAppend) {
                  result.forEach(ele => {
                    this.dataCount++;
                    setTimeout(() => {
                      this.dataChart.unshift(ele);
                    }, this.dataCount * 1500);
                  });
                } else {
                  this.dataChart = result;
                }
                bindEvent();
              };
              let result = getUrlParams(dataUrl);
              let url = result.url;
              let params = Object.assign(result.params, this.dataQuery, this.propQuery);
              this.$axios[this.dataMethod](url, (() => {
                if (this.dataMethod === 'get') {
                  return {
                    params: params
                  };
                } else if (this.dataMethod === 'post') {
                  return params;
                }
              })()).then(res => {
                detail(res);
              });
            } else if (this.isSql) {
              this.sqlFormatter(this.sql).then(res => {
                // 静态数据
                if (typeof this.dataFormatter === 'function') {
                  this.dataChart = this.dataFormatter(res.data.data);
                } else {
                  this.dataChart = res.data.data;
                }
                bindEvent();
              })
            } else {
              // 静态数据
              if (typeof this.dataFormatter === 'function') {
                this.dataChart = this.dataFormatter(this.data);
              } else {
                this.dataChart = this.data;
              }
              bindEvent();
            }
          };
          this.$nextTick(() => {
            callback();
            clearInterval(this.checkChart);
            if (this.time !== 0 && this.disabled) {
              this.checkChart = setInterval(() => {
                callback();
              }, this.time);
            }
          });
        })

      },
      getLabelFormatter (name) {
        if (this.labelFormatter) {
          return this.labelFormatter(name, this.dataChart);
        }
        return name.value;
      },
      // 绑定点击事件
      bindClick () {
        this.myChart.off('click');
        this.myChart.on('click', e => {
          if (e.marker) {
            this.clickFormatter && this.clickFormatter({
              type: this.name,
              name: e.name,
              value: e.value[2] || e.value,
              data: this.dataChart
            });

          }
        });
      },
      // 下面俩都是chart的公共的方法,就放这里面共用
      getColor (index, first) {
        const barColor = this.option.barColor || [];
        if (barColor[index]) {
          const color1 = barColor[index].color1;
          const color2 = barColor[index].color2;
          const postion = (barColor[index].postion || 0.9) * 0.01;
          if (first) return color1;
          if (color2) {
            return {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: color1 // 0% 处的颜色
              }, {
                offset: postion,
                color: color2 // 100% 处的颜色
              }],
              global: false // 缺省为 false
            };
          }
          return color1;
        }
      },
      ishasprop (condition, isprop, alwaysObj) {
        return Object.assign((() => {
          return condition ? isprop : {};
        })(), alwaysObj);
      }
    },
    beforeDestroy () {
      clearInterval(this.checkChart);
    }
  };
})();
