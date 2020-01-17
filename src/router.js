import Router from 'vue-router';
import Vue from 'vue';
Vue.use(Router)
const vueRouter = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: '列表页',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/page/list')
  }, {
    path: '/build',
    name: '编辑页面',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/page/build')
  }, {
    path: '/view',
    name: '查看页面',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/page/view')
  }]
})
export default vueRouter;