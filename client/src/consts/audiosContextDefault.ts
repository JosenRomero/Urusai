import { AudiosContextType } from "../types/AudiosContextType";

export const audiosContextDefault: AudiosContextType = {
  audios: null,
  isLoadedAudios: false,
  comments: null,
  updateAudios: () => {},
  fetchAudios: async () => {},
  fetchComments: async () => {},
}