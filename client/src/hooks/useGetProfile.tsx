import { useAuth } from "@clerk/clerk-react"
import { useCallback, useContext, useEffect, useState } from "react";
import MessageContext from "../context/MessageContext";
import { getProfile } from "../services/audioService";
import { User } from "../types/User";

interface Props {
  profileUserId: string
}
const useGetProfile = ({ profileUserId }: Props) => {
  const { getToken } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { updateMessage } = useContext(MessageContext);

  const currentProfile = useCallback( async () => {

    try {
      const token = await getToken();
      if (!token) throw new Error("Missing required fields");
      const { profile, message } = await getProfile(profileUserId, token);

      setIsLoaded(true);

      if (message) throw new Error(message);

      setProfile(profile);
      
    } catch (error) {

      updateMessage({
        text: (error instanceof Error) ? error.message : "Something went wrong.",
        isError: true,
      });

      setIsLoaded(true);
      
    }

  }, [getToken, profileUserId, updateMessage]);

  useEffect(() => {

    if (!isLoaded) {
      currentProfile();
    }

  }, [isLoaded, currentProfile]);

  return {
    profile,
    isLoaded
  }

}

export default useGetProfile