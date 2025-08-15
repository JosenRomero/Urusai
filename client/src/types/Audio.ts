import { Favorite } from "./Favorite"
import { Like } from "./Like"

export interface Audio {
  _id: string
  title: string
  audioId: string
  userId: string
  imageUrl: string
  mimeType: string
  createdAt: string
  likes: Like[]
  userLike: boolean
  favorites: Favorite[]
  userFavorite: boolean
  ownAudio: boolean | undefined
}