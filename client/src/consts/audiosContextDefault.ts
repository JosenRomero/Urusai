import { AudiosContextType } from "../types/AudiosContextType";

export const audiosContextDefault: AudiosContextType = {
  audios: null,
  isLoadedAudios: false,
  updateAudios: () => {},
  fetchAudios: async () => {},
}