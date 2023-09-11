import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model('User', userSchema);
