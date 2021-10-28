<template>
  <div class="list create-screen">
    <div class="top-bar">
      <div class="right-bar"></div>
      <div class="left-bar"></div>
      <router-link to="/"
                   class="return-btn">
        <span class="return-text">
          取消创建
        </span>
      </router-link>
    </div>
    <div class="create-box">
      <p class="avue-tip-title">选择下面的模版进行创建</p>
      <div class="create-scroll">
        <div class="content__box">
          <div class="content__item"
               :class="{'content--active':count==index}"
               v-for="(item,index) in list"
               @click="count=index"
               :key="index">
            <div class="content__info">
              <img v-if="item.backgroundUrl"
                   :src="item.backgroundUrl"
                   alt="" />
            </div>
            <div class="content__main">
              <span class="content__name">{{item.title}}</span>
              <div class="content__menulist"> </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="create-content">
      <img :src="active.backgroundUrl"
           alt="">
      <avue-form :option="option"
                 v-model="form"
                 @submit="handleSave"></avue-form>
    </div>
  </div>

</template>

<script>

import { addObj, copyObj, updateObj } from '@/api/visual';
export default {
  name: "CreateScreen",
  data () {
    return {
      list: [{
        id: 0,
        title: '空白模板',
        backgroundUrl: 'https://oss.bladex.vip/caster/upload/20211026/359aec0be15cc93ad168c36f2d8ad0a1.jpg'
      }, {
        id: 1,
        title: "数据大屏模板1",
        backgroundUrl: "https://oss.bladex.vip/caster/upload/20201120/59ed8621a5e3518aeea50a78f48de52f.jpg",
      }, {
        id: 2,
        title: "数据大屏模板2",
        backgroundUrl: "https://oss.bladex.vip/caster/upload/20201123/abe47c7959de86f7b1b7e6134b7c8e7c.jpg",
      }, {
        id: 3,
        title: "数据大屏模板3",
        backgroundUrl: "https://oss.bladex.vip/caster/upload/20201120/ba6387c840d534047d55dc65e97b2ae4.jpg",
      }, {
        id: 4,
        title: "数据大屏模板4",
        backgroundUrl: "https://oss.bladex.vip/caster/upload/20201122/2bcf7deba047b28954099fea71b64c29.jpg",
      }, {
        id: 6,
        title: "数据大屏模板5",
        backgroundUrl: "https://oss.bladex.vip/caster/upload/20210730/8bb6300dea753536bb63a391021267e3.jpg"
      }, {
        id: 7,
        title: "数据大屏模板6",
        backgroundUrl: "https://oss.bladex.vip/caster/upload/20210725/2603641a5f510994ccc740191673e96f.jpg"
      }, {
        id: 8,
        title: "数据大屏模板7",
        backgroundUrl: "https://oss.bladex.vip/caster/upload/20211011/a5b594bf7cce334a591830323ab216ee.jpg"
      }],
      count: 0,
      form: {
        title: '',
        password: '',
        category: '',
        width: '1920',
        height: '1080'
      },
      option: {
        submitText: '创建大屏',
        size: 'medium',
        column: [{
          label: '分组',
          prop: 'category',
          span: 24,
          labelWidth: 100,
          type: 'select',
          dicUrl: this.url + '/category/list',
          props: {
            label: 'categoryKey',
            value: 'categoryValue',
          },
          rules: [{
            required: true,
            message: "请选择分组",
            trigger: "blur"
          }]
        }, {
          label: '大屏名称',
          span: 24,
          labelWidth: 100,
          prop: 'title',
          rules: [{
            required: true,
            message: "请输入大屏名称",
            trigger: "blur"
          }]
        }, {
          label: '大屏尺寸',
          span: 14,
          labelWidth: 100,
          prop: 'width',
          placeholder: '请输入宽度',
          rules: [{
            required: true,
            message: "请输入大屏尺寸",
            trigger: "blur"
          }]
        }, {
          label: '',
          span: 10,
          labelWidth: 1,
          prop: 'height',
          placeholder: '请输入高度',
          rules: [{
            required: true,
            message: "请输入大屏尺寸",
            trigger: "blur"
          }]
        }, {
          label: '密码',
          span: 24,
          type: 'password',
          labelWidth: 100,
          prop: 'password',
        }]
      },
    }
  },
  computed: {
    active () {
      return this.list[this.count] || {}
    }
  },
  created () {
    this.form.category = this.$route.query.category;
  },
  methods: {
    handleSave () {
      if (this.count == 0) {
        addObj(this.form).then(res => {
          const id = res.data.data.id;
          this.handleEdit({ id })
        })
      } else {
        let id;
        copyObj(this.active.id).then(res => {
          id = res.data.data
          return updateObj({
            id: id,
            category: this.form.category,
            password: this.form.password,
            status: this.form.status,
            title: this.form.title
          })
        }).then(() => {
          this.handleEdit({ id })
        })
      }
    },
    handleEdit (item) {
      let routeUrl = this.$router.resolve({
        path: '/build/' + item.id
      })
      window.location.replace(routeUrl.href);
    },
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/list.scss";
.create-screen {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(0, 51, 125, 0.07);
  margin: 0;
  padding: 0;
  user-select: none;

  .top-bar {
    height: 50px;
    width: 100%;
    position: relative;

    &::before {
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 20px;
      width: 100%;
      background: #151b22;
    }

    .right-bar {
      position: absolute;
      left: 150px;
      top: 20px;
      height: 5px;
      width: 100%;
      border-top: 2px solid rgb(38, 129, 255);
      border-left: 2px solid rgb(38, 129, 255);
      background: rgba(55, 126, 255, 0.04);
      border-top-left-radius: 5px;
      transform: skewX(-45deg);
      box-shadow: 0 5px 28px 0 rgba(55, 126, 255, 0.28);
    }

    .left-bar {
      position: absolute;
      left: 0;
      top: 24px;
      height: 25px;
      width: 138px;
      border-right: 2px solid rgb(38, 129, 255);
      border-bottom: 2px solid rgb(38, 129, 255);
      transform: skewX(-45deg);
      border-bottom-right-radius: 5px;
      box-shadow: 0 5px 28px 0 rgba(55, 126, 255, 0.28);
    }

    .return-btn {
      position: absolute;
      left: -31px;
      top: 0;
      width: 180px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      background: #151b22;
      cursor: pointer;
      transform: skewX(-45deg);
      border-bottom-right-radius: 5px;

      .return-text {
        display: inline-block;
        color: #fff;
        font-size: 14px;
        margin-left: 10px;
        transform: skewX(45deg);
        transition: 0.2s;

        &:hover {
          color: var(--datav-main-color);
        }
      }

      .return-icon {
        margin-right: 5px;
      }
    }
  }
}
.create-box {
  margin-top: 10px;
  margin-bottom: 40px;
  width: 100%;
  overflow-x: auto;
  .avue-tip-title {
    padding-left: 20px;
  }
}
.create-scroll {
  padding-bottom: 20px;
  width: 3000px;
}
.create-content {
  padding: 40px 20px;
  display: flex;
  align-items: flex-start;
  background-color: #000;
  box-sizing: border-box;
  img {
    width: 500px;
    display: block;
    position: relative;
    border: 1px solid #2681ff;
    box-shadow: 0 0 10px -6px #000;
  }
}
.create-dialog {
  .required {
    display: inline-block;
    margin-right: 6px;
    color: var(--datav-red-color);
  }

  .template-desc {
    margin-bottom: 20px;
    opacity: 0.8;
    overflow: hidden;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .name-title {
    margin-bottom: 10px;
  }

  .name-input {
    margin-bottom: 15px;
    height: 28px;
    line-height: 26px;
  }
}
</style>