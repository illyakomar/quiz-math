import mongoose, { Document } from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export interface ParticipantInput {
  firstName: string;
  lastName: string;
}

export interface ParticipantDocument extends ParticipantInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const participantSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    result: { type: ObjectId, ref: 'Result' },
  },
  { timestamps: true },
);

export default mongoose.models.Participant ||
  mongoose.model<ParticipantDocument>('Participant', participantSchema);
