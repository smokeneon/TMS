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

// 获取文件列表
export const getFilesList = (courseId) => {
 
  return axios({
    method: 'get',
    url: `/api/files/list/${courseId}`,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}

// 模拟点击


 function DOWNLOAD(method="post",url, fileName) {
  return new Promise((resolve, reject) => {
      axios({
          method: method,
          url: url,
          responseType: 'blob'
      })
      .then(res => {
          let reader = new FileReader();
          let data = res.data;
          reader.onload = e => {
              if (e.target.result.indexOf('Result') != -1 && JSON.parse(e.target.result).Result == false) {
                  // 进行错误处理
              } else {
                  if (!fileName) {
                      let contentDisposition = res.headers['content-disposition'];
                      if (contentDisposition) {
                          fileName = window.decodeURI(res.headers['content-disposition'].split('=')[2].split("''")[1], "UTF-8");
                      }
                  }
                  executeDownload(data, fileName);
              }
          };
          // reader.readAsBinaryString(data)
          // reader.readAsDataURL(data)
          reader.readAsText(data);
          resolve(res.data);
      })
  });
}
//  模拟点击a 标签进行下载
function executeDownload(data, fileName) {
  console.log('fileName', fileName);
  if (!data) {
      return
  }
  let url = window.URL.createObjectURL(new Blob([data]));
  let link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.setAttribute('download', fileName+'.tar');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 下载文件
export const downloadFile = (courseId) => {
  DOWNLOAD('get', `/api/files/export/${courseId}`, courseId)
  // return axios({
  //   method: 'get',
  //   url: `/api/files/export/${courseId}`,
  //   headers: {
  //     'Authorization': 'Bearer ' + token
  //   }
  // })
}