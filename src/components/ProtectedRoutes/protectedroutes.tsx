import React, { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { isAuthenticated } from "../../Store/AuthStore/AuthStoreGetters";

=======
import useAuthStore from "../../store/AuthStore/authStore";
>>>>>>> 24ab80a0710d6931be5a4623570ca319151a622c
type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const {isAuthenticated}=useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if(!isAuthenticated){
      navigate('/login');
    }
  }, [isAuthenticated])

  return <>{children}</>;
};
export default ProtectedRoute;