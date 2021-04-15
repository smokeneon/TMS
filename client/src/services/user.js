import request from '@/utils/request';
export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  let userId = localStorage.getItem('userId')
  return request(`/api/user/${userId}`);
}
export async function queryNotices() {
  return request('/api/notices');
}
