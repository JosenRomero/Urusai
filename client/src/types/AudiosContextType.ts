import { Audio } from "./Audio";

export interface AudiosContextType {
  audios: Audio[] | null
  isLoadedAudios: boolean
  comments: Audio | null
  isLoadedComments: boolean
  updateAudios: (audios: Audio[]) => void
  fetchAudios: (userId: string, token: string) => Promise<void>
  fetchComments: (audioId: string, token: string) => Promise<void>
}