import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from '@clerk/clerk-react';

interface Props {
  children: ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <div className="flex justify-center">Loading...</div>

  if (!isSignedIn) return <Navigate to={"/sign-in"} />

  return children

}

export default ProtectedRoute