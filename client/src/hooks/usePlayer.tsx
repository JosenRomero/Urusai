import { useAuth } from "@clerk/clerk-react";
import { addFavorite, addLike, deleteAudio, getAudio, removeFavorite, removeLike } from "../services/audioService";

interface Props {
  myAllAudios(): void
}

const usePlayer = ({ myAllAudios }: Props) => {
  const { getToken } = useAuth();
  
  const playAudio = async (audioId: string, title: string) => {

    try {
      const token = await getToken();
      if (!token) throw new Error("Missing required fields")
      const response = await getAudio(audioId, token);

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
      console.log({
        text: (error instanceof Error) ? error.message : "Something went wrong.",
        isError: true,
      })
    }

  }

  const removeAudio = async (audioId: string) => {

    try {
      const token = await getToken();
      if (!token) throw new Error("Token is required")

      const { successMessage, message } = await deleteAudio(audioId, token);

      if (message) throw new Error(message)

      console.log({
        text: successMessage,
        isError: false,
      })

      myAllAudios(); // refresh audios list

    } catch (error) {
      console.log({
        text: (error instanceof Error) ? error.message : "Something went wrong.",
        isError: true,
      })
    }

  }

  const like = async (audioId: string) => {

    try {
      const token = await getToken();
      if (!token) throw new Error("Token is required")

      const { message } = await addLike(audioId, token);

      if (message) throw new Error(message)

    } catch (error) {
      console.log({
        text: (error instanceof Error) ? error.message : "Something went wrong.",
        isError: true,
      })
    }

  }

  const dislike = async (audioId: string) => {

    try {
      const token = await getToken();
      if (!token) throw new Error("Token is required")

      const { message } = await removeLike(audioId, token);

      if (message) throw new Error(message)
      
    } catch (error) {
      console.log({
        text: (error instanceof Error) ? error.message : "Something went wrong.",
        isError: true,
      })
    }
  }

  const favorite = async (audioId: string) => {

    try {
      const token = await getToken();
      if (!token) throw new Error("Token is required")

      const { message } = await addFavorite(audioId, token);

      if (message) throw new Error(message)

    } catch (error) {
      console.log({
        text: (error instanceof Error) ? error.message : "Something went wrong.",
        isError: true,
      })
    }

  }

  const removeFav = async (audioId: string) => {

    try {
      const token = await getToken();
      if (!token) throw new Error("Token is required")

      const { message } = await removeFavorite(audioId, token);

      if (message) throw new Error(message)
      
    } catch (error) {
      console.log({
        text: (error instanceof Error) ? error.message : "Something went wrong.",
        isError: true,
      })
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