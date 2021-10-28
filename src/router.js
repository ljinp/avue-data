import Router from 'vue-router';
import Vue from 'vue';
Vue.use(Router)
const vueRouter = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'list',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/page/index')
  }, {
    path: '/create',
    name: 'create',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/page/create')
  }, {
    path: '/build/:id',
    name: 'build',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/page/build')
  }, {
    path: '/view/:id',
    name: 'view',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/page/view')
  }]
})
export default vueRouter;