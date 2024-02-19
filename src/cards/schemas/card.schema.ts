import * as mongoose from 'mongoose';

export const CardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    columnId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Column',
      required: true,
    },
  },
  { timestamps: true },
);

export interface Card extends mongoose.Document {
  title: string;
  description?: string;
  userId: mongoose.Schema.Types.ObjectId;
  columnId: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
