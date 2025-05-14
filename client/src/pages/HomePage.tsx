import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { uploadAudio } from '../services/audioService';

const HomePage = () => {
  const { getToken } = useAuth();
  const [audioTitle, setAudioTitle] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

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

  return (
    <div className='flex justify-center'>
      <form className="rounded-2xl bg-white px-4 py-10 shadow-md ring-1 ring-black/5 sm:w-96 sm:px-8" onSubmit={handleSubmit}>
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
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">upload Audio</button>
      </form>
    </div>
  )
}

export default HomePage