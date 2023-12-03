import mongoose, { Document } from 'mongoose';

const { Schema } = mongoose;

export interface ParticipantInput {
  firstName: string;
  lastName: string;
}

export interface ParticipantDocument extends ParticipantInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

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
