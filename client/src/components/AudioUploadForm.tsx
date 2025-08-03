import { ChangeEvent, FormEventHandler } from "react";
import SoundRecorder from "./SoundRecorder";

interface Props {
  handleSubmit: FormEventHandler
  handleAudio(e: ChangeEvent<HTMLInputElement>): void
  handleRecordAudio(audioBlob: Blob): void
  updateAudioTitle(title: string): void
  updateIsRecordAudio(isRecordAudio: boolean): void
  isRecordAudio: boolean
  formRef: React.Ref<HTMLFormElement>
  audioRef: React.Ref<HTMLAudioElement>
}

const AudioUploadForm = ({ handleSubmit, handleAudio, handleRecordAudio, updateAudioTitle, updateIsRecordAudio, isRecordAudio, formRef, audioRef }: Props) => {
  
  return (
    <form ref={formRef} className="rounded-2xl bg-white px-4 py-10 shadow-md ring-1 ring-black/5 sm:px-8" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Audio title</label>
        <input 
          type="text"
          id="title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Example: Hanging out with friends in the park"
          onChange={ (e) => updateAudioTitle(e.target.value) }
          required
        />
      </div>

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
      ) }

      <div className="mb-5">
        <button
          type="button"
          className="text-sm text-blue-600 hover:cursor-pointer flex w-full justify-end"
          onClick={() => updateIsRecordAudio(!isRecordAudio)}
        >
          { isRecordAudio ? <>or load audio</> : <>or record audio</>}
        </button>
      </div>

      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:cursor-pointer">upload Audio</button>
    </form>
  )
}

export default AudioUploadForm