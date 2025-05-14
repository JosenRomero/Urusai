import { ReactNode } from "react"
import Menu from "./Menu"

interface Props {
  children: ReactNode
}
const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen grid grid-cols-1 place-content-between bg-zinc-100">
      <Menu />
      <main>{children}</main>
      footer
    </div>
  )
}

export default Layout