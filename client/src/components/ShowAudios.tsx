import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Audio } from "../types/Audio";
import { getAudio } from "../services/audioService";
import PlayIcon from '../icons/PlayIcon';
import { NotificationMessage } from '../types/NotificationMessage';
import { notificationMessageDefault } from '../consts/notificationMessageDefault';
import Notification from './Notification';

interface Props {
  title: string,
  audios: Audio[],
  isLoaded: boolean
}

const ShowAudios = ({ title, audios, isLoaded }: Props) => {
  const { getToken } = useAuth();
  const [notificationMessage, setNotificationMessage] = useState<NotificationMessage>(notificationMessageDefault);

  const getAudioDate = (date: string) => {

    return new Date(date).toLocaleString("en", { 
      year: "numeric",
      month: "long",
      day: "numeric"
    })
    
  }

  const playAudio = async (audioId: string, title: string) => {

    try {

      const token = await getToken();
      if (!token) throw new Error("Missing required fields");
      const response = await getAudio(audioId, token);

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message);
      }

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      
      const audioPlayerContainer = document.getElementById("audioPlayerContainer") as HTMLDivElement
      const audioPlayer = document.getElementById("audioPlayer") as HTMLAudioElement
      const audioTitle = document.getElementById("audioTitle") as HTMLParagraphElement 

      if (audioPlayerContainer.classList.contains("hidden")) {
        audioPlayerContainer.classList.remove("hidden");
      }

      audioPlayer.src = url
      audioTitle.innerHTML = title
      
    } catch (error) {
      let msg = "Something went wrong."

      if (error instanceof Error) msg = error.message
        
      setNotificationMessage({
        text: msg,
        isError: true
      });
    }

  }

  return (
    <div>
      <h2 className='text-2xl font-bold text-slate-800'>{title}</h2>

      <div className='mt-5'>
        {!isLoaded ? (
          <div className="loader mx-auto"></div>
        ) : (
          <table className="w-full text-xl text-left rtl:text-right text-slate-800">
            <tbody>
              {audios.map((audio) => {
                return (
                  <tr
                    className="border-b border-gray-200 hover:cursor-pointer hover:bg-sky-100"
                    onClick={() => playAudio(audio.audioId, audio.title)}
                    key={audio._id}
                  >
                    <td className="px-6 py-4">
                      <PlayIcon />
                    </td>
                    <td className="px-6 py-4">{audio.title}</td>
                    <td className="px-6 py-4">{getAudioDate(audio.createdAt)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      <Notification
        message={notificationMessage}
        notificationClose={ () => setNotificationMessage(notificationMessageDefault) }
      />

    </div>
  )
}

export default ShowAudios