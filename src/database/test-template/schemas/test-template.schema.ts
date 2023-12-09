import mongoose, { Document } from 'mongoose';

import { SerializableDocumentPOJO } from '@/database/types';
import { QuestionInput, questionSchema } from './question.schema';

const { Schema } = mongoose;

export interface TestTemplateInput {
  title: string;
  color: string;
  questions: QuestionInput[];
}

export interface TestTemplateOutput extends TestTemplateInput, SerializableDocumentPOJO {}

export interface TestTemplateDocument extends Omit<TestTemplateOutput, '_id'>, Document {}

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
  { timestamps: true },
);

export default mongoose.models.TestTemplate<TestTemplateDocument> ||
  mongoose.model<TestTemplateDocument>('TestTemplate', testTemplateSchema);
