import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from '@clerk/clerk-react';

interface Props {
  children: ReactNode
}

const PublicRoute = ({ children }: Props) => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <div className="loader mx-auto"></div>

  if (isSignedIn) return <Navigate to={"/home"} />

  return children
  
}

export default PublicRoute