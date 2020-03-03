import { url } from '@/config';
var request = window.axios;
export const getList = (category) => request({
  url: url + '/list',
  method: 'get',
  params: {
    category
  }
});


export const getTategory = () => request({
  url: url + '/category',
  method: 'get'
});

export const getObj = (id) => request({
  url: url + '/detail',
  method: 'get',
  params: {
    id
  }
});

export const addObj = (data) => request({
  url: url + '/save',
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
  url: url + '/update',
  method: 'post',
  data: data
});

export const updateObj = (data) => request({
  url: url + '/update',
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
  url: url + '/remove',
  method: 'post',
  params: {
    ids: id
  }
});