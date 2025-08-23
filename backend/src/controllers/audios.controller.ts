import { Request, Response, NextFunction } from "express";
import { getAuth } from '@clerk/express';
import { Audio } from "../models/audioModel";

// get "all-audios"
export const getAllAudios = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) throw { message: "User not authenticated", status: 401 }

    const allAudios = await Audio.aggregate([
      { 
        $sort: { 
          createdAt: -1 
        } 
      },
      {
        $lookup: {
          from: "likes",
          localField: "audioId", // Audio.audioId
          foreignField: "audioId", // Like.audioId
          as: "likes"
        }
      },
      {
        $lookup: {
          from: "favorites",
          localField: "audioId", // Audio.audioId
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
          }
        }
      },
      {
        $limit: 10
      }
    ]);

    res.status(200).json({ allAudios });
    
  } catch (error) {
    next(error);
  }
}

// get "my-audios/userId/:userId"
export const getAudios = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const audios = await Audio.aggregate([
      {
        $match: {
          userId: req.params.userId
        }
      },
      {
        $lookup: {
          from: "likes",
          localField: "audioId", // Audio.audioId
          foreignField: "audioId", // Like.audioId
          as: "likes"
        }
      },
      {
        $lookup: {
          from: "favorites",
          localField: "audioId", // Audio.audioId
          foreignField: "audioId", // Favorite.audioId
          as: "favorites"
        }
      },
      {
        $addFields: {
          userLike: {
            $in: [req.params.userId, "$likes.userId"] // true if the user gave a like
          },
          userFavorite: {
            $in: [req.params.userId, "$favorites.userId"] // true if the user gave a favorite
          }
        }
      }
    ]);

    res.status(200).json({ audios });
    
  } catch (error) {
    next(error);
  }
}
