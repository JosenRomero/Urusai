import { useAuth } from "@clerk/clerk-react"
import { useCallback, useContext, useEffect, useState } from "react";
import MessageContext from "../context/MessageContext";
import { getComments } from "../services/audioService";
import { Comment } from "../types/Comment";

interface Props {
  audioId: string
}

const useGetComments = ({ audioId }: Props) => {
  const { getToken } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadedComments, setIsLoadedComments] = useState<boolean>(false);
  const { updateMessage } = useContext(MessageContext);

  const allComments = useCallback( async () => {

    try {

      const token = await getToken();
      if (!token || !audioId) throw new Error("Missing required fields")
      const { comments, message } = await getComments(audioId, token);
      if (message) throw new Error(message);
      setComments(comments);
      
    } catch (error) {

      updateMessage({
        text: (error instanceof Error) ? error.message : "Something went wrong.",
        isError: true
      });

    } finally {

      setIsLoadedComments(true);

    }

  }, [getToken, updateMessage, audioId]);

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