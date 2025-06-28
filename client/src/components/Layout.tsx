import { ToastContainer } from "react-toastify"
import { ReactNode, useContext } from "react"
import Menu from "./Menu"
import AudioPlayer from "./AudioPlayer"
import Footer from "./Footer"
import MessageContext from "../context/MessageContext"
import Notification from "./Notification"
import { notificationMessageDefault } from "../consts/notificationMessageDefault"

interface Props {
  children: ReactNode
}
const Layout = ({ children }: Props) => {
  const { message, updateMessage } = useContext(MessageContext);

  return (
    <div className="min-h-screen grid grid-cols-1 place-content-between bg-white">
      <Menu />
      <main>{children}</main>
      <div>
        <ToastContainer />
        <AudioPlayer />
        <Footer />
      </div>
      <Notification 
        message={message}
        notificationClose={ () => updateMessage(notificationMessageDefault) }
      />
    </div>
  )
}

export default Layout