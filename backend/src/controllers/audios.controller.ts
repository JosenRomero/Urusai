import { Request, Response, NextFunction } from "express";
import { pipeline } from "stream/promises";
import fs from 'fs'; // file system
import { bucket } from "../database/database";
import { Audio } from "../models/audioModel";

class AudiosController {

  constructor() {}

  getAudios(req: Request, res: Response, next: NextFunction) {
    res.json({ message: "Audios" });
  }

  getAudio(req: Request, res: Response, next: NextFunction) {
    res.json({ message: "Audio" });
  }

  async newAudio(req: Request, res: Response, next: NextFunction) {

    try {

      const { userId, title } = req.body;
      const audioPath = req.file?.path;

      if (!audioPath) throw "audio is required";
      if (!userId || !title) throw "userId and title is required";

      const audioStream = fs.createReadStream(audioPath);

      const uploadStream = bucket.openUploadStream(title);

      await pipeline(audioStream, uploadStream);

      const newAudio = new Audio({
        userId,
        title,
        audioId: uploadStream.id
      });

      await newAudio.save();

      fs.unlinkSync(audioPath);

      res.status(201).json({ message: "Audio saved" });

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