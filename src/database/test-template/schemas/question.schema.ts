import { Schema, Document } from 'mongoose';

import { SerializableDocumentPOJO } from '@/database/types';
import { AnswerInput, answerSchema } from '../../test/schemas/answer.schema';

export interface QuestionInput {
  text: string;
  answers: AnswerInput[];
}

export interface QuestionOutput extends QuestionInput, SerializableDocumentPOJO {}

export interface QuestionDocument extends Omit<QuestionOutput, '_id'>, Document {}

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
