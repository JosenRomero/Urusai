import { useAuth } from "@clerk/clerk-react";
import { useCallback, useContext, useEffect, useState } from "react";
import { getAudios } from "../services/audioService";
import { Audio } from "../types/Audio";
import MessageContext from "../context/MessageContext";

const useGetAudios = () => {
  const { getToken, userId } = useAuth();
  const [myAudios, setMyAudios] = useState<Audio[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { updateMessage } = useContext(MessageContext);

  const myAllAudios = useCallback( async () => {
  
    try {
      const token = await getToken();
      if (!token || !userId) throw new Error("Missing required fields");
      const { audios, message } = await getAudios(userId, token);
  
      setIsLoaded(true);
  
      if (message) throw new Error(message);
  
      setMyAudios(audios);
        
    } catch (error) {

      updateMessage({
        text: (error instanceof Error) ? error.message : "Something went wrong.",
        isError: true,
      });

      setIsLoaded(true);
  
    }
  
  }, [getToken, userId, updateMessage]);
  
  useEffect(() => {

    if (!isLoaded) {
      myAllAudios();
    }
    
  }, [isLoaded, myAllAudios]);

  const updateMyAudios = (audios: Audio[]) => {
    setMyAudios(audios)
  }

  return {
    myAudios,
    isLoaded,
    myAllAudios,
    updateMyAudios
  }

}

export default useGetAudios