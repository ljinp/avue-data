import { url } from '@/config';
var request = window.axios;
export const getList = (category) => request({
  url: url + '/visual/list',
  method: 'get',
  params: {
    category
  }
});


export const getTategory = () => request({
  url: url + '/visual/category',
  method: 'get'
});

export const getObj = (id) => request({
  url: url + '/visual/detail',
  method: 'get',
  params: {
    id
  }
});

export const addObj = (data) => request({
  url: url + '/visual/save',
  method: 'post',
  data: {
    visual: {
      password: data.password,
      category: data.category,
      status: data.status,
      title: data.title,
    },
    config: {
      detail: JSON.stringify({
        name: data.title,
        width: data.width,
        height: data.height,
        scale: 1,
        backgroundImage: '/img/bg/bg1.png',
        url: '',
        mark: {},
        gradeShow: false,
        gradeLen: 30,
      }),
      component: '[]'
    },
  }
});

export const updateComponent = (data) => request({
  url: url + '/visual/update',
  method: 'post',
  data: data
});

export const updateObj = (data) => request({
  url: url + '/visual/update',
  method: 'post',
  data: {
    "visual": {
      "id": data.id,
      "password": data.password,
      "category": data.category,
      "status": data.status,
      "title": data.title,
    }
  }
});

export const delObj = (id) => request({
  url: url + '/visual/remove',
  method: 'post',
  params: {
    ids: id
  }
});