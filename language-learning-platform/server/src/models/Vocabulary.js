import mongoose from 'mongoose';

const vocabularySchema = new mongoose.Schema({
  word: { type: String, required: true },
  translation: { type: String, required: true },
  language: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'LanguageCourse' }
});

const Vocabulary = mongoose.model('Vocabulary', vocabularySchema);

export default Vocabulary;