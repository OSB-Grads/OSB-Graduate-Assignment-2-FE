import React, { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../store/AuthStoreGetters";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuth = isAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  }, [isAuth])

  return <>{children}</>;
};
export default ProtectedRoute;