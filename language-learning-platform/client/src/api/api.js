import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 从 .env 文件读取基础 URL
});

// 请求拦截器：统一添加 Authorization 头
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    console.log('当前token:', token); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
