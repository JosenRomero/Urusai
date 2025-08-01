import { NavLink } from "react-router-dom"
import UserIcon from "../icons/UserIcon"
import { Audio } from "../types/Audio"
import { getAudioDate } from "../utils"
import BookMarkFilledIcon from "../icons/BookMarkFilledIcon"
import BookMarkIcon from "../icons/BookMarkIcon"
import HeartFilledIcon from "../icons/HeartFilledIcon"
import HeartIcon from "../icons/HeartIcon"
import Trash from "../icons/Trash"
import PlayIcon from "../icons/PlayIcon"
import { AudioType } from "../types/enums"

interface Props {
  audio: Audio
  showBtnRemoveAudio: boolean
  index: number
  audioType?: AudioType
  btnLike(audioId: string, currentValue: boolean, index: number): void
  btnFavorite(audioId: string, currentValue: boolean, index: number): void
  btnRemoveAudio(audioId: string): void
  btnPlayAudio(audioId: string, title: string): void
}

const ShowOneAudio = ({ audio, showBtnRemoveAudio, index, audioType = AudioType.AUDIO, btnLike, btnFavorite, btnRemoveAudio, btnPlayAudio }: Props) => {

  return (
    <div
      className="border-b border-gray-200 w-full flex flex-col sm:flex-row sm:items-center gap-5 py-4"
      key={audio._id}
    >

      <div className="flex flex-row flex-1 items-center gap-5">
        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
          { audio.imageUrl ? (
            <img src={audio.imageUrl} />
          ) : (
            <UserIcon />
          )}
        </div>
        <div className="flex flex-col flex-1">
          { audioType === AudioType.COMMENT_AUDIO ? (
            <p className="text-xl font-medium text-gray-900">Comment #{index + 1}</p>
          ) : (
            <NavLink to={`/audio/${audio.audioId}`} className={"text-xl font-medium !text-gray-900"}>{audio.title}</NavLink>
          ) }
          <p className="text-sm text-gray-500">{getAudioDate(audio.createdAt)}</p>
        </div>
      </div>

      <div className="flex flex-row items-center gap-x-10">

        <button
          type="button"
          className={`w-5 h-5 hover:cursor-pointer ${audio.userFavorite ? "text-yellow-400" : "hover:text-yellow-400"} `}
          onClick={ () => btnFavorite(audio.audioId, audio.userFavorite, index) }
        >
          { audio.userFavorite ? <BookMarkFilledIcon /> : <BookMarkIcon /> }
        </button>

        <button
          type="button"
          className={`w-5 h-5 hover:cursor-pointer ${audio.userLike ? "text-red-600" : "hover:text-red-600"} `}
          onClick={ () => btnLike(audio.audioId, audio.userLike, index) }
        >
          { audio.userLike ? <HeartFilledIcon /> : <HeartIcon /> }
        </button>

        { showBtnRemoveAudio && (
          <button
            type="button"
            className="text-slate-800 hover:text-red-700 hover:cursor-pointer w-5 h-5"
            onClick={ () => btnRemoveAudio(audio.audioId) }
          >
            <Trash />
          </button>
        )}

        <button
          className="w-5 h-5 inline-block hover:cursor-pointer hover:scale-125 transition"
          onClick={ () => btnPlayAudio(audio.audioId, audio.title ?? `Comment #${index+1}`) }
        >
          <PlayIcon />
        </button>

      </div>

    </div>
  )
}

export default ShowOneAudio