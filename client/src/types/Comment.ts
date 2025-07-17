import { Favorite } from "./Favorite"
import { Like } from "./Like"

export interface Comment {
  _id: string
  audioId: string
  imageUrl: string
  mimeType: string
  createdAt: string
  likes: Like[]
  userLike: boolean
  favorites: Favorite[]
  userFavorite: boolean
  ownAudio: boolean
}