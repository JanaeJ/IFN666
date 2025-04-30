import { Router } from 'express';
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} from '../controllers/courseController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getCourses);
router.get('/:id', getCourseById);

router.use(authenticate);
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

export default router; 