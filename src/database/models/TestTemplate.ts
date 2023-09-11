import mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const testTemplateSchema = new Schema(
  {
    title: String,
    questions: [{ type: ObjectId, ref: 'Question' }],
  },
  { timestamps: true },
);

export default mongoose.models.TestTemplate || mongoose.model('TestTemplate', testTemplateSchema);
