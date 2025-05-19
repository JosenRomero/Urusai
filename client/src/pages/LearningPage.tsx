import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { uploadAndAnalyzeAudio } from '../services/audioService';
import SoundRecorder from '../components/SoundRecorder';

const LearningPage = () => {
  const { getToken } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [apikey, setApiKey] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean | null>(null);
  const [text, setText] = useState<string | null>(null);
  const [isRecordAudio, setIsRecordAudio] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
    try {
      e.preventDefault();

      if (file && apikey && language) {

        setIsLoaded(false);

        const formData = new FormData();
        formData.append("language", language);
        formData.append("audio", file);

        const token = await getToken();

        if (!token) throw { message: "Token is required" }

        const { text, message } = await uploadAndAnalyzeAudio(formData, token, apikey);
        
        if (!text) throw { message }

        setIsLoaded(true);
        setText(text);

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
    <div>
      { isLoaded === null && (
        <form className="rounded-2xl bg-white px-4 py-10 shadow-md ring-1 ring-black/5 sm:px-8" onSubmit={handleSubmit}>
          
          { !isRecordAudio ? (
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="audio">Upload audio</label>
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

          <div className='mb-5'>
            <label htmlFor='apikey' className="block mb-2 text-sm font-medium text-gray-900">Your Gemini api key</label>
            <input 
              type="password"
              id="apikey"
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={ (e) => setApiKey(e.target.value) }
              required
            />
            <p id="apikey-explanation" className="mt-2 text-sm text-gray-500">Go to the <a href="https://aistudio.google.com/app/apikey" className="font-medium text-blue-600 hover:underline" target="_blank" rel="noreferrer">Google AI Studio</a> and generate your API KEY.</p>
          </div>
          <div className="mb-5">
            <label htmlFor="language" className="block mb-2 text-sm font-medium text-gray-900">Response language</label>
            <input 
              type="text"
              id="language"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Example: Spanish"
              onChange={ (e) => setLanguage(e.target.value) }
              required
            />
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">upload And Analyze Audio</button>
          <p id="security-explanation" className="mt-2 text-sm text-gray-500">Your API Key will not be stored in our system.</p>
        </form>
      )}

      { isLoaded === false && <div className="loader mx-auto"></div> }

      { isLoaded && <p className="text-xl text-gray-900 ">{text}</p>}
    </div>
  )
}

export default LearningPage