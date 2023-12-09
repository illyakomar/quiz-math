import { SerializableDocumentPOJO } from '@/database/types';
import mongoose, { Document } from 'mongoose';

const { Schema } = mongoose;

export interface AnswerInput {
  text: string;
  isCorrect: boolean;
}

export interface AnswerOutput extends AnswerInput, SerializableDocumentPOJO {}

export interface AnswerDocument extends Omit<AnswerOutput, '_id'>, Document {}

export const answerSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);
