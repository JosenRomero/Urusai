import { useAuth } from "@clerk/clerk-react"
import { useCallback, useContext, useEffect, useState } from "react";
import { Audio } from "../types/Audio";
import MessageContext from "../context/MessageContext";
import { getInfoAudio } from "../services/audioService";

interface Props {
  audioId: string
}

const useGetInfoAudio = ({ audioId }: Props) => {
  const { getToken } = useAuth();
  const [audio, setAudio] = useState<Audio | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { updateMessage } = useContext(MessageContext);

  const infoAudio = useCallback( async () => {

    try {
      const token = await getToken();
      if (!token) throw new Error("Missing required fields");
      const { audio, message } = await getInfoAudio(audioId, token);

      setIsLoaded(true);

      if (message) throw new Error(message);

      setAudio(audio);
      
    } catch (error) {

      updateMessage({
        text: (error instanceof Error) ? error.message : "Something went wrong.",
        isError: true,
      });

      setIsLoaded(true);
      
    }

  }, [getToken, audioId, updateMessage]);

  useEffect(() => {

    if(!isLoaded) {
      infoAudio();
    }

  }, [isLoaded, infoAudio]);

  const updateAudio = (audio: Audio) => {
    setAudio(audio);
  }

  return {
    audio,
    isLoaded,
    updateAudio
  }

}

export default useGetInfoAudio