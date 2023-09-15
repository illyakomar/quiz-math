import mongoose from 'mongoose';

const { Schema } = mongoose;

const answerTemplateSchema = new Schema();

export default mongoose.models.AnswerTemplate ||
  mongoose.model('AnswerTemplate', answerTemplateSchema);
