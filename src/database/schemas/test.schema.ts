import mongoose, { Document } from 'mongoose';

import { QuestionInput, questionSchema } from './question.schema';
import { ParticipantInput, participantSchema } from './participant.schema';

const { Schema } = mongoose;

export interface TestInput {
  title: string;
  color: string;
  status: 'ACTIVE' | 'FINISHED';
  questions: QuestionInput[];
}

export interface TestDocument extends TestInput, Document {
  participants: ParticipantInput[];
  createdAt: Date;
  updatedAt: Date;
}

const testSchema = new Schema(
  {
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
      required: true,
    },
    questions: [questionSchema],
    participants: [participantSchema],
  },
  { timestamps: true },
);

export default mongoose.models.Test<TestDocument> ||
  mongoose.model<TestDocument>('Test', testSchema);
