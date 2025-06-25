import { SignUpButton } from "@clerk/clerk-react";
import UploadIcon from "../icons/UploadIcon";
import PlayListIcon from "../icons/PlayListIcon";
import LearningIcon from "../icons/LearningIcon";

const PresentationPage = () => {
  return (
    <>
      <div className='container text-center mx-auto px-2 mt-30'>
        <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-13">A social network for sharing audio clips, with AI-powered pronunciation and grammar feedback.</h1>
        <SignUpButton mode={"modal"} signInForceRedirectUrl={"home"}>
          <button 
            className="text-white bg-blue-700 hover:bg-blue-800 hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Get started
          </button>
        </SignUpButton>
      </div>
      <section className="mt-60 py-30 bg-gray-100">
        <div className="container mx-auto flex flex-col md:flex-row gap-5 lg:justify-between text-center">
          <div className="flex flex-col items-center">
            <div className="[&_*]:w-12 [&_*]:h-12 bg-blue-100 p-2 text-blue-500 rounded-full mb-3">
              <UploadIcon />
            </div>
            <h2 className="text-xl/10 font-bold text-gray-950">Upload your audios</h2>
            <p className="max-w-xl text-sm/7 text-gray-600">Users can record and share audios.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="[&_*]:w-12 [&_*]:h-12 bg-blue-100 p-2 text-blue-500 rounded-full mb-3">
              <PlayListIcon />
            </div>
            <h2 className="text-xl/10 font-bold text-gray-950">Listen your audios</h2>
            <p className="max-w-xl text-sm/7 text-gray-600">Listen to audio directly on the platform.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="[&_*]:w-12 [&_*]:h-12 bg-blue-100 p-2 text-blue-500 rounded-full mb-3">
              <LearningIcon />
            </div>
            <h2 className="text-xl/10 font-bold text-gray-950">Learning mode</h2>
            <p className="max-w-xl text-sm/7 text-gray-600">For pronunciation analysis and AI-powered feedback.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default PresentationPage