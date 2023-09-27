import mongoose, { Types, Document } from 'mongoose';

const { Schema } = mongoose;
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
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    tests: [{ type: ObjectId, ref: 'Test' }],
  },
  { timestamps: true },
);

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

export default mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);
