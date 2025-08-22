import { Request, Response, NextFunction } from "express";
import { getAuth } from '@clerk/express';
import { Audio } from "../models/audioModel";
import { Favorite } from "../models/favoriteModel";
import { Comment } from "../models/commentModel";

// get "favorite-Audios"
export const getFavoriteAudios = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) throw { message: "User not authenticated", status: 401 }

    const favorites = await Favorite.aggregate([
      {
        $match: {
          userId: userId
        }
      },
      {
        $sort: {
          createdAt: -1
        }
      },
      {
        $lookup: {
          from: "likes",
          localField: "audioId", // Favorite.audioId
          foreignField: "audioId", // Like.audioId
          as: "likes"
        }
      },
      {
        $lookup: {
          from: "comments",
          localField: "audioId", // Favorite.audioId
          foreignField: "commentAudioId", // Comment.commentAudioId
          as: "commentAudio"
        }
      },
      {
        $addFields: {
          userLike: {
            $in: [userId, "$likes.userId"] // true if the user gave a like
          },
          userFavorite: true,
          isCommentAudio: { $gt: [{ $size: "$commentAudio"}, 0] }
        }
      },
      {
        $match: {
          isCommentAudio: false
        }
      },
      {
        $lookup: {
          from: "audios",
          localField: "audioId", // Favorite.audioId
          foreignField: "audioId", // Audio.audioId
          as: "audio"
        }
      },
      {
        /** 
          * Result: { userId, audioId, title, imageUrl, likes, userLike, userFavorite, ... }
          * Instead of { userId, audioId, audio: [ { title, imageUrl, ... } ], likes, userLike, userFavorite, ... }
        */
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              { $arrayElemAt: ["$audio", 0] },
              "$$ROOT",
            ]
          }
        }
      },
      {
        $project: { 
          audio: 0, // Specifies the suppression of the 'audio' field
          commentAudio: 0

        }
      }
    ]);

    res.status(200).json({ favorites });
      
  } catch (error) {
    next(error);
  }
}

export const addFavorite = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    const audioId = req.params.audioId;
    const audioType = req.params.audioType;

    if (!userId) throw { message: "User not authenticated", status: 401 }
    if (!audioId) throw { message: "AudioId is required", status: 400 }
    if (!audioType) throw { message: "audioType is required", status: 400 }

    // For comments list, the getComments controller -> Overwrites audioId with commentAudioId's value
    const audio = (audioType !== "commentAudio") ? await Audio.findOne({ audioId }) : await Comment.findOne({ commentAudioId: audioId });

    if (!audio) throw { message: "Audio not found", status: 404 }

    const favorite = await Favorite.findOne({ userId, audioId });

    if (favorite) throw { message: "You've already favorited this audio", status: 400 }

    const newFavorite = new Favorite({
      userId,
      audioId
    });

    await newFavorite.save();

    res.status(201).json({ successMessage: "Favorite saved" });
    
  } catch (error) {
    next(error);
  }
}

export const removeFavorite = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    const audioId = req.params.audioId;
    const audioType = req.params.audioType;

    if (!userId) throw { message: "User not authenticated", status: 401 }
    if (!audioId) throw { message: "AudioId is required", status: 400 }
    if (!audioType) throw { message: "audioType is required", status: 400 }

    // For comments list, the getComments controller -> Overwrites audioId with commentAudioId's value
    const audio = (audioType !== "commentAudio") ? await Audio.findOne({ audioId }) : await Comment.findOne({ commentAudioId: audioId });

    if (!audio) throw { message: "Audio not found", status: 404 }

    const favorite = await Favorite.findOne({ userId, audioId });

    if (!favorite) throw { message: "Favorite not found", status: 400 }

    await Favorite.findOneAndDelete({ userId, audioId });

    res.status(200).json({ successMessage: "Favorite deleted" });
    
  } catch (error) {
    next(error);
  }
}
