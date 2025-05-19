import { useRef, useState } from "react";
import MicrophoneIcon from "../icons/MicrophoneIcon";

interface Props {
  handleRecordAudio(audioBlob: Blob): void
}

const SoundRecorder = ({ handleRecordAudio }: Props) => {
  
  const audioChunk = useRef<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  // The MediaRecorder interface of the MediaStream Recording API
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);

  const startRec = async () => {
    
    try {
      audioChunk.current = []; // reset if it contains data

      const stream = await window.navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder: MediaRecorder = new window.MediaRecorder(stream);

      // save the data
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          // The recorded audio is captured in chunks
          audioChunk.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunk.current, { type: "audio/wav"});
        const newUrl = window.URL.createObjectURL(audioBlob);
        setAudioUrl(newUrl);
        handleRecordAudio(audioBlob);
      };

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.start(); // Start recording

      setRecording(true);

    } catch (error) {
      console.log(error);
      console.log("Error accessing the microphone.");
    }

  }

  const stopRec = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop(); // Stop recording
      setRecording(false);
    }
  }

  return (
    <div className="text-white">
      <p className="mb-8 text-sm font-medium text-gray-900">Record audio</p>

      { recording ? (
        <button
          type="button"
          className='rounded-full p-3 mx-auto flex items-center justify-center bg-red-400 hover:bg-red-500 animate-pulse'
          onClick={stopRec}
        >
          <MicrophoneIcon />
        </button>
      ) : (
        <button
          type="button"
          className='rounded-full p-3 mx-auto flex items-center justify-center bg-blue-400 hover:bg-blue-500'
          onClick={startRec}
        >
          <MicrophoneIcon />
        </button>
      )}

      {audioUrl && (
        <div className="my-7 flex justify-center">
          <audio src={audioUrl} controls />
        </div>
      )}
    </div>
  )
}

export default SoundRecorder