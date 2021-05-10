import axios from 'axios'

const token = localStorage.getItem('token')
// 获取笔记列表
export const getEssayList = (essayId) => {
  return axios({
    method: 'get',
    url: `/api/essay/findByUser/${essayId}`,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}

// 删除笔记
export const deleteEssay = (essayId) => {
  return axios({
    method: 'delete',
    url: `/api/essay/${essayId}`,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}
