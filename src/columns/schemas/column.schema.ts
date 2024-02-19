import * as mongoose from 'mongoose';

export const ColumnSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export interface Column extends mongoose.Document {
  name: string;
  userId: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
