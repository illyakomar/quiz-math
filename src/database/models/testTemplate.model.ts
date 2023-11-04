import mongoose, { Document } from 'mongoose';

import { QuestionInput, questionSchema } from './question.model';

const { Schema } = mongoose;

export interface TestTemplateInput {
  title: string;
  color: string;
  questions: QuestionInput[];
}

export interface TestTemplateDocument extends TestTemplateInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const testTemplateSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    questions: [questionSchema],
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.TestTemplate<TestTemplateDocument> ||
  mongoose.model<TestTemplateDocument>('TestTemplate', testTemplateSchema);
