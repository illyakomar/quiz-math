import mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const questionSchema = new Schema(
  {
    text: String,
    correctAnswer: { type: ObjectId, ref: 'Answer' },
    answer: [{ type: ObjectId, ref: 'Answer' }],
  },
  { timestamps: true },
);

export default mongoose.models.Question || mongoose.model('Question', questionSchema);
