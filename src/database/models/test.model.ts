import mongoose, { Types, Document } from 'mongoose';

import { questionSchema } from './question.model';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export interface TestInput {
  title: string;
  color: string;
  status: Status;
  questions: Types.ObjectId[];
}

export interface TestDocument extends TestInput, Document {
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum Status {
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
    enum: Status,
    required: true,
  },
  questions: [questionSchema],
  result: [{ type: ObjectId, ref: 'Result' }],
});

export default mongoose.models.Test || mongoose.model<TestDocument>('Test', testSchema);
