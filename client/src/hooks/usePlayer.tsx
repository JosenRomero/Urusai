import { useAuth } from "@clerk/clerk-react";
import { addFavorite, addLike, deleteAudio, getAudio, removeFavorite, removeLike } from "../services/audioService";
import { useContext } from "react";
import MessageContext from "../context/MessageContext";
import AudiosContext from "../context/AudiosContext";
import { AudioType } from "../types/enums";

interface Props {
  audioType?: AudioType
}

const usePlayer = ({ audioType = AudioType.AUDIO }: Props) => {
  const { getToken, userId } = useAuth();
  const { updateMessage } = useContext(MessageContext);
  const { fetchAudios } = useContext(AudiosContext);
  
  const playAudio = async (audioId: string, title: string) => {

    try {
      const token = await getToken();
      if (!token) throw new Error("Missing required fields")
      const response = await getAudio(audioId, token, audioType);

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message)
      }

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);

      const audioPlayerContainer = document.getElementById("audioPlayerContainer") as HTMLDivElement
      const audioPlayer = document.getElementById("audioPlayer") as HTMLAudioElement
      const audioTitle = document.getElementById("audioTitle") as HTMLParagraphElement

      if (audioPlayerContainer.classList.contains("hidden")) {
        audioPlayerContainer.classList.remove("hidden");
      }

      audioPlayer.src = url
      audioTitle.innerHTML = title

    } catch (error) {
      updateMessage({
        text: (error instanceof Error) ? error.message : "Something went wrong.",
        isError: true,
      });
    }

  }

  const removeAudio = async (audioId: string) => {

    try {
      const token = await getToken();
      if (!token || !userId) throw new Error("Missing required fields")

      const { successMessage, message } = await deleteAudio(audioId, token);

      if (message) throw new Error(message)

      updateMessage({
        text: successMessage,
        isError: false,
      });

      fetchAudios(userId, token); // refresh audios list

    } catch (error) {
      updateMessage({
        text: (error instanceof Error) ? error.message : "Something went wrong.",
        isError: true,
      });
    }

  }

  const like = async (audioId: string) => {

    try {
      const token = await getToken();
      if (!token) throw new Error("Token is required")

      const { message } = await addLike(audioId, token);

      if (message) throw new Error(message)

    } catch (error) {
      updateMessage({
        text: (error instanceof Error) ? error.message : "Something went wrong.",
        isError: true,
      });
    }

  }

  const dislike = async (audioId: string) => {

    try {
      const token = await getToken();
      if (!token) throw new Error("Token is required")

      const { message } = await removeLike(audioId, token);

      if (message) throw new Error(message)
      
    } catch (error) {
      updateMessage({
        text: (error instanceof Error) ? error.message : "Something went wrong.",
        isError: true,
      });
    }
  }

  const favorite = async (audioId: string) => {

    try {
      const token = await getToken();
      if (!token) throw new Error("Token is required")

      const { message } = await addFavorite(audioId, token);

      if (message) throw new Error(message)

    } catch (error) {
      updateMessage({
        text: (error instanceof Error) ? error.message : "Something went wrong.",
        isError: true,
      });
    }

  }

  const removeFav = async (audioId: string) => {

    try {
      const token = await getToken();
      if (!token) throw new Error("Token is required")

      const { message } = await removeFavorite(audioId, token);

      if (message) throw new Error(message)
      
    } catch (error) {
      updateMessage({
        text: (error instanceof Error) ? error.message : "Something went wrong.",
        isError: true,
      });
    }
  }

  return {
    playAudio,
    removeAudio,
    like,
    dislike,
    favorite,
    removeFav
  }
}

export default usePlayer