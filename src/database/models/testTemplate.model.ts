import mongoose, { Types, Document } from 'mongoose';

import { questionSchema } from './question.model';

const { Schema } = mongoose;

export interface TestTemplateInput {
  title: string;
  color: string;
  questions: Types.ObjectId[];
}

export interface TestTemplateDocument extends TestTemplateInput, Document {
  fullName: string;
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

export default mongoose.models.TestTemplate ||
  mongoose.model<TestTemplateDocument>('TestTemplate', testTemplateSchema);
