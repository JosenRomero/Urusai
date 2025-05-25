import { NavLink } from "react-router-dom"
import { SignedIn, UserButton } from '@clerk/clerk-react';

const Menu = () => {

  return (
    <nav className='p-6'>
      <div className='xl:w-3/4 mx-auto flex items-center md:justify-between gap-x-1'>
        <div className='flex gap-1 items-center font-medium text-sm md:text-xl px-5 py-2.5'>ウルサイ</div>
        <div className='flex gap-1 md:gap-x-5 items-center [&_*]:font-medium [&_*]:md:!text-xl'>
          <SignedIn>
            <NavLink className="!text-gray-900 bg-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-lg text-sm px-5 py-2.5" to={"/home"}>Home</NavLink>
            <NavLink className="!text-gray-900 bg-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-lg text-sm px-5 py-2.5" to={"/learning"}>Learning</NavLink>
            <UserButton
              showName={true} 
              appearance={{ 
                elements: { 
                  userButtonBox: "px-5 py-2.5 flex !gap-5 bg-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-lg",
                  userButtonOuterIdentifier: "hidden md:block",
                  
                }
              }}
            />
          </SignedIn>
        </div>
      </div>
    </nav>
  )
}

export default Menu