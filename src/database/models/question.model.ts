import mongoose, { Document } from 'mongoose';

import { AnswerInput, answerSchema } from './answer.model';

const { Schema } = mongoose;

export interface QuestionInput {
  text: string;
  answers: AnswerInput[];
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
