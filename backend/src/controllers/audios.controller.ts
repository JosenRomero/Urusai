import { Request, Response, NextFunction } from "express";
import { getAuth } from '@clerk/express';
import { analyzeAudio } from "../services/aiService";
import { pipeline } from "stream/promises";
import fs from 'fs'; // file system
import { bucket } from "../database/database";
import { Audio } from "../models/audioModel";

class AudiosController {

  constructor() {}

  unauthorized(req: Request, res: Response) {
    res.status(401).json({ message: "Unauthorized" });
  }

  // get "api/audio/my-audios/userId/:userId"
  async getAudios(req: Request, res: Response, next: NextFunction) {

    try {

      const audios = await Audio.aggregate([
        {
          $match: {
            userId: req.params.userId
          }
        }
      ]);

      res.status(200).json({ audios });
      
    } catch (error) {
      res.status(500).json({ error });
    }

  }

  getAudio(req: Request, res: Response, next: NextFunction) {
    res.json({ message: "Audio" });
  }

  async uploadAudio(req: Request, res: Response, next: NextFunction) {

    try {

      const { userId } = getAuth(req);

      const { title } = req.body
      const audio = req.file
      
      if (!userId) throw { message: "User not authenticated", status: 401 }
      if (!title) throw { message: "Title is required", status: 400 }
      if (!audio) throw { message: "Audio is required", status: 400 }
      
      const audioStream = fs.createReadStream(audio.path);

      const uploadStream = bucket.openUploadStream(title);

      await pipeline(audioStream, uploadStream);

      const newAudio = new Audio({
        userId,
        title,
        audioId: uploadStream.id,
        mimeType: audio.mimetype
      });

      await newAudio.save();

      fs.unlinkSync(audio.path);

      res.status(201).json({ message: "Audio saved" });

    } catch (error) {

      if (req.file?.path) fs.unlinkSync(req.file.path);
      res.status(500).json({ error });
      
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

      res.status(201).json({ message: text });

    } catch (error) {

      if (req.file?.path) fs.unlinkSync(req.file.path);
      res.status(500).json({ error });
      
    }
    
  }

  updateAudio(req: Request, res: Response, next: NextFunction) {
    res.json({ message: "update audio" });
  }

  deleteAudio(req: Request, res: Response, next: NextFunction) {
    res.json({ message: "delete audio" });
  }

}

const audiosController = new AudiosController();

export default audiosController;