<template>
  <div class="head">
    <div class="head_actions head_left">
      <div class="head_btn"
           :class="{'head_btn--active':contain.menuShow}"
           @click="handleFlag('menuShow')">
        <el-tooltip effect="dark"
                    content="图层"
                    placement="top">
          <i class="el-icon-s-operation"></i>
        </el-tooltip>
      </div>
      <div class="head_btn"
           :class="{'head_btn--active':contain.paramsShow}"
           @click="handleFlag('paramsShow')">
        <el-tooltip effect="dark"
                    content="操作"
                    placement="top">
          <i class="el-icon-setting"></i>
        </el-tooltip>
      </div>
    </div>
    <div class="head_info">
      <i class="el-icon-data-analysis"></i>
      <span>AvueData-{{contain.config.name}}</span>
    </div>
    <div class="head_actions">
      <div class="head_btn"
           @click="handleBuild">
        <el-tooltip effect="dark"
                    content="保存"
                    placement="top">
          <i class="iconfont icon-build"></i>
        </el-tooltip>
      </div>
      <div class="head_btn"
           @click="handleImg">
        <el-tooltip effect="dark"
                    content="导出图片"
                    placement="top">
          <i class="el-icon-camera"></i>
        </el-tooltip>
      </div>
      <div class="head_btn"
           @click="handleView"
           v-show="contain.menuFlag">
        <el-tooltip effect="dark"
                    content="预览"
                    placement="top">
          <i class="iconfont icon-view"></i>
        </el-tooltip>
      </div>
      <div class="head_btn"
           @click="handleReset"
           v-show="!contain.menuFlag">
        <el-tooltip effect="dark"
                    content="还原"
                    placement="top">
          <i class="iconfont icon-reset"></i>
        </el-tooltip>
      </div>
      <div class="head_btn"
           @click="$refs.result.show=true">
        <el-tooltip effect="dark"
                    content="大屏结构"
                    placement="top">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </div>
      <div class="head_btn"
           @click="handleShare">
        <el-tooltip effect="dark"
                    content="分享"
                    placement="top">
          <i class="el-icon-share"></i>
        </el-tooltip>
      </div>
      <div class="head_btn"
           :disabled='!contain.canUndo'
           @click="contain.editorUndo">
        <el-tooltip effect="dark"
                    content="撤销"
                    placement="top">
          <i class="nav__icon el-icon-arrow-left"></i>
        </el-tooltip>
      </div>
      <div class="head_btn"
           :disabled='!contain.canRedo'
           @click="contain.editorRedo">
        <el-tooltip effect="dark"
                    content="重做"
                    placement="top">
          <i class="nav__icon el-icon-arrow-right"></i>
        </el-tooltip>
      </div>
    </div>
    <result ref="result"></result>
  </div>
</template>

<script>
import result from './result';
import { updateComponent } from '@/api/visual'
export default {
  inject: ["contain"],
  components: {
    result
  },
  methods: {
    handleReset () {
      this.contain.menuFlag = true;
      this.contain.setScale(this.contain.contentWidth);
    },
    handleFlag (name) {
      this.contain[name] = !this.contain[name]
      this.$nextTick(() => {
        this.contain.setScale(document.getElementsByClassName('section')[0].clientWidth);
      })
    },
    handleView () {
      this.contain.menuFlag = false;
      this.$nextTick(() => {
        this.contain.handleInitActive();
        this.contain.setScale(document.body.clientWidth);
      })
    },
    handleBuild (fn) {
      let isFun = typeof (fn) === 'function'
      if (!isFun && this.$route.params.id <= 100) {
        this.$message.error('模版例子不能修改')
        return
      }
      this.contain.handleInitActive();
      const loading = this.$loading({
        lock: true,
        text: '正在保存配置，请稍后',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.$nextTick(() => {
        html2canvas(document.getElementById('content'), {
          useCORS: true,
          backgroundColor: null,
          allowTaint: true
        }).then(canvas => {
          function dataURLtoFile (dataurl, filename) {
            var arr = dataurl.split(','),
              mime = arr[0].match(/:(.*?);/)[1],
              bstr = atob(arr[1]),
              n = bstr.length,
              u8arr = new Uint8Array(n);
            while (n--) {
              u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
          }

          var file = dataURLtoFile(canvas.toDataURL('image/jpeg', 0.1), new Date().getTime() + '.jpg');
          var formdata = new FormData();
          formdata.append('file', file)
          axios.post(this.url + '/visual/put-file', formdata, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }).then(res => {
            const data = res.data.data;
            const url = data.link;
            const formdata = {
              visual: {
                id: this.contain.visual.id,
                backgroundUrl: url
              },
              config: {
                id: this.contain.obj.config.id,
                visualId: this.contain.visual.id,
                detail: JSON.stringify(this.contain.config),
                component: JSON.stringify(this.contain.nav),
              },
            }
            return updateComponent(formdata)
          }).then(() => {
            loading.close();
            if (isFun) {
              fn()
            } else {
              this.$message.success('大屏配置保存成功');
            }
          }).catch(err => {
            this.$message.error('大屏配置保存失败，请检查服务端配置')
            loading.close();
          })
        })
      })
    },
    handleImg () {
      this.$confirm('是否导出大屏图片？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$Screenshot(document.querySelector("#wrapper")).then(canvas => {
          this.downFile(canvas.toDataURL("image/jpeg", 0.8), new Date().getTime());
          this.$message.success('图片导出成功')
        });
      }).catch(() => {

      });

    },
    handleShare () {
      this.handleBuild(() => {
        let routeUrl = this.$router.resolve({
          path: '/view/' + this.contain.id
        })
        window.open(routeUrl.href, '_blank');
      })
    }
  }
}
</script>

<style lang="scss">
.head {
  position: relative;
  height: 41px;
  padding-right: 8px;
  display: flex;
  z-index: 100;
  align-items: center;
  user-select: none;
  color: var(--datav-gui-font-color-base);
  border-bottom: var(--datav-border-dark);
  background: #1d1e1f;
  &_actions {
    position: absolute;
    top: 0;
    right: 8px;
    width: 300px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 40px;
  }
  &_left {
    left: 8px;
    justify-content: flex-start;
  }
  &_btn {
    margin-left: 4px;
    width: 40px;
    height: 24px;
    line-height: 26px;
    text-align: center;
    cursor: pointer;
    background: #303640;
    transition: 0.2s;
    i {
      color: #fff;
    }
    &--active {
      background-color: #2681ff;
    }
  }
  &_info {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    text-align: center;
    cursor: default;
    font-size: 14px;
    max-width: 500px;
    font-weight: bold;
    color: #fff;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    align-items: center;
    i {
      margin-right: 8px;
      font-size: 20px;
    }
  }
}
</style>
<style>
.head_btn {
  box-shadow: inset 0 0 0 1px rgb(255 235 235 / 10%), 0 0 0 1px #181818;
}
</style>