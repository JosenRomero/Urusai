import useGetProfileData from "../hooks/useGetProfileData"
import { ProfileTabsType } from "../types/enums";
import ShowUsers from "./ShowUsers";

interface Props {
  profileUserId: string
}

const ProfileTabs = ({ profileUserId }: Props) => {

  const { activeTab, followersData, followingsData, handleTab} = useGetProfileData({ profileUserId });
  
  return (
    <div className="mt-15">
      <div className="flex mb-6">
        <button
          className={`p-2.5 [&.active]:border-b-2 [&.active]:border-b-gray-800 hover:cursor-pointer ${activeTab === ProfileTabsType.FOLLOWERS ? 'active' : '' }`}
          id={ProfileTabsType.FOLLOWERS}
          onClick={ handleTab }
        >
          Followers
        </button>
        <button
          className={`p-2.5 [&.active]:border-b-2 [&.active]:border-b-gray-800 hover:cursor-pointer ${activeTab === ProfileTabsType.FOLLOWINGS ? 'active' : '' }`}
          id={ProfileTabsType.FOLLOWINGS}
          onClick={ handleTab }
        >
          Followings
        </button>
      </div>
      <div>
        <div className={`hidden [&.active]:block ${activeTab === ProfileTabsType.FOLLOWERS ? 'active' : '' }`}>
          <ShowUsers
            users={followersData}
            description="No followers yet."
          />
        </div>
        <div className={`hidden [&.active]:block ${activeTab === ProfileTabsType.FOLLOWINGS ? 'active' : '' }`}>
          <ShowUsers
            users={followingsData}
            description="No followings yet."
          />
        </div>
      </div>
    </div>
  )
}

export default ProfileTabs