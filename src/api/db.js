import { url } from '@/config';
import request from '../axios';
export const getList = (current, size, params) => {
  return request({
    url: url + '/db/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getDetail = (id) => {
  return request({
    url: url + '/db/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: url + '/db/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: url + '/db/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: url + '/db/submit',
    method: 'post',
    data: row
  })
}
export const dynamicSql = (data) => {
  return request({
    url: url + '/db/dynamic-query',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}