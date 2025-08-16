import { useAuth } from "@clerk/clerk-react"
import { useCallback, useContext, useEffect, useState } from "react";
import MessageContext from "../context/MessageContext";
import { addFollow, getProfile, removeFollow } from "../services/audioService";
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
      const { user, isOwnProfile, isFollowing, message } = await getProfile(profileUserId, token);

      setIsLoaded(true);

      if (message) throw new Error(message);

      setProfile({ ...user, isOwnProfile, isFollowing });
      
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

  const updateProfile = (user: User) => {
    setProfile(user)
  }

  const follow = async () => {

    try {
      const token = await getToken();
      if (!token) throw new Error("Missing required fields");
      const { message } = await addFollow(profileUserId, token);

      if (message) throw new Error(message);
      
    } catch (error) {
      updateMessage({
        text: (error instanceof Error) ? error.message : "Something went wrong.",
        isError: true,
      });
    }

  }

  const unFollow = async () => {

    try {
      const token = await getToken();
      if (!token) throw new Error("Missing required fields");
      const { message } = await removeFollow(profileUserId, token);

      if (message) throw new Error(message);
      
    } catch (error) {
      updateMessage({
        text: (error instanceof Error) ? error.message : "Something went wrong.",
        isError: true,
      });
    }

  }

  return {
    profile,
    isLoaded,
    updateProfile,
    follow,
    unFollow
  }

}

export default useGetProfile