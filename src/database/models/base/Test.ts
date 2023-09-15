import mongoose from 'mongoose';

const { Schema } = mongoose;

const baseTestSchema = new Schema(
  {
    title: String,
  },
  {
    collection: 'tests',
    timestamps: true,
  },
);

export default mongoose.models.BaseTest || mongoose.model('BaseTest', baseTestSchema);
