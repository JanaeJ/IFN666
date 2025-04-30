import api from './api';

export const vocabularyApi = {
  // 获取所有单词（GET /vocabularies）
  getAll: () => api.get('/vocabularies'),
  
  // 获取单个单词（GET /vocabularies/:id）
  getById: (id) => api.get(`/vocabularies/${id}`),
  
  // 获取分组单词（GET /vocabularies?group=xxx）
  getByGroup: (group) => api.get(`/vocabularies?group=${group}`),
  
  // 创建单词（POST /vocabularies）
  create: (vocabData) => api.post('/vocabularies', vocabData),
  
  // 更新单词（PUT /vocabularies/:id）
  update: (id, vocabData) => api.put(`/vocabularies/${id}`, vocabData),
  
  // 删除单词（DELETE /vocabularies/:id）
  delete: (id) => api.delete(`/vocabularies/${id}`),
  
  // 批量导入单词（POST /vocabularies/batch）
  batchCreate: (vocabList) => api.post('/vocabularies/batch', { words: vocabList })
};