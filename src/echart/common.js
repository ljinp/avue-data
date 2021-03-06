import { setPx, getUrlParams, validatenull } from './util';
import config from './config';
import crypto from '@/utils/crypto'
import { funEval, uuid } from '@/utils/utils';
import COMMON from '@/config'
export default (() => {
  return {
    props: {
      stylesFormatter: Function,
      dataFormatter: Function,
      titleFormatter: Function,
      labelFormatter: Function,
      clickFormatter: Function,
      sqlFormatter: Function,
      formatter: Function,
      echartFormatter: Function,
      dataQuery: Function,
      dataHeader: Function,
      child: Object,
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
      dataMethod: {
        type: String,
        default: 'get'
      },
      id: {
        type: String,
        default: 'main_' + uuid()
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
        dynamicQuery: {},
        propQuery: {},
        headerHeight: '',
        checkChart: '',
        myChart: '',
        dataChart: [],
        dataAxios: {},
        dataUrl: '',
        key: false,
        isChart: false,
        styles: {},
        appendCheck: {},
        appendObj: {},
        appendList: []
      };
    },
    watch: {
      dataAppend (val) {
        this.appendObj = {};
        this.appendList = []
        if (!val) {
          this.appendCheck = clearInterval(this.appendCheck)
        } else {
          this.dataChart = []
        }
        this.updateData()
      },
      echartFormatter () {
        this.updateChart && this.updateChart();
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
        // ???????????????????????????
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
      count () {
        return this.option.count;
      },
      dataAppend () {
        return this.option.dataAppend;
      },
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
          // ??????????????????????????????
          this.isChart = config.echart.includes(this.name);
          if (this.isChart) this.myChart = window.echarts.init(main, this.theme);
          if (this.name == 'datav') {
            this.isChart = true;
            this.updateData()
          }
        }
      },
      getItemRefs () {
        let refList = this.$parent.$parent.$refs;
        let result = {}
        Object.keys(refList).forEach(ele => {
          if (ele.indexOf(COMMON.NAME) !== -1) {
            result[ele.replace(COMMON.NAME, '')] = refList[ele][0]
          }
        })
        return result;
      },
      updateClick (params) {
        let refList = this.getItemRefs();
        let indexList = this.child.index;
        let indexName = this.child.paramName;
        if (validatenull(indexName) && validatenull(indexList)) return
        let p = {};
        p[indexName] = params.value
        Object.keys(refList).forEach(ele => {
          if (indexList.includes(ele)) refList[ele].updateData(p);
        })
      },
      updateAppend (result) {
        if (this.validatenull(this.appendObj)) {
          this.appendList = result
          this.appendObj = result[0]
        } else {
          let appendList = [];
          for (let i = 0; i < result.length; i++) {
            const ele = result[i]
            if (ele.id === this.appendObj.id) break
            else appendList.push(ele)
          }
          this.appendObj = result[0]
          appendList.reverse().forEach(ele => {
            this.appendList.unshift(ele);
          })
        }
        if (this.validatenull(this.appendCheck)) {
          this.appendCheck = setInterval(() => {
            let length = this.appendList.length - 1;
            if (length >= 0) {
              let obj = this.appendList.splice(length, 1)[0]
              this.dataChart.unshift(obj);
              let len = this.dataChart.length;
              if (len > this.count) {
                this.appendList.splice(len - 1, 1)
              }
            }
          }, 2000)
        }
      },
      updateUrl (url) {
        this.dataUrl = url;
        this.updateData();
      },
      // ????????????????????????
      updateData (p = {}) {
        this.dynamicQuery = Object.assign(this.dynamicQuery, p)
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
                this.styles = this.stylesFormatter(this.dataChart, this.dynamicQuery, this.getItemRefs()) || {};
              }
              resolve(this.dataChart);

            }

            // ????????????
            if (this.isApi) {
              const detail = (res) => {
                // ?????????????????????
                this.dataAxios = res;
                let result = (() => {
                  if (typeof this.dataFormatter === 'function') {
                    return this.dataFormatter(res.data, this.dataAxios, this.getItemRefs());
                  };
                  return res.data || {};
                })();
                // ??????????????????????????????
                if (this.dataAppend) {
                  this.updateAppend(result)
                } else {
                  this.dataChart = result;
                }
                bindEvent();
              };
              let result = getUrlParams(this.dataUrl);
              let url = result.url;
              if (this.validatenull(url)) return
              let dataQuery = typeof (this.dataQuery) === 'function' && this.dataQuery(result);
              let dataHeader = typeof (this.dataHeader) === 'function' && this.dataHeader(result) || {};
              let params = Object.assign(result.params, dataQuery, this.propQuery, this.dynamicQuery);
              this.$axios({
                method: this.dataMethod,
                url: url,
                data: params,
                headers: dataHeader,
                params: params
              }).then(res => {
                detail(res);
              });
            } else if (this.isSql) {
              let sql = JSON.parse(crypto.decrypt(this.sql));
              let result;
              try {
                sql.sql = funEval(sql.sql)(this.dynamicQuery)
                result = crypto.encrypt(JSON.stringify(sql));
              } catch (error) {
                result = this.sql;
              }
              this.sqlFormatter(result).then(res => {
                // ????????????
                if (typeof this.dataFormatter === 'function') {
                  this.dataChart = this.dataFormatter(res.data.data, this.dynamicQuery, this.getItemRefs());
                } else {
                  this.dataChart = res.data.data;
                }
                bindEvent();
              })
            } else {
              // ????????????
              if (typeof this.dataFormatter === 'function') {
                this.dataChart = this.dataFormatter(this.data, this.dynamicQuery, this.getItemRefs());
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
      // ??????????????????
      bindClick () {
        this.myChart.off('click');
        this.myChart.on('click', e => {
          if (e.marker) {
            this.clickFormatter && this.clickFormatter({
              type: this.name,
              name: e.name,
              value: e.value[2] || e.value,
              data: this.dataChart
            }, this.getItemRefs());

          }
        });
      },
      // ???????????????chart??????????????????,?????????????????????
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
                color: color1 // 0% ????????????
              }, {
                offset: postion,
                color: color2 // 100% ????????????
              }],
              global: false // ????????? false
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
