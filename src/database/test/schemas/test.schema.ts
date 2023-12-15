import mongoose, { Document } from 'mongoose';

import { QuestionInput, questionSchema } from '../../shared/schemas/question.schema';
import { ParticipantInput, participantSchema } from './participant.schema';
import { SerializableDocumentPOJO } from '@/database/types';

const { Schema } = mongoose;

export interface TestInput {
  title: string;
  color: string;
  status: 'ACTIVE' | 'FINISHED';
  questions: QuestionInput[];
}

export interface TestOutput extends TestInput, SerializableDocumentPOJO {
  participants: ParticipantInput[];
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
  },
  { timestamps: true },
);

export default mongoose.models.Test<TestDocument> ||
  mongoose.model<TestDocument>('Test', testSchema);
