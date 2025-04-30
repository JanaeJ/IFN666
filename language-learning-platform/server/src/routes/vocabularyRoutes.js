import { Router } from 'express';
import {
  createVocabulary,
  getVocabularies,
  getVocabularyById,
  updateVocabulary,
  deleteVocabulary
} from '../controllers/vocabularyController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getVocabularies);
router.get('/:id', getVocabularyById);

router.use(authenticate);
router.post('/', createVocabulary);
router.put('/:id', updateVocabulary);
router.delete('/:id', deleteVocabulary);

export default router; 