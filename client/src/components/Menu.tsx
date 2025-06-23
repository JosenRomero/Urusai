import { SignedIn, UserButton } from '@clerk/clerk-react';
import { useEffect, useRef } from 'react';
import { Typewriter } from "react-simple-typewriter";
import SecondaryMenu from './SecondaryMenu';

const Menu = () => {
  const menuBtn = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const handleResize = () => {
      if (menuBtn.current && sidebarRef.current) {
        if (window.innerWidth >= 1280) {
          menuBtn.current.classList.add("open");
          sidebarRef.current.classList.remove("hidden");
        }
      }

    }

    const timer = setTimeout(() => {
      handleResize();
    }, 500);

    return () => {
      clearTimeout(timer);
    }

  }, []);

  const handleMenu = () => {
    if (menuBtn.current && sidebarRef.current) {
      menuBtn.current.classList.toggle("open");
      sidebarRef.current.classList.toggle("hidden");
    }
  }

  return (
    <nav className='p-4 border-b border-gray-200 z-11'>
      <div className='mx-auto flex items-center justify-between gap-x-1'>
        <div className='flex gap-1 items-center font-medium text-sm md:text-xl px-5 py-2.5 min-w-25'>
          <Typewriter words={["ウルサイ", "Noisy", "Ruidoso"]} loop={false} cursor={true} />
        </div>
        <div className='flex gap-1 md:gap-x-5 items-center [&_*]:font-medium [&_*]:md:!text-xl'>
          <SignedIn>
            <UserButton
              showName={true} 
              appearance={{ 
                elements: { 
                  userButtonBox: "px-5 py-2.5 flex !gap-5 bg-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-lg",
                  userButtonOuterIdentifier: "hidden md:block",
                  
                }
              }}
            />
            <button
              ref={menuBtn}
              onClick={handleMenu}
              aria-expanded="false"
              aria-controls="menuMobileContent"
              className="group relative flex h-5 w-6 cursor-pointer flex-col items-center justify-between transition duration-300 hover:scale-100"
              aria-label="open navigation menu"
            >
              <span className="ease h-0.5 w-6 transform bg-slate-800 transition duration-300 group-[.open]:translate-y-2 group-[.open]:rotate-45"></span>
              <span className="ease h-0.5 w-6 transform bg-slate-800 transition duration-300 group-[.open]:opacity-0"></span>
              <span className="ease h-0.5 w-6 transform bg-slate-800 transition duration-300 group-[.open]:opacity-0"></span>
              <span className="ease h-0.5 w-6 transform bg-slate-800 transition duration-300 group-[.open]:-translate-y-[0.6rem] group-[.open]:-rotate-45"></span>
            </button>
          </SignedIn>
        </div>
      </div>
      <SecondaryMenu
        ref={sidebarRef}
        closeSecondaryMenu={handleMenu}
      />
    </nav>
  )
}

export default Menu