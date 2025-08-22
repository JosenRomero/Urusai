import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { getAuth, clerkClient } from '@clerk/express';
import { bucket } from "../database/database";
import { Audio } from "../models/audioModel";
import { Comment } from "../models/commentModel";
import { Like } from "../models/likeModel";
import { Favorite } from "../models/favoriteModel";
import fs from 'fs'; // file system
import { pipeline } from "stream/promises";
import { analyzeAudio } from "../services/aiService";

export const getAudio = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const audioId = req.params.audioId;
    const audioType = req.params.audioType;

    if (!audioId) throw { message: "AudioId is required", status: 400 }
    if (!audioType) throw { message: "audioType is required", status: 400 }

    const id = new mongoose.Types.ObjectId(audioId);

    // For comments list, the getComments controller -> Overwrites audioId with commentAudioId's value
    const audio = (audioType !== "commentAudio") ? await Audio.findOne({ audioId }) : await Comment.findOne({ commentAudioId: audioId });

    if (!audio) throw { message: "Audio not found", status: 404 }

    // create a stream to read from the bucket
    const downloadStream = bucket.openDownloadStream(id);

    res.setHeader('Content-Type', audio.mimeType);
    res.setHeader('Accept-Ranges', 'bytes');

    // pipe the stream to the response
    downloadStream.pipe(res);

  } catch (error) {
    next(error);
  }
}

export const uploadAudio = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    const { title } = req.body
    const audio = req.file
    
    if (!userId) throw { message: "User not authenticated", status: 401 }
    if (!title) throw { message: "Title is required", status: 400 }
    if (!audio) throw { message: "Audio is required", status: 400 }

    // check the number of audios
    const allAudios = await Audio.aggregate([
      {
        $match: {
          userId: userId
        }
      }
    ])

    if (allAudios.length >= 5) throw { message: "You have reached the maximum number of audio uploads allowed (limit: 5)", status: 403 }
    
    const audioStream = fs.createReadStream(audio.path);

    const uploadStream = bucket.openUploadStream(title);

    await pipeline(audioStream, uploadStream);

    const { imageUrl } = await clerkClient.users.getUser(userId);
    
    const newAudio = new Audio({
      userId,
      title,
      audioId: uploadStream.id,
      imageUrl,
      mimeType: audio.mimetype
    });

    await newAudio.save();

    fs.unlinkSync(audio.path);

    res.status(201).json({ successMessage: "Audio saved" });

  } catch (error) {

    if (req.file?.path) fs.unlinkSync(req.file.path);
    next(error);
    
  }
}

export const deleteAudio = async (req: Request, res: Response, next: NextFunction) => {

  const mongooseTransaction = await mongoose.startSession();
  mongooseTransaction.startTransaction();
  
  try {
    const { userId } = getAuth(req);
    const audioId = req.params.audioId;

    if (!userId) throw { message: "User not authenticated", status: 401 }
    if (!audioId) throw { message: "AudioId is required", status: 400 }

    // audio

    const audioResult = await Audio.deleteOne({
      audioId,
      userId
    }).session(mongooseTransaction);

    if (audioResult.deletedCount == 0) throw { message: "Audio not found or you do not have permission to delete it", status: 404 }

    await Like.deleteMany({ audioId }).session(mongooseTransaction);

    await Favorite.deleteMany({ audioId }).session(mongooseTransaction);

    const id = new mongoose.Types.ObjectId(audioId);

    await bucket.delete(id);

    // comments

    // get Comments
    const comments = await Comment.aggregate([
      {
        $match: {
          audioId: audioId
        }
      },
      {
        $project: {
          commentAudioId: 1
        }
      }
    ]);

    if (comments.length > 0) {

      // delete likes from each comment
      await Promise.all(
        comments.map((comment) => {
          if (comment.commentAudioId) {
            return Like.deleteMany({ audioId: comment.commentAudioId }).session(mongooseTransaction)
          }
          return Promise.resolve();
        }) 
      );

      // delete favorites from each comment
      await Promise.all(
        comments.map((comment) => {
          if (comment.commentAudioId) {
            return Favorite.deleteMany({ audioId: comment.commentAudioId }).session(mongooseTransaction)
          }
          return Promise.resolve();
        }) 
      );

      // delete comments
      await Comment.deleteMany({ audioId }).session(mongooseTransaction)

      // delete bucket from each comment
      await Promise.all(
        comments.map((comment) => {
          if (comment.commentAudioId) {
            const id = new mongoose.Types.ObjectId(comment.commentAudioId);
            return bucket.delete(id)
          }
          return Promise.resolve();
        })
      );

    }

    await mongooseTransaction.commitTransaction();

    res.status(200).json({ successMessage: "Audio deleted" });
    
  } catch (error) {

    await mongooseTransaction.abortTransaction();
    next(error);

  } finally {
    mongooseTransaction.endSession();
  }
}

export const getInfoAudio = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    const audioId = req.params.audioId;

    if (!userId) throw { message: "User not authenticated", status: 401 }
    if (!audioId) throw { message: "AudioId is required", status: 400 }

    const audio = await Audio.aggregate([
      {
        $match: {
          audioId: audioId
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
          },
          ownAudio: {
            $eq: [userId, "$userId"] // true if the audio is owned by the user
          }
        }
      }
    ]);

    if (!audio[0]) throw { message: "Audio not found", status: 404 }

    res.status(200).json({ audio: audio[0] });
    
  } catch (error) {
    next(error);
  }
}

export const uploadAndAnalyzeAudio = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { language } = req.body
    const audio = req.file
    const apikey = req.headers['x-api-key'] as string;
    
    if (!language) throw { message: "Language is required", status: 400 }
    if (!audio) throw { message: "Audio is required", status: 400 }
    if (!apikey) throw { message: "API key is required", status: 401 }
    
    const text = await analyzeAudio(audio.path, language, audio.mimetype, apikey);

    fs.unlinkSync(audio.path);

    res.status(201).json({ text });

  } catch (error) {

    if (req.file?.path) fs.unlinkSync(req.file.path);
    next(error);
    
  }
}
