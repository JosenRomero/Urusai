import { Audio } from "../types/Audio";
import usePlayer from '../hooks/usePlayer';
import ShowOneAudio from "./ShowOneAudio";

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
                    <ShowOneAudio
                      audio={audio}
                      showBtnRemoveAudio={IsMyList}
                      index={index}
                      btnLike={btnLike}
                      btnFavorite={btnFavorite}
                      btnRemoveAudio={removeAudio}
                      btnPlayAudio={playAudio}
                    />
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