import { Router } from "express";
import audiosController from '../controllers/audios.controller';

import multer from '../config/multerConfig';

const router = Router();

router.get("/all-audios/userId/:userId", audiosController.getAudios);

router.get("/:audioId", audiosController.getAudio);

router.post("/uploadAudio", multer.single('audio'), audiosController.uploadAudio);

router.post("/uploadAndAnalyzeAudio", multer.single('audio'), audiosController.uploadAndAnalyzeAudio);

router.put("/:audioId", audiosController.updateAudio);

router.delete("/:audioId", audiosController.deleteAudio);

export default router;