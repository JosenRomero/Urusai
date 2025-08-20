import { NavLink } from "react-router-dom"
import UserIcon from "../icons/UserIcon"
import { User } from "../types/User"

interface Props {
  users: User[] | null
  description: string
}

const ShowUsers = ({ users, description }: Props) => {

  if (!users) return <div className="loader mx-auto"></div>

  return (
    <div>
      { users.length > 0 && users.map((user, i) => {
        return (
          <div key={i} className="border-b border-gray-200 w-full flex flex-row items-center gap-5 py-4">
            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
              { user.imageUrl ? (
                <NavLink to={`/profile/${user.userId}`} reloadDocument>
                  <img src={user.imageUrl} />
                </NavLink>
              ) : (
                <UserIcon />
              ) }
            </div>
            <p className="text-sm font-medium text-gray-900">{user.username}</p>
          </div>
        )
      })}

      { users.length === 0 && 
        <p className="w-full text-center mt-10">{description}</p> 
      }
    </div>
  )
}

export default ShowUsers