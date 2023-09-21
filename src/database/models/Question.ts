import mongoose from 'mongoose';

import BaseQuestion from './base/Question';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const questionSchema = new Schema({
  text: String,
  answer: [{ type: ObjectId, ref: 'Answer' }],
});

export default mongoose.models.BaseTest.discriminators?.Question ||
  BaseQuestion.discriminator('Question', questionSchema);
