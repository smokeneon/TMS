import axios from 'axios'
// 获得列表
export const getUserList = (params) => {
  return axios.get(`/api/course`, {
    params: {
      page: params.page || 1,
      size: params.size || 10,
      search: params.search,
    }
  })
}

export const addUser = params => {
  return axios.post('/api/user/add', {
    ...params
  })
}

export const editUser = (id, params) => {
  return axios.put(`/api/user/${id}`, {
    ...params
  })
}


export const deleteItem = id => {
  return axios.delete(`/api/user/${id}`)
}
