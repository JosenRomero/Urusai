import { Router } from "express";
import { requireAuth } from '@clerk/express'
import audiosController from '../controllers/audios.controller';

import multer from '../config/multerConfig';

const router = Router();

router.get("/unauthorized", audiosController.unauthorized);

router.get("/all-audios", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), audiosController.getAllAudios);

router.get("/favorite-audios", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), audiosController.getFavoriteAudios);

router.get("/my-audios/userId/:userId", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), audiosController.getAudios);

router.get("/:audioId", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), audiosController.getAudio);

router.post("/uploadAudio", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), multer.single('audio'), audiosController.uploadAudio);

router.post("/uploadAndAnalyzeAudio", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), multer.single('audio'), audiosController.uploadAndAnalyzeAudio);

router.put("/:audioId", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), audiosController.updateAudio);

router.delete("/:audioId", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), audiosController.deleteAudio);

router.post("/:audioId/like", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), audiosController.addLike);

router.delete("/:audioId/dislike", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), audiosController.removeLike);

router.post("/:audioId/favorite", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), audiosController.addFavorite);

router.delete("/:audioId/removeFav", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), audiosController.removeFavorite);

router.post("/:audioId/comment", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), multer.single('audio'), audiosController.addComment);

router.delete("/:audioId/removeComment", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), audiosController.removeComment);

router.get("/:audioId/infoAudio", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), audiosController.getInfoAudio);

export default router;