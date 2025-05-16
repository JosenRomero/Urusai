import { NavLink } from "react-router-dom"
import { SignedIn, UserButton } from '@clerk/clerk-react';

const Menu = () => {

  return (
    <nav className='p-6'>
      <div className='md:w-3/4 mx-auto flex items-center md:justify-between gap-x-3'>
        <div className='flex gap-x-5 items-center'>
          <SignedIn>
            <NavLink className="!text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" to={"/"}>Home</NavLink>
            <NavLink className="!text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" to={"/learning"}>Learning</NavLink>
          </SignedIn>
        </div>
        <div className='flex gap-2 items-center'>Urusai</div>
        <div className="flex">
          <SignedIn>
            <UserButton
              showName={true} 
              appearance={{ 
                elements: { 
                  userButtonBox: "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
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