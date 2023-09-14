import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const participantSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    results: [{ type: ObjectId, ref: "Result" }],
  },
  { timestamps: true }
);

export default mongoose.models.Result || mongoose.model("Participant", participantSchema);
