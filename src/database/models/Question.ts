import mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const questionSchema = new Schema({
  text: String,
  answer: [{ type: ObjectId, ref: 'Answer' }],
});

export default mongoose.models.Question || mongoose.model('Question', questionSchema);
