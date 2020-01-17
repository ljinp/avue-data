// 查看页面和编辑页面公用的参数和方法
import { config } from '@/option/config'
import { addUrlParam } from '@/utils/utils'
export default {
  data () {
    return {
      scale: 1,
      config: config,
      list: []
    }
  },
  computed: {
    //计算中央可视化大屏比例
    styleName () {
      const scale = this.config.scale;
      return Object.assign({
        transform: `scale(${scale / 100}, ${scale / 100})`,
        width: this.setPx(this.config.width),
        height: this.setPx(this.config.height),
        backgroundColor: this.config.backgroundColor
      }, (() => {
        if (this.config.backgroundImage) {
          return {
            background: `url(${this.config.backgroundImage}) 0% 0% / 100% 100% rgb(3, 12, 59)`,
          }
        }
        return
      })())
    },
  },
  mounted () {
    this.initData();
  },
  methods: {
    //适配尺寸
    setResize () {
      this.$nextTick(() => {
        this.$refs.content.style.width = this.setPx((this.config.scale * this.config.width) / 100)
        this.$refs.content.style.height = this.setPx((this.config.scale * this.config.height) / 100)
      })
    },
    //计算比例
    setScale (width) {
      this.$nextTick(() => {
        this.config.scale = (width / this.config.width) * 100
        this.scale = this.config.scale;
        this.setResize();
      })
    },
    //合并组件参数和公共参数查询参数
    handleGetQuery (item) {
      return Object.assign(this.deepClone(this.config.query), item.dataQuery)
    },
    //点击事件交互
    handleConClick ({ type, child, value }) {
      if (type === 'tabs') {
        const indexList = child.index;
        indexList.forEach((index) => {
          const paramName = child.paramName;
          let url = this.list[index].url;
          if (url) {
            this.list[index].url = addUrlParam(url, paramName, value);
            this.$refs['list_' + index].forEach(ele => {
              ele.updateData();
            })
          }
        })
      }
    },
    calcData () {
      if (!this.config.mark) this.config.mark = {}
      if (!this.config.query) this.config.query = {}
    },
    //初始化数据
    initData () {
      const id = this.$route.query.id;
      this.contentWidth = this.$refs.content.offsetWidth;
      const isBuild = this.$route.path == '/build';
      const width = isBuild ? this.contentWidth : document.body.clientWidth
      //添加水印。只有查看页面生效
      if (!isBuild) {
        if (this.config.mark.show) {
          this.watermark(this.config.mark);
        }
      }
      if (id) {
        const loading = this.$loading({
          lock: true,
          text: '正在加载中，请稍后',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$httpajax.get('./data' + id).then(res => {
          const data = res.data.data;
          this.list = data.list;
          this.config = data.config;
          this.calcData();
          this.setScale(width);
          loading.close();
        })
      } else {
        this.setScale(width);
      }
    }
  }
}