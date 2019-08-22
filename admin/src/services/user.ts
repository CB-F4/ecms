import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

export async function adminLogin(params: { name: string; password: string }) {
  return request('/api/admin/login', {
    method: 'POST',
    data: params,
  });
}
