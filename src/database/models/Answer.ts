import mongoose from 'mongoose';

const { Schema } = mongoose;

const answerSchema = new Schema(
  {
    text: String,
  },
  { timestamps: true },
);

export default mongoose.models.Answer || mongoose.model('Answer', answerSchema);
