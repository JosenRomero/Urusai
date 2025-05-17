
const AudioPlayer = () => {
  return (
    <div className="absolute bottom-0 hidden w-full py-2 bg-neutral-800" id="audioPlayerContainer">
      <div className="flex row gap-5 justify-center">
        <p id="audioTitle" className="text-xl text-white"></p>
        <audio id="audioPlayer" autoPlay controls />
      </div>
    </div>
  )
}

export default AudioPlayer