import mongoose, { Document } from 'mongoose';

const { Schema } = mongoose;

export interface ResultInput {
  correctAnsersCount: number;
}

export interface ResultDocument extends ResultInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const resultSchema = new Schema(
  {
    correctAnswersCount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Result<ResultDocument> ||
  mongoose.model<ResultDocument>('Result', resultSchema);
