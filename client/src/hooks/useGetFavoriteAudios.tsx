import { useCallback, useEffect, useState } from "react";
import { NotificationMessage } from "../types/NotificationMessage";
import { useAuth } from "@clerk/clerk-react";
import { getFavoriteAudios } from "../services/audioService";
import { Audio } from "../types/Audio";

interface Props {
  updateNotification(message: NotificationMessage): void
}

const useGetFavoriteAudios = ({ updateNotification }: Props) => {
  const { getToken } = useAuth();
  const [audios, setAudios] = useState<Audio[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const allFavoriteAudios = useCallback( async () => {

    try {
      const token = await getToken();
      if (!token) throw new Error("Missing required fields");

      const { favorites, message } = await getFavoriteAudios(token);

      setIsLoaded(true);

      if (message) throw new Error(message);

      setAudios(favorites);

    } catch (error) {
      let msg = "Something went wrong."

      if (error instanceof Error) msg = error.message

      updateNotification({
        text: msg,
        isError: true,
      });

      setIsLoaded(true);
        
    }

  }, [getToken, updateNotification]);

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