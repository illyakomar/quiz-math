import mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

enum Status {
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

const testSchema = new Schema(
  {
    status: {
      type: String,
      enum: Status,
    },
    testTemplate: { type: ObjectId, ref: 'TestTemplate' },
  },
  { timestamps: true },
);

export default mongoose.models.Test || mongoose.model('Test', testSchema);
