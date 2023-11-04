import mongoose, { Document } from 'mongoose';

import { QuestionInput, questionSchema } from './question.model';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export interface TestInput {
  title: string;
  color: string;
  status: TestStatus;
  questions: QuestionInput[];
}

export interface TestDocument extends TestInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

export enum TestStatus {
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

const testSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: TestStatus,
    required: true,
  },
  questions: [questionSchema],
  result: [{ type: ObjectId, ref: 'Result' }],
});

export default mongoose.models.Test<TestDocument> ||
  mongoose.model<TestDocument>('Test', testSchema);
