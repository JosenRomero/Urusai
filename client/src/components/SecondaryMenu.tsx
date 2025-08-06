import { SignedIn } from '@clerk/clerk-react';
import HeartIcon from "../icons/HeartIcon";
import React, { useCallback } from 'react';
import PlayListIcon from '../icons/PlayListIcon';
import HomeIcon from '../icons/HomeIcon';
import LearningIcon from '../icons/LearningIcon';
import ItemLink from './ItemLink';

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
        <div className="h-full px-3 pb-4 overflow-y-auto border-l border-t border-gray-200 bg-white">
          <ul className="space-y-2 font-medium pt-5 px-2" ref={refUL}>
            <ItemLink to={"/home"} text={"Home"}>
              <HomeIcon />
            </ItemLink>
            <ItemLink to={"/all-audios"} text={"Latest audios"}>
              <PlayListIcon />
            </ItemLink>
            <ItemLink to={"/favorite-audios"} text={"Favorites"}>
              <HeartIcon />
            </ItemLink>
            <ItemLink to={"/learning"} text={"Learning"}>
              <LearningIcon />
            </ItemLink>
          </ul>
        </div>
      </aside>
    </SignedIn>
  )
}

export default SecondaryMenu