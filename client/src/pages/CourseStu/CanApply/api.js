import axios from 'axios'

const token = localStorage.getItem('token')
// 获得列表
export const getUserList = (params) => {
  return axios({
    method: 'get',
    url: '/api/course/list/canApply',
    params: {
          page: params.page || 1,
          size: params.size || 10,
          search: params.search,
    },
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}
// 添加申报
export const addApply = params => {
  return axios({
    method: 'post',
    url: '/api/apply/add',
    data: {
      ...params
    },
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}