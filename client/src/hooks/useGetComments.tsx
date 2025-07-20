import { useAuth } from "@clerk/clerk-react"
import { useCallback, useContext, useEffect } from "react";
import AudiosContext from "../context/AudiosContext";
import MessageContext from "../context/MessageContext";

interface Props {
  audioId: string
}

const useGetComments = ({ audioId }: Props) => {
  const { getToken } = useAuth();
  const { comments, isLoadedComments, fetchComments } = useContext(AudiosContext);
  const { updateMessage } = useContext(MessageContext);

  const allComments = useCallback( async () => {

    try {

      const token = await getToken();
      if (!token) throw new Error("Missing required fields")
      fetchComments(audioId, token)
      
    } catch (error) {

      updateMessage({
        text: (error instanceof Error) ? error.message : "Something went wrong.",
        isError: true
      });

    }

  }, [getToken, updateMessage, fetchComments, audioId]);

  useEffect(() => {

    if (!isLoadedComments) {
      allComments();
    }

  }, [isLoadedComments, allComments]);

  return {
    comments,
    isLoadedComments
  }

}

export default useGetComments