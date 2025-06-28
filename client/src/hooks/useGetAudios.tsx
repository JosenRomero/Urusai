import { useAuth } from "@clerk/clerk-react";
import { useCallback, useEffect, useState } from "react";
import { getAudios } from "../services/audioService";
import { Audio } from "../types/Audio";

const useGetAudios = () => {
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
  
      console.log({
        text: msg,
        isError: true,
      });

      setIsLoaded(true);
  
    }
  
  }, [getToken, userId]);
  
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