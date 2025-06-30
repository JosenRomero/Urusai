
import { useParams } from "react-router-dom";
import useGetInfoAudio from "../hooks/useGetInfoAudio";

const AudioPage = () => {
  const params = useParams();

  const { audio, isLoaded } = useGetInfoAudio({ audioId: params.audioId ?? "" });

  if (!isLoaded) return <div className="loader mx-auto"></div>

  if (isLoaded && audio == null) return <div className="text-center">Unexpected error!</div>
  
  return (
    <div className="sm:w-96 md:w-2xl mx-auto flex flex-col gap-y-16 p-4">
      <p>audioId: {params.audioId}</p>
      <p>{audio?.title}</p>
    </div>
  )
}

export default AudioPage