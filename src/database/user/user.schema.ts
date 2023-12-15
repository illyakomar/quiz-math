import mongoose, { Types, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

import { SerializableDocumentPOJO } from '../types';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export interface UserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  tests?: Types.ObjectId[];
}

export interface UserOutput extends UserInput, SerializableDocumentPOJO {}

export interface UserDocument extends Omit<UserOutput, '_id'>, Document {
  fullName: string;
  comparePassword: (password: string) => Promise<boolean>;
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

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt.compare(password, user.password).catch(() => false);
};

export default (mongoose.models.User as Model<UserDocument>) ||
  mongoose.model<UserInput>('User', userSchema);
