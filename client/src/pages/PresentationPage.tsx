import { SignUpButton } from "@clerk/clerk-react";

const PresentationPage = () => {
  return (
    <div className='container text-center mx-auto px-2'>
      <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-13">A social network for sharing audio clips, with AI-powered pronunciation and grammar feedback.</h1>
      <SignUpButton mode={"modal"} signInForceRedirectUrl={"home"}>
        <button 
          className="text-white bg-blue-700 hover:bg-blue-800 hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Get started
        </button>
      </SignUpButton>
    </div>
  )
}

export default PresentationPage