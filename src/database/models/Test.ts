import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

enum Status {
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const testSchema = new Schema(
  {
    title: String,
    status: {
      type: String,
      enum: Status,
    },
    questions: [{ type: ObjectId, ref: "Question" }],
    results: [{ type: ObjectId, ref: "Result" }],
  },
  { timestamps: true }
);

export default mongoose.models.Test || mongoose.model("Test", testSchema);
