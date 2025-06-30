import { NavLink } from "react-router-dom";
import { Audio } from "../types/Audio";
import PlayIcon from '../icons/PlayIcon';
import Trash from '../icons/Trash';
import UserIcon from '../icons/UserIcon';
import HeartIcon from '../icons/HeartIcon';
import BookMarkIcon from '../icons/BookMarkIcon';
import usePlayer from '../hooks/usePlayer';
import { getAudioDate } from '../utils';
import HeartFilledIcon from '../icons/HeartFilledIcon';
import BookMarkFilledIcon from '../icons/BookMarkFilledIcon';

interface Props {
  title: string
  audios: Audio[]
  isLoaded: boolean
  IsMyList: boolean
  myAllAudios(): void
  updateMyAudios(audios: Audio[]): void
}

const ShowAudios = ({ title, audios, isLoaded, IsMyList, myAllAudios, updateMyAudios }: Props) => {
  
  const { playAudio, removeAudio, like, dislike, favorite, removeFav } = usePlayer({ myAllAudios });

  const btnLike = (audioId: string, currentValue: boolean, index: number) => {

    const currentAudios = [...audios];

    if (!currentValue) like(audioId);
    else dislike(audioId);
  
    currentAudios[index].userLike = !currentValue;
    updateMyAudios(currentAudios);

  }

  const btnFavorite = (audioId: string, currentValue: boolean, index: number) => {

    const currentAudios = [...audios];

    if (!currentValue) favorite(audioId);
    else removeFav(audioId);

    currentAudios[index].userFavorite = !currentValue;
    updateMyAudios(currentAudios);

  }

  return (
    <div>
      <h2 className='text-2xl font-bold text-slate-800'>{title}</h2>

      <div className='mt-5'>
        {!isLoaded ? (
          <div className="loader mx-auto"></div>
        ) : (
          <>
            { audios && audios.length > 0 ? (
              <>
                {audios.map((audio, index) => {
                  return (
                    <div
                      className="border-b border-gray-200 w-full flex flex-col sm:flex-row sm:items-center gap-5 py-4"
                      key={audio._id}
                    >
                      
                      <div className="flex flex-row flex-1 items-center gap-5">
                        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
                          <UserIcon />
                        </div>

                        <div className="flex flex-col flex-1">
                          <NavLink to={`/audio/${audio.audioId}`} className={"text-xl font-medium !text-gray-900"}>{audio.title}</NavLink>
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

                        { IsMyList && (
                          <button 
                            type="button" 
                            className="text-slate-800 hover:text-red-700 hover:cursor-pointer w-5 h-5"
                            onClick={ () => removeAudio(audio.audioId) }
                          >
                            <Trash />
                          </button>
                        )}

                        <div
                          className="w-5 h-5 inline-block hover:cursor-pointer hover:scale-125 transition"
                          onClick={() => playAudio(audio.audioId, audio.title)}
                        >
                          <PlayIcon />
                        </div>

                      </div>

                    </div>
                  )
                })}
              </>
            ) : (
              <p className="w-full text-center mt-10">No saved audio files.</p>
            )}
          </>
        )}
      </div>

    </div>
  )
}

export default ShowAudios