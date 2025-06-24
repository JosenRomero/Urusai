import { SignedIn } from '@clerk/clerk-react';
import { NavLink } from "react-router-dom";
import HeartIcon from "../icons/HeartIcon";
import React, { useCallback } from 'react';
import PlayListIcon from '../icons/PlayListIcon';
import HomeIcon from '../icons/HomeIcon';
import LearningIcon from '../icons/LearningIcon';

interface Props {
  ref: React.Ref<HTMLDivElement>
  closeSecondaryMenu:() => void
}

const SecondaryMenu = ({ ref, closeSecondaryMenu }: Props) => {

  const refUL = useCallback((node: HTMLUListElement | null) => {
    if (node) {
      node.addEventListener("click", closeSecondaryMenu)
    }
  }, [closeSecondaryMenu]);

  return (
    <SignedIn>
      <aside
        ref={ref}
        className="fixed right-0 top-20 w-64 z-10 h-screen hidden"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-50">
          <ul className="space-y-2 font-medium pt-5" ref={refUL}>
            <NavLink to={"/home"} className={"flex items-center p-2 !text-gray-900 rounded-lg hover:bg-gray-100 group"}>
              <HomeIcon />
              <span className="ms-3">Home</span>
            </NavLink>
            <NavLink to={"/all-audios"} className={"flex items-center p-2 !text-gray-900 rounded-lg hover:bg-gray-100 group"}>
              <PlayListIcon />
              <span className="ms-3">Latest audios</span>
            </NavLink>
            <NavLink to={"/favorite-audios"} className={"flex items-center p-2 !text-gray-900 rounded-lg hover:bg-gray-100 group"}>
              <HeartIcon />
              <span className="ms-3">Favorites</span>
            </NavLink>
            <NavLink to={"/learning"} className={"flex items-center p-2 !text-gray-900 rounded-lg hover:bg-gray-100 group"}>
              <LearningIcon />
              <span className="ms-3">Learning</span>
            </NavLink>
          </ul>
        </div>
      </aside>
    </SignedIn>
  )
}

export default SecondaryMenu