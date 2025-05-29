import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Audio } from "../types/Audio";
import { getAudio, deleteAudio } from "../services/audioService";
import PlayIcon from '../icons/PlayIcon';
import { NotificationMessage } from '../types/NotificationMessage';
import { notificationMessageDefault } from '../consts/notificationMessageDefault';
import Notification from './Notification';
import Trash from '../icons/Trash';
import UserIcon from '../icons/UserIcon';
import HeartIcon from '../icons/HeartIcon';
import BookMarkIcon from '../icons/BookMarkIcon';

interface Props {
  title: string,
  audios: Audio[],
  isLoaded: boolean
  IsMyList: boolean
  myAllAudios(): void
}

const ShowAudios = ({ title, audios, isLoaded, IsMyList, myAllAudios }: Props) => {
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

  const removeAudio = async (audioId: string) => {

    try {

      const token = await getToken();
      if (!token) throw new Error("Token is required");

      const { successMessage, message } = await deleteAudio(audioId, token);

      if (message) throw new Error(message);

      setNotificationMessage({
        text: successMessage,
        isError: false
      });

      myAllAudios(); // refresh audios list
      
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
          <>
            { audios && audios.length > 0 ? (
              <>
                {audios.map((audio) => {
                  return (
                    <div
                      className="border-b border-gray-200 w-full flex flex-col sm:flex-row sm:items-center gap-5 py-4"
                      key={audio._id}
                    >
                      
                      <div className="flex flex-row flex-1 items-center gap-5">
                        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
                          <UserIcon />
                        </div>

                        <div className="flex flex-col flex-1">
                          <p className="text-xl font-medium text-gray-900">{audio.title}</p>
                          <p className="text-sm text-gray-500">{getAudioDate(audio.createdAt)}</p>
                        </div>
                      </div>

                      <div className="flex flex-row items-center gap-x-10">

                        <div className="w-5 h-5 hover:cursor-pointer hover:text-yellow-600">
                          <BookMarkIcon />
                        </div>

                        <div className="w-5 h-5 hover:cursor-pointer hover:text-green-600">
                          <HeartIcon />
                        </div>

                        { IsMyList && (
                          <button 
                            type="button" 
                            className="text-slate-800 hover:text-red-700 hover:cursor-pointer w-5 h-5"
                            onClick={ () => removeAudio(audio.audioId) }
                          >
                            <Trash />
                          </button>
                        )}

                        <div
                          className="w-5 h-5 inline-block hover:cursor-pointer hover:scale-125 transition"
                          onClick={() => playAudio(audio.audioId, audio.title)}
                        >
                          <PlayIcon />
                        </div>

                      </div>

                    </div>
                  )
                })}
              </>
            ) : (
              <p className="w-full text-center mt-10">No saved audio files.</p>
            )}
          </>
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