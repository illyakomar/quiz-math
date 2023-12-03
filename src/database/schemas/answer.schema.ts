import mongoose, { Document } from 'mongoose';

const { Schema } = mongoose;

export interface AnswerInput {
  text: string;
  isCorrect: boolean;
}

export interface AnswerDocument extends AnswerInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

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
