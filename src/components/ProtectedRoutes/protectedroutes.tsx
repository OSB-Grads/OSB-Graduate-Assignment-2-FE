import React, { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/AuthStore/authStore";
import { getRole } from "../../utils/httpClientUtil";
type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: string[]; 
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const role=getRole();
    if (!isAuthenticated) {
      navigate('/login');
    }
    else if(isAuthenticated && role==='ADMIN'){
      navigate('/adminPage');
    }
    else navigate('/dashboard');
  }, [isAuthenticated]);

  return <>{children}</>;
};
export default ProtectedRoute;