import { ReactNode, useCallback, useContext, useState } from "react"
import AudiosContext from "./AudiosContext"
import { Audio } from "../types/Audio";
import MessageContext from "./MessageContext";
import { getAudios, getComments } from "../services/audioService";

interface Props {
  children: ReactNode
}
export const AudiosProvider = ({ children }: Props) => {

  const { updateMessage } = useContext(MessageContext);
  const [audios, setAudios] = useState<Audio[]>([]);
  const [comments, setComments] = useState<Audio | null>(null);
  const [isLoadedAudios, setIsLoadedAudios] = useState<boolean>(false);
  const [isLoadedComments, setIsLoadedComments] = useState<boolean>(false);

  const updateAudios = (audios: Audio[]) => setAudios(audios);

  const fetchAudios = useCallback( async (userId: string, token: string) => {

    try {

      if (!token || !userId) throw new Error("Missing required fields");
      const { audios, message } = await getAudios(userId, token);
      if (message) throw new Error(message);
      setAudios(audios);

    } catch (error) {

      updateMessage({
        text: (error instanceof Error) ? error.message : "Something went wrong.",
        isError: true,
      });

    } finally {

      setIsLoadedAudios(true);

    }

  }, [updateMessage]);

  const fetchComments = useCallback( async (audioId: string, token: string) => {
    
    try {

      if (!token || !audioId) throw new Error("Missing required fields");
      const { comments, message } = await getComments(audioId, token);
      if (message) throw new Error(message);
      setComments(comments);
      
    } catch (error) {

      updateMessage({
        text: (error instanceof Error) ? error.message : "Something went wrong.",
        isError: true,
      });

    } finally {

      setIsLoadedComments(true);

    }
    
  }, [updateMessage]);

  return (
    <AudiosContext.Provider
      value={{ audios, isLoadedAudios, comments, isLoadedComments, updateAudios, fetchAudios, fetchComments }}
    >
      {children}
    </AudiosContext.Provider>
  )

}