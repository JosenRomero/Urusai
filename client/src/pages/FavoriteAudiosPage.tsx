import useGetFavoriteAudios from "../hooks/useGetFavoriteAudios";
import ShowAudios from "../components/ShowAudios";

const FavoriteAudiosPage = () => {

  const { isLoaded, audios, updateAudios } = useGetFavoriteAudios();

  return (
    <div className='md:w-2xl mx-auto flex flex-col gap-y-16 p-4'>
      <ShowAudios
        title={"My favorite audios"}
        audios={audios}
        isLoaded={isLoaded}
        IsMyList={false}
        myAllAudios={() => {}}
        updateMyAudios={updateAudios}
      />
    </div>
  )
}

export default FavoriteAudiosPage