import { Request, Response, NextFunction } from "express";
import { Webhook, WebhookRequiredHeaders, WebhookUnbrandedRequiredHeaders } from "svix";
import { User } from "../models/User";
import { getAuth } from '@clerk/express';
import { Relationship } from "../models/RelationshipModel";

export const handleUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || ""

    const payload = JSON.stringify(req.body)
    const wh = new Webhook(CLERK_WEBHOOK_SECRET)
    const headers = req.headers as WebhookRequiredHeaders | WebhookUnbrandedRequiredHeaders | Record<string, string>

    const event = wh.verify(payload, headers) as { data: any; type: string }

    const { id, username, image_url } = event.data

    switch (event.type) {
      case "user.created":
        const newUser = new User({
          userId: id,
          username: username || "unknown",
          imageUrl: image_url,
        });
        await newUser.save();
        break
      case "user.updated":
        await User.findOneAndUpdate(
          { userId: id },
          { username, imageUrl: image_url }
        );
        break
      case "user.deleted":
        await User.findOneAndDelete({ userId: id });
        break
      default:
        console.log(event.type);
        break
    }

    res.status(200).json({ message: "Success" })
  } catch (error) {
    next(error)
  }
}

// get "profile"
export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    const profileUserId = req.params.profileUserId;

    if (!userId) throw { message: "User not authenticated", status: 401 }
    if (!profileUserId) throw { message: "profileUserId is required", status: 400 }

    const isOwnProfile = userId === profileUserId
    let following = null;

    const user = await User.findOne({ userId: profileUserId });

    if (!user) throw { message: "User not found", status: 404 }

    if (!isOwnProfile) {

      following = await Relationship.findOne({
        followerId: userId, // current user
        followingId: profileUserId // target user
      });

    }

    res.status(200).json({ user, isOwnProfile, isFollowing: following != null });
      
  } catch (error) {
    next(error);
  }
}
