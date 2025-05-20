import { Router } from "express";
import { requireAuth } from '@clerk/express'
import audiosController from '../controllers/audios.controller';

import multer from '../config/multerConfig';

const router = Router();

router.get("/unauthorized", audiosController.unauthorized);

router.get("/my-audios/userId/:userId", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), audiosController.getAudios);

router.get("/:audioId", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), audiosController.getAudio);

router.post("/uploadAudio", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), multer.single('audio'), audiosController.uploadAudio);

router.post("/uploadAndAnalyzeAudio", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), multer.single('audio'), audiosController.uploadAndAnalyzeAudio);

router.put("/:audioId", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), audiosController.updateAudio);

router.delete("/:audioId", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), audiosController.deleteAudio);

export default router;