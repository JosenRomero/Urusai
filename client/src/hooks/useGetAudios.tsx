import { useAuth } from "@clerk/clerk-react";
import { useCallback, useEffect, useState } from "react";
import { getAudios } from "../services/audioService";
import { Audio } from "../types/Audio";
import { NotificationMessage } from "../types/NotificationMessage";

interface Props {
  updateNotification(message: NotificationMessage): void
}

const useGetAudios = ({ updateNotification }: Props) => {
  const { getToken, userId } = useAuth();
  const [myAudios, setMyAudios] = useState<Audio[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const myAllAudios = useCallback( async () => {
  
      try {
        const token = await getToken();
        if (!token || !userId) throw new Error("Missing required fields");
        const { audios, message } = await getAudios(userId, token);
  
        setIsLoaded(true);
  
        if (message) throw new Error(message);
  
        setMyAudios(audios);
        
      } catch (error) {
        let msg = "Something went wrong."
  
        if (error instanceof Error) msg = error.message
  
        updateNotification({
          text: msg,
          isError: true,
        });
  
      }
  
    }, [getToken, userId, updateNotification]);
  
    useEffect(() => {
  
      myAllAudios();
  
    }, [myAllAudios]);

  return {
    myAudios,
    isLoaded,
    myAllAudios
  }

}

export default useGetAudios