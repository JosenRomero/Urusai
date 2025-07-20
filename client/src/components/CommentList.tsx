import useGetComments from "../hooks/useGetComments"
import { Audio } from "../types/Audio";
import ShowAudios from "./ShowAudios";

interface Props {
  audioId: string
}

const CommentList = ({ audioId }: Props) => {

  const { comments, isLoadedComments } = useGetComments({ audioId });

  if (!isLoadedComments) return <div className="loader mx-auto"></div>

  return (
    <div>
      <ShowAudios
        title="Comments"
        audios={comments as (Audio[] | null) ?? []} // fisrt casting to Audio or null then the nullish coalescing operator
        isLoaded={isLoadedComments}
        IsMyList={false}
        updateMyAudios={() => {}}
      />
    </div>
  )
}

export default CommentList