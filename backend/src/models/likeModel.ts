import { Schema, model, Document } from "mongoose";

const LikeSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "userId is required"]
    },
    audioId: {
      type: String,
      ref: "Audio",
      required: [true, "Audio is required"]
    }
  },
  {
    timestamps: true
  }
);

interface ILike extends Document {
  userId: string;
  audioId: string;
}

export const Like = model<ILike>("Like", LikeSchema);