import { Router } from 'express';
import userRoutes from './userRoutes.js';
import courseRoutes from './courseRoutes.js';
import vocabularyRoutes from './vocabularyRoutes.js';

const router = Router();

router.use('/users', userRoutes); 
router.use('/courses', courseRoutes);
router.use('/vocabularies', vocabularyRoutes);

export default router; 