import useGetComments from "../hooks/useGetComments"
import { AudioType } from "../types/enums";
import ShowAudios from "./ShowAudios";

interface Props {
  audioId: string
}

const CommentList = ({ audioId }: Props) => {

  const { comments, isLoadedComments, updateComments } = useGetComments({ audioId });

  if (!isLoadedComments) return <div className="loader mx-auto"></div>

  return (
    <div>
      <ShowAudios
        title="Comments"
        audios={comments}
        isLoaded={isLoadedComments}
        IsMyList={false}
        audioType={AudioType.COMMENT_AUDIO}
        updateMyAudios={updateComments}
      />
    </div>
  )
}

export default CommentList