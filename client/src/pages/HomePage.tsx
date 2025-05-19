import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { uploadAudio, getAudios } from '../services/audioService';
import { Audio } from '../types/Audio';
import ShowAudios from '../components/ShowAudios';
import SoundRecorder from '../components/SoundRecorder';

const HomePage = () => {
  const { getToken, userId } = useAuth();
  const [audioTitle, setAudioTitle] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [myAudios, setMyAudios] = useState<Audio[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isRecordAudio, setIsRecordAudio] = useState(false);

  useEffect(() => {

    const myAudios = async () => {

      try {

        const token = await getToken();
        if (!token || !userId) throw { message: "Missing required fields" }
        const { audios } = await getAudios(userId, token);
        setMyAudios(audios);
        setIsLoaded(true);

      } catch (err) {
        console.log(err);
      }
      
    }

    myAudios();

  }, [getToken, userId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
    try {
      e.preventDefault();

      if (audioTitle && file) {

        const formData = new FormData();
        formData.append("title", audioTitle);
        formData.append("audio", file);

        const token = await getToken();

        if (!token) throw { message: "Token is required" }

        uploadAudio(formData, token);

      }

    } catch (err) {
      console.log(err);
    }
    
  }

  const handleAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return
    const audio = e.target.files[0];
    setFile(audio)
  }

  const handleRecordAudio = (audioBlob: Blob) => {
    const myFile = new File([audioBlob], "audio-recording.wav", {
      type: "audio/wav",
      lastModified: Date.now()
    });
    setFile(myFile);
  }

  return (
    <div className='flex flex-col gap-16'>
      <form className="rounded-2xl bg-white px-4 py-10 shadow-md ring-1 ring-black/5 sm:px-8" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Audio title</label>
          <input 
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Example: Hanging out with friends in the park"
            onChange={ (e) => setAudioTitle(e.target.value) }
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
          <SoundRecorder handleRecordAudio={handleRecordAudio} />
        ) }

        <div className="mb-5">
          <button
            type="button"
            className="text-sm text-blue-600 hover:cursor-pointer flex w-full justify-end"
            onClick={() => setIsRecordAudio(!isRecordAudio)}
          >
            { isRecordAudio ? <>or load audio</> : <>or record audio</>}
          </button>
        </div>

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">upload Audio</button>
      </form>

      <ShowAudios
        title={"My Audios"}
        audios={myAudios}
        isLoaded={isLoaded}
      />

    </div>
  )
}

export default HomePage