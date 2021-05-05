import axios from 'axios'

const token = localStorage.getItem('token')
// 获得列表
export const getUserList = (params) => {
  return axios({
    method: 'get',
    url: '/api/course/list',
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

export const getTeaList = () => {
  return axios({
    method: 'get',
    url: '/api/user/tea',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}

export const addCourse = params => {
  return axios({
    method: 'post',
    url: '/api/course/add',
    data: params,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}

export const editUser = (id, params) => {
  return axios({
    method: 'put',
    url: `/api/course/${id}`,
    data: params,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}

// 更新审批状态
export const changeApprovalRequest = (courseId, approvalState) => {
  return axios({
    method: 'post',
    url: `/api/course/approval`,
    data: {
      courseId,
      approvalState
    },
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}

// 更新审批状态
export const changeOpeningRequest = (courseId, openState) => {
  return axios({
    method: 'post',
    url: `/api/course/open`,
    data: {
      courseId,
      openState
    },
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}

export const deleteItem = id => {
  return axios.delete(`/api/course/${id}`)
}
