import { useParams } from "react-router-dom";
import useGetProfile from "../hooks/useGetProfile";
import { User } from "../types/User";
import ProfileTabs from "../components/ProfileTabs";

const ProfilePage = () => {
  const params = useParams();
  const { profile, isLoaded, updateProfile, follow, unFollow } = useGetProfile({ profileUserId: params.profileUserId ?? "" });

  const btnAction = (currentIsFollowing: boolean) => {
    if (!profile) return

    const currentProfile: User = { ...profile }

    if (!currentIsFollowing) follow();
    else unFollow();

    currentProfile.isFollowing = !currentIsFollowing;
    updateProfile(currentProfile);

  }

  if (!isLoaded) return <div className="loader mx-auto"></div>

  if (!profile) return <div className="text-center">Unexpected error!</div>

  return (
    <div className="sm:w-96 md:w-2xl mx-auto px-4">
      <div className="flex flex-col sm:flex-row sm:gap-x-6 items-center justify-center">
        <img className="rounded-full w-32 h-32" src={profile.imageUrl} alt={profile.username} />
        <div className="text-center sm:text-start">
          <h2 className="mt-2 pb-4 font-semibold">{profile.username}</h2>

          { !profile.isOwnProfile && <>
            <button 
                type="button"
                onClick={ () => btnAction(profile.isFollowing) }
                className={`text-white focus:ring-4 focus:outline-none ${ profile.isFollowing ? 'bg-red-700 hover:bg-red-800 focus:ring-red-300' : 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300'} font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:cursor-pointer`}
            >{ profile.isFollowing ? 'UnFollow' : 'Follow'}</button>
          </>}

        </div>
      </div>
      <ProfileTabs profileUserId={params.profileUserId ?? ""} />
    </div>
  )
}

export default ProfilePage