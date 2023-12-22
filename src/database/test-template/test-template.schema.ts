import mongoose, { Document } from 'mongoose';

import { SerializableDocumentPOJO } from '@/database/types';
import { QuestionInput, questionSchema } from '../shared/schemas/question.schema';

const { Schema } = mongoose;
const { ObjectId } = Schema;

export interface TestTemplateInput {
  title: string;
  color: string;
  questions: QuestionInput[];
  owner: string;
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
    owner: { type: ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

export default mongoose.models.TestTemplate<TestTemplateDocument> ||
  mongoose.model<TestTemplateDocument>('TestTemplate', testTemplateSchema);
