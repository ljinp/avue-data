import { url } from '@/config';
import { config } from '@/option/config'
import request from '../axios'
export const getList = (params) => request({
  url: url + '/visual/list',
  method: 'get',
  params: params
});



export const copyObj = (id) => request({
  url: url + '/visual/copy',
  method: 'post',
  params: {
    id: id
  }
});

export const getCategory = (params) => request({
  url: url + '/category/list',
  method: 'get',
  params: params
});

export const getObj = (id) => request({
  url: url + '/visual/detail',
  method: 'get',
  params: {
    id
  }
});
export const uploadImg = (file) => request({
  url: url + '/visual/put-file',
  method: 'post',
  data: 'file=' + file,
  headers: { "Content-Type": "multipart/form-data" }
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
      detail: JSON.stringify(Object.assign(config, {
        name: data.title,
        width: data.width,
        height: data.height
      })),
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