import mongoose from 'mongoose';

import BaseAnswer from './base/Answer';

const { Schema } = mongoose;

const answerSchema = new Schema();

export default mongoose.models.BaseTest.discriminators?.Answer ||
  BaseAnswer.discriminator('Answer', answerSchema);
