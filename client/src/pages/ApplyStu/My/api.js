import axios from 'axios'
// 获得列表
let token = localStorage.getItem('token')
export const getApplyList = (params, stuId) => {
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

export const getStuList = () => {
  return axios({
    method: 'get',
    url: '/api/user/stu',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}

export const getCourseList = () => {
  return axios({
    method: 'get',
    url: '/api/course/list/no-page',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}

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


export const deleteItem = id => {
  return axios({
    method: 'delete',
    url: `/api/apply/${id}`,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}
