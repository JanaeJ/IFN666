import api from './api'; // 确保已有api.js基础配置

export const courseApi = {
  getAll: () => api.get('/courses'),
  getById: (id) => api.get(`/courses/${id}`),
  create: (data) => api.post('/courses', data),
  update: (id, data) => api.put(`/courses/${id}`, data),
  delete: (id) => api.delete(`/courses/${id}`)
};


// import api from './api'; 

// export const courseApi = {
//   // 获取所有课程（匹配GET /courses）
//   getAll: () => api.get('/courses'),
  
//   // 获取单个课程（匹配GET /courses/:id）
//   getById: (id) => api.get(`/courses/${id}`),
  
//   // 创建课程（需要认证，匹配POST /courses）
//   create: (courseData) => api.post('/courses', courseData),
  
//   // 更新课程（需要认证，匹配PUT /courses/:id）
//   update: (id, courseData) => api.put(`/courses/${id}`, courseData),
  
//   // 删除课程（需要认证，匹配DELETE /courses/:id）
//   delete: (id) => api.delete(`/courses/${id}`)
// };