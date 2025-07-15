import { useAuth } from '@clerk/clerk-react';
import { useContext, useRef, useState } from 'react';
import { uploadAudio } from '../services/audioService';
import MessageContext from '../context/MessageContext';
import AudiosContext from '../context/AudiosContext';

const useUploadAudio = () => {
  const { getToken, userId } = useAuth();
  const [audioTitle, setAudioTitle] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { updateMessage } = useContext(MessageContext);
  const { fetchAudios } = useContext(AudiosContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    try {
      e.preventDefault();

      if (audioTitle && file && userId) {

        const formData = new FormData();
        formData.append("title", audioTitle);
        formData.append("audio", file);

        const token = await getToken();

        if (!token) throw new Error("Token is required");

        const { successMessage, message } = await uploadAudio(formData, token);

        if (message) throw new Error(message);

        updateMessage({
          text: successMessage,
          isError: false
        });

        // reset form
        if (formRef.current) formRef.current.reset();
        if (audioRef.current) audioRef.current.remove();

        fetchAudios(userId, token); // refresh audios

      } else {
        throw new Error("Missing required fields");
      }
      
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
    setFile(audio)
  }

  const handleRecordAudio = (audioBlob: Blob) => {
    const myFile = new File([audioBlob], "audio-recording.wav", {
      type: "audio/wav",
      lastModified: Date.now()
    });
    setFile(myFile);
  }

  const updateAudioTitle = (title: string) => setAudioTitle(title);

  return {
    formRef,
    audioRef,
    handleSubmit,
    handleAudio,
    handleRecordAudio,
    updateAudioTitle,
  }
}

export default useUploadAudio