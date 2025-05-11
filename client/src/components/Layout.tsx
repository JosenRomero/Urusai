import { ReactNode } from "react"

interface Props {
  children: ReactNode
}
const Layout = ({ children }: Props) => {
  return (
    <div>
      header
      {children}
      footer
    </div>
  )
}

export default Layout