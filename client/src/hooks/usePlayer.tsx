import { useAuth } from "@clerk/clerk-react";
import { NotificationMessage } from "../types/NotificationMessage";
import { addLike, deleteAudio, getAudio } from "../services/audioService";

interface Props {
  updateNotification(message: NotificationMessage): void
  myAllAudios(): void
}

const usePlayer = ({ updateNotification, myAllAudios }: Props) => {
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
      let msg = "Something went wrong."

      if (error instanceof Error) msg = error.message

      updateNotification({
        text: msg,
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

      updateNotification({
        text: successMessage,
        isError: false,
      })

      myAllAudios(); // refresh audios list

    } catch (error) {
      let msg = "Something went wrong."

      if (error instanceof Error) msg = error.message

      updateNotification({
        text: msg,
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
      let msg = "Something went wrong."

      if (error instanceof Error) msg = error.message

      updateNotification({
        text: msg,
        isError: true,
      })
    }

  }

  return {
    playAudio,
    removeAudio,
    like
  }
}

export default usePlayer