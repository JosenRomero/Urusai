import { Request, Response, NextFunction } from "express";
import { getAuth, clerkClient } from '@clerk/express';
import { analyzeAudio } from "../services/aiService";
import { pipeline } from "stream/promises";
import fs from 'fs'; // file system
import { bucket } from "../database/database";
import { Audio } from "../models/audioModel";
import { Like } from "../models/likeModel";
import mongoose from "mongoose";
import { Favorite } from "../models/favoriteModel";

class AudiosController {

  constructor() {}

  unauthorized(req: Request, res: Response) {
    res.status(401).json({ message: "Unauthorized" });
  }

  // get "api/audio/all-audios"
  async getAllAudios(req: Request, res: Response, next: NextFunction) {

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

  // get "api/audio/my-audios/userId/:userId"
  async getAudios(req: Request, res: Response, next: NextFunction) {

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

  async getAudio(req: Request, res: Response, next: NextFunction) {
    
    try {

      const audioId = req.params.audioId;

      if (!audioId) throw { message: "AudioId is required", status: 400 }
      
      const id = new mongoose.Types.ObjectId(audioId);

      const file = await Audio.findOne({ audioId });

      if (!file) throw { message: "Audio not found", status: 404 }

      // create a stream to read from the bucket
      const downloadStream = bucket.openDownloadStream(id);

      res.setHeader('Content-Type', file.mimeType);
      res.setHeader('Accept-Ranges', 'bytes');

      // pipe the stream to the response
      downloadStream.pipe(res);

    } catch (error) {
      next(error);
    }

  }

  async uploadAudio(req: Request, res: Response, next: NextFunction) {

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

  async uploadAndAnalyzeAudio(req: Request, res: Response, next: NextFunction) {

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

  updateAudio(req: Request, res: Response, next: NextFunction) {
    res.json({ message: "update audio" });
  }

  async deleteAudio(req: Request, res: Response, next: NextFunction) {

    const mongooseTransaction = await mongoose.startSession();
    mongooseTransaction.startTransaction();
    
    try {
      
      const { userId } = getAuth(req);
      const audioId = req.params.audioId;

      if (!userId) throw { message: "User not authenticated", status: 401 }
      if (!audioId) throw { message: "AudioId is required", status: 400 }

      const audio = await Audio.findOneAndDelete({
        audioId,
        userId
      }).session(mongooseTransaction);

      if (!audio) throw { message: "Audio not found or you do not have permission to delete it", status: 404 }

      const id = new mongoose.Types.ObjectId(audioId);

      await bucket.delete(id);

      await mongooseTransaction.commitTransaction();

      res.status(200).json({ successMessage: "Audio deleted" });
      
    } catch (error) {
      await mongooseTransaction.abortTransaction();
      next(error);
    } finally {
      mongooseTransaction.endSession();
    }

  }

  async addLike(req: Request, res: Response, next: NextFunction) {
    
    try {
      const { userId } = getAuth(req);
      const audioId = req.params.audioId;

      if (!userId) throw { message: "User not authenticated", status: 401 }
      if (!audioId) throw { message: "AudioId is required", status: 400 }

      const file = await Audio.findOne({ audioId });

      if (!file) throw { message: "Audio not found", status: 404 }

      const like = await Like.findOne({ userId, audioId });

      if (like) throw { message: "You've already liked this audio", status: 400 }

      const newLike = new Like({
        userId,
        audioId
      });

      await newLike.save();

      res.status(201).json({ successMessage: "Like saved" });

    } catch (error) {
      next(error);
    }
  }

  async removeLike(req: Request, res: Response, next: NextFunction) {
    
    try {
      const { userId } = getAuth(req);
      const audioId = req.params.audioId;

      if (!userId) throw { message: "User not authenticated", status: 401 }
      if (!audioId) throw { message: "AudioId is required", status: 400 }

      const file = await Audio.findOne({ audioId });

      if (!file) throw { message: "Audio not found", status: 404 }

      const like = await Like.findOne({ userId, audioId });

      if (!like) throw { message: "Like not found", status: 400 }

      await Like.findOneAndDelete({ userId, audioId });

      res.status(200).json({ successMessage: "Like deleted" });

    } catch (error) {
      next(error);
    }
  }

  async addFavorite(req: Request, res: Response, next: NextFunction) {

    try {
      const { userId } = getAuth(req);
      const audioId = req.params.audioId;

      if (!userId) throw { message: "User not authenticated", status: 401 }
      if (!audioId) throw { message: "AudioId is required", status: 400 }

      const file = await Audio.findOne({ audioId });

      if (!file) throw { message: "Audio not found", status: 404 }

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

  async removeFavorite(req: Request, res: Response, next: NextFunction) {

    try {
      const { userId } = getAuth(req);
      const audioId = req.params.audioId;

      if (!userId) throw { message: "User not authenticated", status: 401 }
      if (!audioId) throw { message: "AudioId is required", status: 400 }

      const file = await Audio.findOne({ audioId });

      if (!file) throw { message: "Audio not found", status: 404 }

      const favorite = await Favorite.findOne({ userId, audioId });

      if (!favorite) throw { message: "Favorite not found", status: 400 }

      await Favorite.findOneAndDelete({ userId, audioId });

      res.status(200).json({ successMessage: "Favorite deleted" });
      
    } catch (error) {
      next(error);
    }

  }

}

const audiosController = new AudiosController();

export default audiosController;