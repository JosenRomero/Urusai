import { Audio } from "../types/Audio";
import { AudioType } from "../types/enums";
import ShowAudios from "./ShowAudios";

interface Props {
  comments: Audio[]
  isLoadedComments: boolean
  updateComments(comments: Audio[]): void
}

const CommentList = ({ comments, isLoadedComments, updateComments }: Props) => {

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