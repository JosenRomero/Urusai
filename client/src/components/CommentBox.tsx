import { FormEvent, useState } from "react";
import useModal from "../hooks/useModal"
import useUploadComment from "../hooks/useUploadComment";
import Modal from "./Modal";
import SoundRecorder from "./SoundRecorder";

interface Props {
  audioId: string
  getComments(): void
}

const CommentBox = ({ audioId, getComments }: Props) => {
  const [isRecordAudio, setIsRecordAudio] = useState(false);
  const { isOpenModal, openModal, closeModal } = useModal();
  const { formRef, audioRef, uploadComment, handleAudio, handleRecordAudio, updateFile } = useUploadComment({ getComments });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    uploadComment(audioId);
    closeModal();
    updateFile(null);
  }

  return (
    <div>

      <button 
        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 text-center focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 hover:cursor-pointer focus:z-10 focus:ring-4 focus:ring-gray-100"
        type="button"
        onClick={openModal}
      >
        Add a comment
      </button>

      <Modal
        title="Add a comment"
        isOpen={isOpenModal}
        close={closeModal}
      >

        <form ref={formRef} className="w-96 md:w-md" onSubmit={handleSubmit}>

          { !isRecordAudio ? (
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="audio">Load audio</label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2.5"
                id="audio"
                type="file"
                accept="audio/mp3,audio/ogg,audio/wav"
                onChange={(e) => handleAudio(e)}
                aria-describedby="upload_audio"
                required
              />
            </div>
          ) : (
            <SoundRecorder handleRecordAudio={handleRecordAudio} audioRef={audioRef} />
          )}

          <div className="mb-5">
            <button
              type="button"
              className="text-sm text-blue-600 hover:cursor-pointer flex w-full justify-end"
              onClick={ () => setIsRecordAudio(!isRecordAudio) }
            >
              { isRecordAudio ? <>or load audio</> : <>or record audio</>}
            </button>
          </div>

          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:cursor-pointer">Comment</button>

        </form>

      </Modal>
    </div>
  )
}

export default CommentBox