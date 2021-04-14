import request from '@/utils/request';
export async function AccountLogin(params) {
  return request('/api/user/login', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
