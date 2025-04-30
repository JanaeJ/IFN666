import mongoose from 'mongoose';

const languageCourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  language: { 
    type: String, 
    required: true,
    enum: ['English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese']
  },
  level: { 
    type: String, 
    enum: ['beginner', 'intermediate', 'advanced'], 
    required: true 
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const LanguageCourse = mongoose.model('LanguageCourse', languageCourseSchema);
export default LanguageCourse;