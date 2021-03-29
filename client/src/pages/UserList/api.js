import axios from 'axios'

export const getUserList = () => {
  return axios.get('/api/user')
}

export const addUser = params => {
  return axios.post('/api/user', {
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
