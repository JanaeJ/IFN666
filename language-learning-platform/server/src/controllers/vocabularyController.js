import Vocabulary from '../models/Vocabulary.js';
import LanguageCourse from '../models/LanguageCourse.js';

export const createVocabulary = async (req, res, next) => {
  try {
    const { word, translation, difficulty, course } = req.body;

    if (!word || !translation || !course) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const courseDoc = await LanguageCourse.findById(course);
    if (!courseDoc) {
      return res.status(400).json({ error: 'Invalid course ID' });
    }

    const vocabulary = new Vocabulary({
      word,
      translation,
      difficulty,
      course,
      language: courseDoc.language, // Automatically set from course
    });

    await vocabulary.save();
    res.status(201).json(vocabulary);
  } catch (error) {
    next(error);
  }
};

export const getVocabularies = async (req, res, next) => {
  try {
    const vocabularies = await Vocabulary.find();
    res.json(vocabularies);
  } catch (error) {
    next(error);
  }
};

export const getVocabularyById = async (req, res, next) => {
  try {
    const vocabulary = await Vocabulary.findById(req.params.id);
    if (!vocabulary) return res.status(404).json({ error: 'Vocabulary not found' });
    res.json(vocabulary);
  } catch (error) {
    next(error);
  }
};

export const updateVocabulary = async (req, res, next) => {
  try {
    const vocabulary = await Vocabulary.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vocabulary) return res.status(404).json({ error: 'Vocabulary not found' });
    res.json(vocabulary);
  } catch (error) {
    next(error);
  }
};

export const deleteVocabulary = async (req, res, next) => {
  try {
    const vocabulary = await Vocabulary.findByIdAndDelete(req.params.id);
    if (!vocabulary) return res.status(404).json({ error: 'Vocabulary not found' });
    res.json({ message: 'Vocabulary deleted' });
  } catch (error) {
    next(error);
  }
};
