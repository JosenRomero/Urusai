import { useAuth } from "@clerk/clerk-react"
import { useCallback, useContext, useEffect, useState } from "react";
import { Audio } from "../types/Audio";
import { getAllAudios } from "../services/audioService";
import ShowAudios from "../components/ShowAudios";
import MessageContext from "../context/MessageContext";

const AllAudiosPage = () => {
  const { getToken } = useAuth();
  const [audios, setAudios] = useState<Audio[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { updateMessage } = useContext(MessageContext);

  const allAudios = useCallback( async () => {

    try {
      const token = await getToken();
      if (!token) throw new Error("Missing required fields");

      const { allAudios, message } = await getAllAudios(token);

      setIsLoaded(true);

      if (message) throw new Error(message);

      setAudios(allAudios);
        
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
      allAudios();
    }

  }, [isLoaded, allAudios]);

  const updateAudios = (audios: Audio[]) => {
    setAudios(audios);
  }

  return (
    <div className="sm:w-96 md:w-2xl mx-auto flex flex-col gap-y-16 p-4">
      <ShowAudios
        title="Latest audios added"
        audios={audios}
        isLoaded={isLoaded}
        IsMyList={false}
        updateMyAudios={ updateAudios }
      />
    </div>
  )
}

export default AllAudiosPage