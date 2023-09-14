import mongoose from 'mongoose';

const { Schema } = mongoose;

const resultSchema = new Schema(
  {
    correctAnswersCount: Number,
  },
  { timestamps: true },
);

export default mongoose.models.Result || mongoose.model('Result', resultSchema);
