import axios from 'axios'

const token = localStorage.getItem('token')
// 获取笔记列表
export const getMe = (userId) => {
  return axios({
    method: 'get',
    url: `/api/user/${userId}`,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}