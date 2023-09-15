import mongoose from 'mongoose';

const { Schema } = mongoose;

const answerSchema = new Schema();

export default mongoose.models.Answer || mongoose.model('Answer', answerSchema);
