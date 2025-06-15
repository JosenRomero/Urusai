import { Schema, model, Document } from "mongoose";

const FavoriteSchema = new Schema(
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

interface IFavorite extends Document {
  userId: string;
  audioId: string;
}

export const Favorite = model<IFavorite>("Favorite", FavoriteSchema);