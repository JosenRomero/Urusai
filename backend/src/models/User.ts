import { Schema, model, Document } from "mongoose";

const UserSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "userId is required"]
    },
    username: {
      type: String,
      required: [true, "username is required"]
    },
    imageUrl: {
      type: String,
      required: [true, "ImageUrl is required"]
    }
  },
  {
    timestamps: true
  }
);

interface IUser extends Document {
  userId: string;
  username: string;
  imageUrl: string;
}

export const User = model<IUser>("User", UserSchema);