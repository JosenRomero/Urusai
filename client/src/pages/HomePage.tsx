import ShowAudios from '../components/ShowAudios';
import AudioUploadForm from '../components/AudioUploadForm';
import { useState } from 'react';
import useGetAudios from '../hooks/useGetAudios';
import useUploadAudio from '../hooks/useUploadAudio';

const HomePage = () => {

  const [isRecordAudio, setIsRecordAudio] = useState(false);

  const {
    audios,
    isLoadedAudios,
    updateAudios
  } = useGetAudios();
  
  const {
    formRef,
    audioRef,
    handleSubmit,
    handleAudio,
    handleRecordAudio,
    updateAudioTitle,
  } = useUploadAudio();

  const updateIsRecordAudio = (isRecordAudio: boolean) => setIsRecordAudio(isRecordAudio);
  
  return (
    <div className='md:w-2xl mx-auto flex flex-col gap-y-16 p-4'>
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
        audios={ audios ?? [] }
        isLoaded={isLoadedAudios}
        IsMyList={true}
        updateMyAudios={updateAudios}
      />
    </div>
  )
}

export default HomePage