import axios from 'axios'
// 获得列表
export const getUserList = (params) => {
  console.log('params', params);
  return axios.get(`/api/user`, {
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
  return axios.put(`/api/user/add/${id}`, {
    ...params
  })
}
export const getAppAdminList = param => {
  return axios.post('/neptune/app/query', {
    page: param.page || 1,
    size: param.size || 10,
    name: param.name,
    appSubjectId: param.appSubjectId,
    appKey: param.appKey,
    isDeleted: param.isDeleted,
  })
}

export const deleteAdminItem = appId => {
  return axios.get(`/neptune/app/delete/${appId}`)
}
// 获取应用主体下拉框列表
export const getSubjectSelect = () => {
  return axios.get(`/neptune/app-subject/queryAll`)
}
