import mongoose from 'mongoose';

import BaseAnswer from './base/Answer';

const { Schema } = mongoose;

const answerTemplateSchema = new Schema();

export default mongoose.models.BaseTest.discriminators?.AnswerTemplate ||
  BaseAnswer.discriminator('AnswerTemplate', answerTemplateSchema);
