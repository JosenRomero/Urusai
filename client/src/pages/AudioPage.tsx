
import { useParams } from "react-router-dom";
import useGetInfoAudio from "../hooks/useGetInfoAudio";
import ShowOneAudio from "../components/ShowOneAudio";
import usePlayer from "../hooks/usePlayer";
import CommentBox from "../components/CommentBox";
import CommentList from "../components/CommentList";

const AudioPage = () => {
  const params = useParams();
  const { playAudio, removeAudio, like, dislike, favorite, removeFav } = usePlayer();

  const { audio, isLoaded, updateAudio } = useGetInfoAudio({ audioId: params.audioId ?? "" });

  const btnLike = (audioId: string, currentValue: boolean) => {
    if (!audio) return 

    const currentAudio = {...audio}

    if (!currentValue) like(audioId);
    else dislike(audioId);

    currentAudio.userLike = !currentValue;
    updateAudio(currentAudio);
  }

  const btnFavorite = (audioId: string, currentValue: boolean) => {
    if (!audio) return 

    const currentAudio = {...audio}

    if (!currentValue) favorite(audioId);
    else removeFav(audioId);

    currentAudio.userFavorite = !currentValue;
    updateAudio(currentAudio);
  }

  if (!isLoaded) return <div className="loader mx-auto"></div>

  if (!audio) return <div className="text-center">Unexpected error!</div>

  return (
    <div className="sm:w-96 md:w-2xl mx-auto flex flex-col gap-y-7 p-4">
      <ShowOneAudio
        audio={audio}
        showBtnRemoveAudio={audio.ownAudio ?? false}
        index={0}
        btnLike={btnLike}
        btnFavorite={btnFavorite}
        btnRemoveAudio={removeAudio}
        btnPlayAudio={playAudio}
      />
      <CommentBox
        audioId={audio.audioId}
      />
      <CommentList audioId={audio.audioId} />
    </div>
  )
}

export default AudioPage