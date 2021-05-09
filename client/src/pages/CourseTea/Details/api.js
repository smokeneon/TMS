import axios from 'axios'

const token = localStorage.getItem('token')
// 获得course详情
export const getCourseDetails = (courseId) => {
  return axios({
    method: 'get',
    url: `/api/course/toDetails/${courseId}`,
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

// 更新分数
export const changeScoreRequest = (apply, score) => {
 
  return axios({
    method: 'post',
    url: `/api/apply/score`,
    data: {
      applyId: apply.applyId,
      score
    },
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}