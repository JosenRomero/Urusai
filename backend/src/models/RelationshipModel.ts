import { Schema, model, Document } from "mongoose";

const RelationshipSchema = new Schema(
  {
    followerId: {
      type: String,
      ref: "User",
      required: [true, "followerId is required"]
    },
    followingId: {
      type: String,
      ref: "User",
      required: [true, "followingId is required"]
    }
  },
  {
    timestamps: true
  }
);

interface IRelationship extends Document {
  followerId: string;
  followingId: string;
}

export const Relationship = model<IRelationship>("Relationship", RelationshipSchema);