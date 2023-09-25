import mongoose, { Schema, Document, Types } from 'mongoose';

const { ObjectId } = Schema.Types;

export interface UserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  tests: Types.ObjectId[];
}

export interface UserDocument extends UserInput, Document {
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    tests: [{ type: ObjectId, ref: 'Test' }],
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);
