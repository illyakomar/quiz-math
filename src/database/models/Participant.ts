import mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const participantSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    result: { type: ObjectId, ref: 'Result' },
  },
  { timestamps: true },
);

export default mongoose.models.Participant || mongoose.model('Participant', participantSchema);
