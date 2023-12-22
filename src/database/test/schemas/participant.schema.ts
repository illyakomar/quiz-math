import mongoose, { Document } from 'mongoose';

import { SerializableDocumentPOJO } from '@/database/types';

const { Schema } = mongoose;

export interface ParticipantInput {
  fullName: string;
  correctAnswersCount: number;
}

export interface ParticipantOutput extends ParticipantInput, SerializableDocumentPOJO {}

export interface ParticipantDocument extends Omit<ParticipantOutput, '_id'>, Document {}

export const participantSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    correctAnswersCount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);
