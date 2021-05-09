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