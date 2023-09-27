import mongoose, { Document } from 'mongoose';

import { answerSchema } from './answer.model';

const { Schema } = mongoose;

export interface QuestionInput {
  firstName: string;
  lastName: string;
}

export interface QuestionDocument extends QuestionInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

export const questionSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    answers: [answerSchema],
  },
  { timestamps: true },
);

export default mongoose.models.Question ||
  mongoose.model<QuestionDocument>('Question', questionSchema);
