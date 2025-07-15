import { useAuth } from "@clerk/clerk-react";
import { useCallback, useContext, useEffect } from "react";
import AudiosContext from "../context/AudiosContext";
import MessageContext from "../context/MessageContext";

const useGetAudios = () => {
  const { getToken, userId } = useAuth();
  const { audios, isLoadedAudios, fetchAudios, updateAudios } = useContext(AudiosContext);
  const { updateMessage } = useContext(MessageContext);

  const myAllAudios = useCallback( async () => {

    try {

      const token = await getToken();
      if (!token || !userId) throw new Error("Missing required fields")
      fetchAudios(userId, token);
      
    } catch (error) {

      updateMessage({
        text: (error instanceof Error) ? error.message : "Something went wrong.",
        isError: true
      });

    }

  }, [getToken, fetchAudios, userId, updateMessage])

  useEffect(() => {

    if (!isLoadedAudios) {
      myAllAudios();
    }

  }, [isLoadedAudios, myAllAudios]);

  return {
    audios,
    isLoadedAudios,
    updateAudios
  }

}

export default useGetAudios