import { Request, Response, NextFunction } from "express";
import { Audio } from "../models/audioModel";
import { Comment } from "../models/commentModel";
import fs from 'fs'; // file system
import { bucket } from "../database/database";
import { pipeline } from "stream/promises";
import { getAuth, clerkClient } from '@clerk/express';

export const getComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    const audioId = req.params.audioId;

    if (!userId) throw { message: "User not authenticated", status: 401 }
    if (!audioId) throw { message: "AudioId is required", status: 400 }

    const comments = await Comment.aggregate([
      {
        $match: {
          audioId: audioId
        }
      },
      {
        $sort: {
          createdAt: -1
        }
      },
      // When a user likes a comment, the "commentAudioId" will be saved as "audioId" in the Like model
      {
        $lookup: {
          from: "likes",
          localField: "commentAudioId", // Comment.commentAudioId
          foreignField: "audioId", // Like.audioId
          as: "likes"
        }
      },
      // When a user favorites a comment, the "commentAudioId" will be saved as "audioId" in the Favorite model
      {
        $lookup: {
          from: "favorites",
          localField: "commentAudioId", // Comment.commentAudioId
          foreignField: "audioId", // Favorite.audioId
          as: "favorites"
        }
      },
      {
        $addFields: {
          userLike: {
            $in: [userId, "$likes.userId"] // true if the user gave a like
          },
          userFavorite: {
            $in: [userId, "$favorites.userId"] // true if the user gave a favorite
          },
          ownAudio: {
            $eq: [userId, "$userId"] // true if the comment is owned by the user
          },
          audioId: "$commentAudioId" // Overwrites audioId with commentAudioId's value
        }
      },
      {
        $project: { 
          commentAudioId: 0 // Specifies the suppression of the 'commentAudioId' field
        }
      }
    ]);

    res.status(200).json({ comments });
      
  } catch (error) {
    next(error);
  }
}

export const addComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    const audioId = req.params.audioId;
    const commentAudio = req.file;

    if (!userId) throw { message: "User not authenticated", status: 401 }
    if (!audioId) throw { message: "AudioId is required", status: 400 }
    if (!commentAudio) throw { message: "Audio is required", status: 400 }

    // check the target audio
    const file = await Audio.findOne({ audioId });

    if (!file) throw { message: "Audio not found", status: 404 }

    // check the number of comments
    const allComments = await Comment.aggregate([
      {
        $match: { 
          userId: userId 
        }
      }
    ]);

    if (allComments.length >= 5) throw { message: "You have reached the maximum number of comment uploads allowed (limit: 5)", status: 403 }

    // upload commentAudio

    const audioStream = fs.createReadStream(commentAudio.path);

    const uploadStream = bucket.openUploadStream(commentAudio.filename);

    await pipeline(audioStream, uploadStream);

    // get imageUrl
    const { imageUrl } = await clerkClient.users.getUser(userId);

    // save comment
    const newComment = new Comment({
      userId,
      audioId,
      commentAudioId: uploadStream.id,
      imageUrl,
      mimeType: commentAudio.mimetype
    });

    await newComment.save();

    fs.unlinkSync(commentAudio.path);

    res.status(201).json({ successMessage: "Comment saved" });
      
  } catch (error) {

    if (req.file?.path) fs.unlinkSync(req.file.path);
    next(error);

  }
}

export const removeComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    const { audioId, commentAudioId } = req.params;

    if (!userId) throw { message: "User not authenticated", status: 401 }
    if (!audioId) throw { message: "AudioId is required", status: 400 }
    if (!commentAudioId) throw { message: "commentAudioId is required", status: 400 }

    // check the target audio
    const file = await Audio.findOne({ audioId });

    if (!file) throw { message: "Audio not found", status: 404 }

    const commentAudio = await Comment.findOne({ userId, commentAudioId });

    if (!commentAudio) throw { message: "comment not found", status: 400 }

    await Comment.findOneAndDelete({ userId, commentAudioId });

    res.status(200).json({ successMessage: "Comment deleted" });
      
  } catch (error) {
    next(error);
  }
}
