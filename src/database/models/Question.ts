import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const questionSchema = new Schema(
  {
    text: String,
    answers: [{ type: ObjectId, ref: "Answer" }],
  },
  { timestamps: true }
);

export default mongoose.models.Question ||
  mongoose.model("Question", questionSchema);
