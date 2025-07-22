import useGetComments from "../hooks/useGetComments"
import { Audio } from "../types/Audio";
import { AudioType } from "../types/enums";
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
        audioType={AudioType.COMMENT_AUDIO}
        updateMyAudios={() => {}}
      />
    </div>
  )
}

export default CommentList