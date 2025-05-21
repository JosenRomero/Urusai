import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { uploadAudio, getAudios } from '../services/audioService';
import { Audio } from '../types/Audio';
import ShowAudios from '../components/ShowAudios';
import Notification from '../components/Notification';
import { notificationMessageDefault } from '../consts/notificationMessageDefault';
import { NotificationMessage } from '../types/NotificationMessage';
import AudioUploadForm from '../components/AudioUploadForm';

const HomePage = () => {
  const { getToken, userId } = useAuth();
  const [audioTitle, setAudioTitle] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [myAudios, setMyAudios] = useState<Audio[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isRecordAudio, setIsRecordAudio] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [notificationMessage, setNotificationMessage] = useState<NotificationMessage>(notificationMessageDefault);

  const myAllAudios = useCallback( async () => {

    try {
      const token = await getToken()
      if (!token || !userId) throw new Error("Missing required fields");
      const { audios, message } = await getAudios(userId, token);

      setIsLoaded(true);

      if (message) throw new Error(message);

      setMyAudios(audios);

    } catch (error) {
      let msg = "Something went wrong."

      if (error instanceof Error) msg = error.message

      setNotificationMessage({
        text: msg,
        isError: true,
      });
    }

  }, [getToken, userId]);

  useEffect(() => {

    myAllAudios();
    
  }, [myAllAudios]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
    try {
      e.preventDefault();

      if (audioTitle && file) {

        const formData = new FormData();
        formData.append("title", audioTitle);
        formData.append("audio", file);

        const token = await getToken();

        if (!token) throw new Error("Token is required");

        const { successMessage, message } = await uploadAudio(formData, token);

        if (message) throw new Error(message);

        setNotificationMessage({
          text: successMessage,
          isError: false
        });

        // reset form
        if (formRef.current) formRef.current.reset();
        if (audioRef.current) audioRef.current.remove();
        
        myAllAudios();

      } else {
        throw new Error("Missing required fields");
      }

    } catch (error) {

      let msg = "Something went wrong."

      if (error instanceof Error) msg = error.message
      
      setNotificationMessage({
        text: msg,
        isError: true
      });

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

  const updateAudioTitle = (title: string) => setAudioTitle(title);

  const updateIsRecordAudio = (isRecordAudio: boolean) => setIsRecordAudio(isRecordAudio);

  return (
    <div className='flex flex-col gap-16'>
      <AudioUploadForm
        handleSubmit={handleSubmit}
        handleAudio={handleAudio}
        handleRecordAudio={handleRecordAudio}
        updateAudioTitle={updateAudioTitle}
        updateIsRecordAudio={updateIsRecordAudio}
        isRecordAudio={isRecordAudio}
        formRef={formRef}
        audioRef={audioRef}
      />
      <ShowAudios
        title={"My Audios"}
        audios={myAudios}
        isLoaded={isLoaded}
        IsMyList={true}
        myAllAudios={myAllAudios}
      />

      { myAudios && myAudios.length > 0 && (
          <div>
            <a className="hover:!underline" href='all-audios'>Latest audios</a>
          </div>
      )}

      <Notification
        message={notificationMessage}
        notificationClose={ () => setNotificationMessage(notificationMessageDefault) }
      />
    </div>
  )
}

export default HomePage