import axios from 'axios'

const token = localStorage.getItem('token')
// 获得列表
export const saveEssay = (record) => {
  return axios({
    method: 'post',
    url: '/api/essay/add',
    data: record,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}
