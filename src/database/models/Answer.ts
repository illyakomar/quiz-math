import mongoose from "mongoose";

const { Schema } = mongoose;

const answerSchema = new Schema(
  {
    text: String,
    isCorrect: Boolean,
  },
  { timestamps: true }
);

export default mongoose.models.Answer || mongoose.model("Answer", answerSchema);
