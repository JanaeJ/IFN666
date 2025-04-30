import api from './api';

// 获取 Authorization 头
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
  return {}; // 如果没有 token，返回一个空的 header
};

export const userApi = {
  // 用户注册
  register: (userData) => api.post('/users/register', userData),

  // 用户登录
  login: (userData) => api.post('/users/login', userData),

  // 根据 ID 获取用户信息
  getUserById: (id) => api.get(`/users/${id}`, { headers: getAuthHeaders() }),

  // 获取所有用户（需要管理员权限）
  getAll: () => api.get('/users', { headers: getAuthHeaders() }),

  // 更新用户信息（不包括密码）
  update: (id, data) => api.put(`/users/${id}`, data, { headers: getAuthHeaders() }),

  // 删除用户（需要管理员权限）
  delete: (id) => api.delete(`/users/${id}`, { headers: getAuthHeaders() }),
};
