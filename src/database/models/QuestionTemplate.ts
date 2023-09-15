import mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const questionTemplateSchema = new Schema({
  text: String,
  answer: [{ type: ObjectId, ref: 'Answer' }],
});

export default mongoose.models.QuestionTemplate ||
  mongoose.model('QuestionTemplate', questionTemplateSchema);
