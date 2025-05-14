import { NavLink } from "react-router-dom"
import { SignOutButton } from '@clerk/clerk-react';

const Menu = () => {
  return (
    <nav className='p-4'>
      <div className='md:w-3/4 mx-auto flex items-center md:justify-between gap-x-3'>
        <div className='flex gap-2 items-center'>Urusai</div>
        <div className='flex gap-x-5 items-center'>
          <NavLink className="!text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" to={"/"}>Home</NavLink>
          <NavLink className="!text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" to={"/learning"}>Learning</NavLink>
          <NavLink className="!text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none" to="/sign-in">Sign in</NavLink>
          <SignOutButton redirectUrl="/sign-in">
            <button className="focus:outline-none text-white bg-red-700 hover:cursor-pointer hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Sign Out</button>
          </SignOutButton>
        </div>
      </div>
    </nav>
  )
}

export default Menu