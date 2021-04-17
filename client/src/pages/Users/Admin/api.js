import axios from 'axios'
// 获得列表
let token = localStorage.getItem('token')
export const getUserList = (params) => {
  return axios({
    method: 'get',
    url: '/api/user',
    params: {
          page: params.page || 1,
          size: params.size || 10,
          search: params.search,
          type: 'admin',
    },
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}

export const addUser = params => {
  return axios({
    method: 'post',
    url: '/api/user/add',
    data: {
      ...params
    },
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}

export const editUser = (id, params) => {
  return axios({
    method: 'put',
    url: `/api/user/${id}`,
    data: {
      ...params
    },
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}


export const deleteItem = id => {
  return axios({
    method: 'delete',
    url: `/api/user/${id}`,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}
