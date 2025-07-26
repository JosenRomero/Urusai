
import { useParams, useNavigate } from "react-router-dom";
import useGetInfoAudio from "../hooks/useGetInfoAudio";
import ShowOneAudio from "../components/ShowOneAudio";
import usePlayer from "../hooks/usePlayer";
import CommentBox from "../components/CommentBox";
import CommentList from "../components/CommentList";
import useModal from "../hooks/useModal";
import { useState } from "react";
import ConfirmationModal from "../components/ConfirmationModal";

const AudioPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { playAudio, removeAudio, like, dislike, favorite, removeFav } = usePlayer({});
  const [currentAudioId, setCurrentAudioId] = useState<string>("");
  const { isOpenModal, openModal, closeModal } = useModal();

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

  const onConfirm = () => {
    if (currentAudioId != "") removeAudio(currentAudioId);
    closeModal();
    navigate("/home");
  }

  const handleRemoveAudio = (audioId: string) => {
    setCurrentAudioId(audioId);
    openModal();
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
        btnRemoveAudio={handleRemoveAudio}
        btnPlayAudio={playAudio}
      />
      <CommentBox
        audioId={audio.audioId}
      />
      <CommentList audioId={audio.audioId} />
      <ConfirmationModal
        isOpenModal={isOpenModal}
        closeModal={closeModal}
        onConfirm={onConfirm}
      />
    </div>
  )
}

export default AudioPage