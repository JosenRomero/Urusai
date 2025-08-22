import { Request, Response, NextFunction } from "express";
import { getAuth } from '@clerk/express';
import { Audio } from "../models/audioModel";
import { Like } from "../models/likeModel";
import { Comment } from "../models/commentModel";

export const addLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    const audioId = req.params.audioId;
    const audioType = req.params.audioType;

    if (!userId) throw { message: "User not authenticated", status: 401 }
    if (!audioId) throw { message: "AudioId is required", status: 400 }
    if (!audioType) throw { message: "audioType is required", status: 400 }

    // For comments list, the getComments controller -> Overwrites audioId with commentAudioId's value
    const audio = (audioType !== "commentAudio") ? await Audio.findOne({ audioId }) : await Comment.findOne({ commentAudioId: audioId });

    if (!audio) throw { message: "Audio not found", status: 404 }

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

export const removeLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);
    const audioId = req.params.audioId;
    const audioType = req.params.audioType;

    if (!userId) throw { message: "User not authenticated", status: 401 }
    if (!audioId) throw { message: "AudioId is required", status: 400 }
    if (!audioType) throw { message: "audioType is required", status: 400 }

    // For comments list, the getComments controller -> Overwrites audioId with commentAudioId's value
    const audio = (audioType !== "commentAudio") ? await Audio.findOne({ audioId }) : await Comment.findOne({ commentAudioId: audioId });

    if (!audio) throw { message: "Audio not found", status: 404 }

    const like = await Like.findOne({ userId, audioId });

    if (!like) throw { message: "Like not found", status: 400 }

    await Like.findOneAndDelete({ userId, audioId });

    res.status(200).json({ successMessage: "Like deleted" });

  } catch (error) {
    next(error);
  }
}
