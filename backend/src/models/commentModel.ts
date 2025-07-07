import { Schema, model, Document } from "mongoose";

const CommentSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "userId is required"]
    },
    audioId: { // target Audio
      type: String,
      ref: "Audio",
      required: [true, "Audio is required"]
    },
    commentAudioId: { // comment Audio
      type: String,
      required: [true, "Message is required"]
    },
    imageUrl: {
      type: String,
      required: [true, "ImageUrl is required"]
    },
    mimeType: { // to commentAudio
      type: String,
      required: [true, "mimeType is required"]
    }
  },
  {
    timestamps: true
  }
);

interface IComment extends Document {
  userId: string;
  audioId: string;
  commentAudioId: string;
  imageUrl: string;
  mimeType: string;
}

export const Comment = model<IComment>("Comment", CommentSchema);