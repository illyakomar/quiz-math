import mongoose from 'mongoose';

const { Schema } = mongoose;

const baseQuestionSchema = new Schema(
  {
    text: String,
  },
  { timestamps: true },
);

export default mongoose.models.BaseQuestion || mongoose.model('Question', baseQuestionSchema);
