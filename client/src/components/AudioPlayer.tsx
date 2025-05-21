
const AudioPlayer = () => {
  return (
    <div className="fixed bottom-0 hidden w-full py-2 bg-neutral-800" id="audioPlayerContainer">
      <div className="flex row gap-5 justify-center">
        <p id="audioTitle" className="text-xl text-white hidden md:block"></p>
        <audio id="audioPlayer" autoPlay controls />
      </div>
    </div>
  )
}

export default AudioPlayer