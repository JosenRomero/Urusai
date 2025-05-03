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
    audioPath: {
      type: String,
      required: [true, "Audio is required"]
    }
  },
  {
    timestamps: true
  }
);

interface IAudio extends Document {
  userId: string;
  title: string;
  audioPath: string;
}

export const Audio = model<IAudio>("Audio", AudioSchema);