import { ReactNode } from "react"

interface Props {
  children: ReactNode
}
const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen grid grid-cols-1 place-content-between bg-zinc-100">
      header
      <main>{children}</main>
      footer
    </div>
  )
}

export default Layout