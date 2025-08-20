import { useAuth } from "@clerk/clerk-react"
import { useCallback, useContext, useEffect, useState } from "react";
import MessageContext from "../context/MessageContext";
import { getFollowers, getFollowings } from "../services/audioService";
import { User } from "../types/User";
import { ProfileTabsType } from "../types/enums";

interface Props {
  profileUserId: string
}

const useGetProfileData = ({ profileUserId }: Props) => {
  const { getToken } = useAuth();
  const [activeTab, setActiveTab] = useState<ProfileTabsType>(ProfileTabsType.FOLLOWERS);
  const [followersData, setFollowersData] = useState<User[] | null>(null);
  const [followingsData, setFollowingsData] = useState<User[] | null>(null);
  const { updateMessage } = useContext(MessageContext);

  const loadData = useCallback( async () => {

    try {
      const token = await getToken();
      if (!token) throw new Error("Missing required fields");

      if (activeTab === ProfileTabsType.FOLLOWERS && followersData === null) {
        const { followers, message } = await getFollowers(profileUserId, token);
        if (message) throw new Error(message);
        setFollowersData(followers);
      }

      if (activeTab === ProfileTabsType.FOLLOWINGS && followingsData === null) {
        const { followings, message } = await getFollowings(profileUserId, token);
        if (message) throw new Error(message);
        setFollowingsData(followings);
      }
      
    } catch (error) {
      updateMessage({
        text: (error instanceof Error) ? error.message : "Something went wrong.",
        isError: true,
      });
      
    }
  }, [getToken, updateMessage, profileUserId, activeTab, followersData, followingsData]);

  useEffect(() => {

    loadData();

  }, [activeTab, loadData]);

  const handleTab = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setActiveTab(event.currentTarget.id as ProfileTabsType);
  }

  return {
    activeTab,
    followersData,
    followingsData,
    handleTab
  }

}

export default useGetProfileData