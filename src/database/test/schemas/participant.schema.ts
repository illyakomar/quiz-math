import mongoose, { Document } from 'mongoose';

import { SerializableDocumentPOJO } from '@/database/types';

const { Schema } = mongoose;

export interface ParticipantInput {
  firstName: string;
  lastName: string;
}

export interface ParticipantOutput extends ParticipantInput, SerializableDocumentPOJO {}

export interface ParticipantDocument extends Omit<ParticipantOutput, '_id'>, Document {}

export const participantSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
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

export default mongoose.models.Participant<ParticipantDocument> ||
  mongoose.model<ParticipantDocument>('Participant', participantSchema);
