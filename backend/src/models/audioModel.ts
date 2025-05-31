import { Schema, model, Document } from "mongoose";

const AudioSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "userId is required"]
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    audioId: {
      type: String,
      required: [true, "Audio is required"]
    },
    imageUrl: {
      type: String,
      required: [true, "ImageUrl is required"]
    },
    mimeType: {
      type: String,
      required: [true, "mimeType is required"]
    }
  },
  {
    timestamps: true
  }
);

interface IAudio extends Document {
  userId: string;
  title: string;
  audioId: string;
  imageUrl: string;
  mimeType: string;
}

export const Audio = model<IAudio>("Audio", AudioSchema);