import { Request, Response, NextFunction } from "express";
import { getAuth, clerkClient } from '@clerk/express';
import { Relationship } from "../models/RelationshipModel";

export const addFollow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    const targetUserId = req.params.targetUserId;

    if (!userId) throw { message: "User not authenticated", status: 401 }
    if (!targetUserId) throw { message: "targetUserId is required", status: 400 }

    // check target user
    const { id } = await clerkClient.users.getUser(targetUserId);

    if (!id) throw { message: "target User not found", status: 404 }

    if (userId === targetUserId) throw { message: "Cannot follow yourself", status: 400 }

    const isFollowing = await Relationship.findOne({
      followerId: userId, // current user
      followingId: targetUserId // target user
    });

    if (isFollowing) throw { message: "You already follow this user", status: 400 }

    const newFollow = new Relationship({
      followerId: userId,
      followingId: targetUserId
    });

    await newFollow.save();

    res.status(201).json({ successMessage: "Followed successfully" });
    
  } catch (error) {
    next(error);
  }
}

export const unFollow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    const targetUserId = req.params.targetUserId;

    if (!userId) throw { message: "User not authenticated", status: 401 }
    if (!targetUserId) throw { message: "targetUserId is required", status: 400 }

    // check target user
    const { id } = await clerkClient.users.getUser(targetUserId);

    if (!id) throw { message: "target User not found", status: 404 }

    const isFollowing = await Relationship.findOne({
      followerId: userId, // current user
      followingId: targetUserId // target user
    });

    if (!isFollowing) throw { message: "following not found", status: 404 }

    await Relationship.findOneAndDelete({
      followerId: userId,
      followingId: targetUserId
    });

    res.status(200).json({ successMessage: "following deleted" });
    
  } catch (error) {
    next(error);
  }
}

export const getFollowers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const targetUserId = req.params.targetUserId;

    if (!targetUserId) throw { message: "targetUserId is required", status: 400 }

    // check target user
    const { id } = await clerkClient.users.getUser(targetUserId);

    if (!id) throw { message: "target User not found", status: 404 }

    const followers = await Relationship.aggregate([
      {
        $match: {
          followingId: targetUserId
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "followerId", // Relationship.followerId
          foreignField: "userId", // User.userId
          as: "user"
        }
      },
      {
        /**
         * Result: { followingId, followerId, user, userId, username, imageUrl, ... }
         * Instead of { followingId, followerId, user: [ {userId, username, imageUrl, ...} ], ... }
        */
        $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            { $arrayElemAt: ["$user", 0] },
            "$$ROOT"
          ]
        }
        }
      },
      {
        $project: {
          user: 0, // Specifies the suppression of the 'user' field
          followingId: 0,
          followerId: 0
        }
      }
    ]);

    res.status(200).json({ followers });
    
  } catch (error) {
    next(error);
  }
}

export const getFollowings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const targetUserId = req.params.targetUserId;

    if (!targetUserId) throw { message: "targetUserId is required", status: 400 }

    // check target user
    const { id } = await clerkClient.users.getUser(targetUserId);

    if (!id) throw { message: "target User not found", status: 404 }

    const followings = await Relationship.aggregate([
      {
        $match: {
          followerId: targetUserId
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "followingId", // Relationship.followingId
          foreignField: "userId", // User.userId
          as: "user"
        }
      },
      {
        /**
         * Result: { followingId, followerId, user, userId, username, imageUrl, ... }
         * Instead of { followingId, followerId, user: [ {userId, username, imageUrl, ...} ], ... }
        */
        $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            { $arrayElemAt: ["$user", 0] },
            "$$ROOT"
          ]
        }
        }
      },
      {
        $project: {
          user: 0, // Specifies the suppression of the 'user' field
          followingId: 0,
          followerId: 0
        }
      }
    ]);

    res.status(200).json({ followings });
    
  } catch (error) {
    next(error);
  }
}
