import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true },
);

export interface User extends mongoose.Document {
  username: string;
  passwordHash: string;
  createdAt?: Date;
  updatedAt?: Date;
}
