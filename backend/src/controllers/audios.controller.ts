import { Request, Response, NextFunction } from "express";

class AudiosController {

  constructor() {}

  getAudios(req: Request, res: Response, next: NextFunction) {
    res.json({ message: "Audios" });
  }

  getAudio(req: Request, res: Response, next: NextFunction) {
    res.json({ message: "Audio" });
  }

  newAudio(req: Request, res: Response, next: NextFunction) {
    res.json({ message: "Audio saved" });
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