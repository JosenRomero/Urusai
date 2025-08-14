import { useParams } from "react-router-dom";
import useGetProfile from "../hooks/useGetProfile";

const ProfilePage = () => {
  const params = useParams();
  const { profile, isLoaded } = useGetProfile({ profileUserId: params.profileUserId ?? "" });

  if (!isLoaded) return <div className="loader mx-auto"></div>

  if (!profile) return <div className="text-center">Unexpected error!</div>

  return (
    <div className="sm:w-96 md:w-2xl mx-auto px-4">
      <div className="flex flex-col sm:flex-row sm:gap-x-6 items-center justify-center">
        <img className="rounded-full w-32 h-32" src={profile.imageUrl} alt={profile.username} />
        <div className="text-center">
          <h2 className="mt-2 pb-4 font-semibold">{profile.username}</h2>
          <button 
            type="button" 
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:cursor-pointer"
          >Follow</button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage