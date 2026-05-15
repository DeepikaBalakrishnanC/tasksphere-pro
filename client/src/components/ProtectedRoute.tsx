import type { ReactNode } from "react";

import {

  Navigate

} from "react-router-dom";

import {

  useAuth

} from "../context/useAuth";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({
  children
}: ProtectedRouteProps) => {

  const { user } =
    useAuth();


  if (!user) {

    return (
      <Navigate
        to="/login"
      />
    );

  }


  return children;

};

export default ProtectedRoute;
