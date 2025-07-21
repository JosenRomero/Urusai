import { Audio } from "./Audio";

export interface AudiosContextType {
  audios: Audio[] | null
  isLoadedAudios: boolean
  updateAudios: (audios: Audio[]) => void
  fetchAudios: (userId: string, token: string) => Promise<void>
}