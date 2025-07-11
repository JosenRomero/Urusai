import { useContext, useRef, useState } from "react"
import MessageContext from "../context/MessageContext"
import { useAuth } from "@clerk/clerk-react";
import { addComment } from "../services/audioService";

const useUploadComment = () => {
  const { getToken } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { updateMessage } = useContext(MessageContext);

  const uploadComment = async (audioId: string) => {

    try {

      if (!file) throw new Error("Missing required fields");

      const formData = new FormData();
      formData.append("audio", file);

      const token = await getToken();

      if (!token) throw new Error("Token is required");

      const { successMessage, message } = await addComment(audioId, token, formData);

      if (message) throw new Error(message);

      updateMessage({
        text: successMessage,
        isError: false
      });

      // reset form
      if (formRef.current) formRef.current.reset();
      if (audioRef.current) audioRef.current.remove();

      // TODO: update comments list
      
    } catch (error) {
      updateMessage({
        text: (error instanceof Error) ? error.message : "Something went wrong.",
        isError: true
      });
    }

  }

  const handleAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return
    const audio = e.target.files[0];
    updateFile(audio);
  }

  const handleRecordAudio = (audioBlob: Blob) => {
    const audio = new File([audioBlob], "audio-recording.wav", {
      type: "audio/wav",
      lastModified: Date.now()
    });
    updateFile(audio);
  }

  const updateFile = (audio: File | null) => setFile(audio)

  return {
    formRef,
    audioRef,
    uploadComment,
    handleAudio,
    handleRecordAudio,
    updateFile
  }
}

export default useUploadComment