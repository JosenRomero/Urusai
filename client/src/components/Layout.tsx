import { ToastContainer } from "react-toastify"
import { ReactNode } from "react"
import Menu from "./Menu"
import AudioPlayer from "./AudioPlayer"
import Footer from "./Footer"

interface Props {
  children: ReactNode
}
const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen grid grid-cols-1 place-content-between bg-white">
      <Menu />
      <main>{children}</main>
      <div>
        <ToastContainer />
        <AudioPlayer />
        <Footer />
      </div>
    </div>
  )
}

export default Layout