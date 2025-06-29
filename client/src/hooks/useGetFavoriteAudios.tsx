import { useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { getFavoriteAudios } from "../services/audioService";
import { Audio } from "../types/Audio";
import MessageContext from "../context/MessageContext";

const useGetFavoriteAudios = () => {
  const { getToken } = useAuth();
  const [audios, setAudios] = useState<Audio[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { updateMessage } = useContext(MessageContext);

  const allFavoriteAudios = useCallback( async () => {

    try {
      const token = await getToken();
      if (!token) throw new Error("Missing required fields");

      const { favorites, message } = await getFavoriteAudios(token);

      setIsLoaded(true);

      if (message) throw new Error(message);

      setAudios(favorites);

    } catch (error) {

      updateMessage({
        text: (error instanceof Error) ? error.message : "Something went wrong.",
        isError: true,
      });

      setIsLoaded(true);
        
    }

  }, [getToken, updateMessage]);

  useEffect(() => {

    if (!isLoaded) {
      allFavoriteAudios();
    }
    
  }, [isLoaded, allFavoriteAudios]);

  const updateAudios = (audios: Audio[]) => {
    setAudios(audios);
  }

  return {
    isLoaded,
    audios,
    updateAudios
  }

}

export default useGetFavoriteAudios