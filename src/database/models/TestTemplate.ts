import mongoose from 'mongoose';

import BaseTest from './base/Test';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const testTemplateSchema = new Schema({
  questionTemplates: [{ type: ObjectId, ref: 'QuestionTemplate' }],
});

export default mongoose.models.BaseTest.discriminators?.TestTemplate ||
  BaseTest.discriminator('TestTemplate', testTemplateSchema);
