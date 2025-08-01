import { ReactNode } from "react"
import { Zoom } from "react-awesome-reveal"
import IconX from "../icons/IconX"

interface Props {
  children: ReactNode
  title: string
  isOpen: boolean
  close(): void
}

const Modal = ({ children, title, isOpen, close }: Props) => {

  const handleModalDialogClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  }

  return (
    <div
      className={`bg-black/75 fixed top-0 left-0 w-screen h-screen z-12 flex justify-center items-center ${isOpen ? '' : 'hidden'}`}
      onClick={close}
    >
      <Zoom>
        <div
          className="rounded-2xl bg-white p-5 shadow-md"
          onClick={ (e) => handleModalDialogClick(e) }
        >
          <div className="flex mb-5">
            <h2 className="text-center text-slate-900 grow font-bold text-lg">{title}</h2>
            <button className="flex-none hover:cursor-pointer" onClick={close}>
              <IconX />
            </button>
          </div>
          { children }
        </div>
      </Zoom>
    </div>
  )

}

export default Modal