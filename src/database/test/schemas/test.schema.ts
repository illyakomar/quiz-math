import mongoose, { Document } from 'mongoose';

import { QuestionInput, questionSchema } from '../../shared/schemas/question.schema';
import { ParticipantOutput, participantSchema } from './participant.schema';
import { SerializableDocumentPOJO } from '@/database/types';

const { Schema } = mongoose;
const { ObjectId } = Schema;

export interface TestInput {
  title: string;
  color: string;
  status: 'ACTIVE' | 'FINISHED';
  questions: QuestionInput[];
  owner?: string;
}

export interface TestOutput extends TestInput, SerializableDocumentPOJO {
  participants: ParticipantOutput[];
}

export interface TestDocument extends Omit<TestOutput, '_id'>, Document {}

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
    owner: { type: ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

export default mongoose.models.Test<TestDocument> ||
  mongoose.model<TestDocument>('Test', testSchema);
