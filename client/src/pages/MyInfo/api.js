import axios from 'axios'

const token = localStorage.getItem('token')
// 获取我的信息
export const getMe = (userId) => {
  return axios({
    method: 'get',
    url: `/api/user/${userId}`,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}

// 获取我的课程 通过专家id
export const getMyCourse = (params, userId) => {
  return axios({
    method: 'get',
    url: '/api/course/list/my',
    params: {
          page: params.page || 1,
          size: params.size || 10,
          search: params.search,
          teaId: userId,
    },
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}

// 获取我的申报 通过参训者id
export const getMyApply = (params, stuId) => {
  return axios({
    method: 'get',
    url: '/api/apply/my',
    params: {
          page: params.page || 1,
          size: params.size || 10,
          stuId: stuId,
          search: params.search,
    },
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}