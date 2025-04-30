import { Router } from 'express';
import {
  register,
  login,
  getUsers,
  getUserById, // 导入新的控制器方法
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);

// 需要身份验证的 API
router.use(authenticate);
router.get('/', authorize(['admin']), getUsers);
router.get('/:id', authorize(['admin']), getUserById); // 添加获取用户ID的路由
router.put('/:id', updateUser);
router.delete('/:id', authorize(['admin']), deleteUser);

export default router;