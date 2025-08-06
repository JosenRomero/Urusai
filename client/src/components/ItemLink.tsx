import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  children: ReactNode
  to: string
  text: string
}
const ItemLink = ({ children, to, text }: Props) => {
  return (
    <NavLink 
      to={to}
      className={({ isActive }) => 
        [
          isActive ? "bg-gray-100" : "bg-white",
          "flex items-center p-2 !text-gray-900 rounded-lg hover:bg-gray-100 group"
        ].join(" ")
      }
    >
      {children}
      <span className="ms-3">{text}</span>
    </NavLink>
  )
}

export default ItemLink