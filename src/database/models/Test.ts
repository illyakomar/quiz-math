import mongoose from 'mongoose';

import BaseTest from './base/Test';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export enum Status {
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

const testSchema = new Schema({
  status: {
    type: String,
    enum: Status,
  },
  questions: [{ type: ObjectId, ref: 'Question' }],
  result: [{ type: ObjectId, ref: 'Result' }],
});

export default mongoose.models.BaseTest.discriminators?.Test ||
  BaseTest.discriminator('Test', testSchema);
