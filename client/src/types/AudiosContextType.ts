import { Audio } from "./Audio";

export interface AudiosContextType {
  audios: Audio[] | null
  isLoadedAudios: boolean
  comments: Audio | null
  updateAudios: (audios: Audio[]) => void
  fetchAudios: (userId: string, token: string) => Promise<void>
  fetchComments: () => Promise<void>
}