import { SignUpButton } from "@clerk/clerk-react";
import UploadIcon from "../icons/UploadIcon";
import PlayListIcon from "../icons/PlayListIcon";
import LearningIcon from "../icons/LearningIcon";
import { Fade, Slide } from "react-awesome-reveal";
import SectionTitle from "../components/SectionTitle";
import demo_01 from "../../../assets/demo_01.gif";
import demo_02 from "../../../assets/demo_02.gif";

const PresentationPage = () => {
  return (
    <>
      <header className='text-center min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 -mt-20'>
        <Fade>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">Where Your Audios Gets Feedback, Not Just Likes</h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48">A social network for sharing audio clips, with AI-powered pronunciation and grammar feedback.</p>
        </Fade>
        <SignUpButton mode={"modal"} signInForceRedirectUrl={"home"}>
          <button 
            className="text-white bg-blue-700 hover:bg-blue-800 hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Get Started
          </button>
        </SignUpButton>
      </header>

      <section className="py-30 bg-gray-100">
        <Slide direction="left" triggerOnce>
          <div className="container mx-auto text-center">
            <SectionTitle
              title="Why You'all Love Urusai"
              subtitle="Tools designed for audio sharing, learning, and interaction."
            />
            <div className="flex flex-col md:flex-row gap-5 justify-between">
              <div className="flex flex-col items-center">
                <div className="[&_*]:w-12 [&_*]:h-12 bg-blue-100 p-2 text-blue-500 rounded-full mb-3">
                  <UploadIcon />
                </div>
                <h2 className="text-xl/10 font-bold text-gray-950">Upload your audios</h2>
                <p className="max-w-xl text-sm/7 text-gray-600">Users can upload or record and share audios.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="[&_*]:w-12 [&_*]:h-12 bg-blue-100 p-2 text-blue-500 rounded-full mb-3">
                  <PlayListIcon />
                </div>
                <h2 className="text-xl/10 font-bold text-gray-950">Listen your audios</h2>
                <p className="max-w-xl text-sm/7 text-gray-600">Hear your audios and explore what others are sharing.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="[&_*]:w-12 [&_*]:h-12 bg-blue-100 p-2 text-blue-500 rounded-full mb-3">
                  <LearningIcon />
                </div>
                <h2 className="text-xl/10 font-bold text-gray-950">Learning mode</h2>
                <p className="max-w-xl text-sm/7 text-gray-600">For pronunciation analysis and AI-powered feedback.</p>
              </div>
            </div>
          </div>
        </Slide>
      </section>

      <section className="mt-20 py-30 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">

          <SectionTitle 
            title="How It Works" 
            subtitle=""
          />

          <Slide direction="right" triggerOnce>
            <div className="flex flex-col xl:flex-row gap-5 items-center">
              <h3 className="flex-1 text-center text-2xl text-gray-900 xl:order-2">Share Your Audio in Seconds</h3>
              <img className="border border-gray-200 lg:order-1" src={demo_01} />
            </div>
          </Slide>

          <Slide direction="left" triggerOnce>
            <div className="flex flex-col xl:flex-row gap-5 items-center mt-40">
              <h3 className="flex-1 text-center text-2xl text-gray-900">Get Instant AI Feedback</h3>
              <img className="border border-gray-200" src={demo_02} />
            </div>
          </Slide>

        </div>
      </section>

      <section className="mt-20 py-30 px-4 sm:px-6 lg:px-8">
        <Fade triggerOnce>
          <div className="container mx-auto text-center">
            <SectionTitle
              title="Frequently asked questions"
              subtitle=""
            />
            <ul className="grid gap-8 grid-cols-1 lg:grid-cols-3 text-start">
              <li>
                <h3 className="font-semibold text-lg/7 text-slate-900">What's the maximum audio file size I can upload?</h3>
                <p className="mt-4 text-sm text-slate-700">Currently, the limit is 1 MB per audio. Stay tuned for updates!</p>
              </li>
              <li>
                <h3 className="font-semibold text-lg/7 text-slate-900">Can I make my audios private?</h3>
                <p className="mt-4 text-sm text-slate-700">Currently, all audios are public, but we're considering private audios for future updates!</p>
              </li>
              <li>
                <h3 className="font-semibold text-lg/7 text-slate-900">What audio file types does the platform support?</h3>
                <p className="mt-4 text-sm text-slate-700">You can upload files in MP3, OGG or WAV format.</p>
              </li>
              <li>
                <h3 className="font-semibold text-lg/7 text-slate-900">How do I interact with other users?</h3>
                <p className="mt-4 text-sm text-slate-700">You can like, comment, or favorite others' audios. To connect deeper, share feedback or reply with audio comments!</p>
              </li>
              <li>
                <h3 className="font-semibold text-lg/7 text-slate-900">Which API key can I use for Learning Mode?</h3>
                <p className="mt-4 text-sm text-slate-700">Currently, you can only use Gemini API keys with our platform.</p>
              </li>
            </ul>
          </div>
        </Fade>
      </section>

      <section className="mt-20 py-30 bg-gray-100 px-4 sm:px-6 lg:px-8">
        <Fade triggerOnce>
          <div className="container mx-auto text-center">
            <SectionTitle 
              title="Current Limits" 
              subtitle="For now, enjoy 5 free audio uploads and 5 comments."
            />
          </div>
        </Fade>
      </section>
    </>
  )
}

export default PresentationPage