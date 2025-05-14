import { Router } from "express";
import { requireAuth } from '@clerk/express'
import audiosController from '../controllers/audios.controller';

import multer from '../config/multerConfig';

const router = Router();

router.get("/unauthorized", audiosController.unauthorized);

router.get("/all-audios/userId/:userId", audiosController.getAudios);

router.get("/:audioId", audiosController.getAudio);

router.post("/uploadAudio", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), multer.single('audio'), audiosController.uploadAudio);

router.post("/uploadAndAnalyzeAudio", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), multer.single('audio'), audiosController.uploadAndAnalyzeAudio);

router.put("/:audioId", audiosController.updateAudio);

router.delete("/:audioId", audiosController.deleteAudio);

export default router;