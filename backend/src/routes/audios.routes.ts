import { Router } from "express";
import { requireAuth } from '@clerk/express'
import * as audiosController from '../controllers/audios.controller';
import * as audioController from '../controllers/audio.controller';
import * as userController from '../controllers/user.controller';
import * as commentController from '../controllers/comments.controller';
import * as favoritesController from '../controllers/favorites.controller';
import * as followController from '../controllers/follow.controller';
import * as likeController from '../controllers/like.controller';

import multer from '../config/multerConfig';

const router = Router();

router.post("/clerk-webhook", userController.handleUser);

router.get("/profile/:profileUserId", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), userController.getProfile);

router.get("/all-audios", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), audiosController.getAllAudios);

router.get("/favorite-audios", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), favoritesController.getFavoriteAudios);

router.get("/my-audios/userId/:userId", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), audiosController.getAudios);

router.post("/uploadAudio", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), multer.single('audio'), audioController.uploadAudio);

router.post("/uploadAndAnalyzeAudio", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), multer.single('audio'), audioController.uploadAndAnalyzeAudio);

router.post("/follow/:targetUserId", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), followController.addFollow);

router.delete("/unFollow/:targetUserId", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), followController.unFollow);

router.get("/followers/:targetUserId", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), followController.getFollowers);

router.get("/followings/:targetUserId", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), followController.getFollowings);

router.delete("/:audioId", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), audioController.deleteAudio);

router.post("/:audioId/like/:audioType", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), likeController.addLike);

router.delete("/:audioId/dislike/:audioType", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), likeController.removeLike);

router.post("/:audioId/favorite/:audioType", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), favoritesController.addFavorite);

router.delete("/:audioId/removeFav/:audioType", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), favoritesController.removeFavorite);

router.get("/:audioId/comments", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), commentController.getComments);

router.post("/:audioId/comment", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), multer.single('audio'), commentController.addComment);

router.delete("/:audioId/removeComment", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), commentController.removeComment);

router.get("/:audioId/infoAudio", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), audioController.getInfoAudio);

router.get("/:audioId/:audioType", requireAuth({ signInUrl: process.env.CLERK_SIGN_IN_URL }), audioController.getAudio);

export default router;