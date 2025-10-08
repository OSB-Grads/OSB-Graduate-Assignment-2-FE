import logoimage from "../../assets/logo.png";
import profileImage from "../../assets/profile-image.png";
import "./Header.css";

import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/AuthStore/authStore";
import ButtonComponent from "../Button/ButtonComponent";
import Notification from "../Notification/Notification";
import { useState } from "react";
import useNotificationStore from "../../store/NotificationStore/NotificationStore";

const Header = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuthStore();
  const[showNotification ,setShowNotification]=useState(false);
  const{markAllAsRead}=useNotificationStore();

  const handleNotificationClick=()=>{
    setShowNotification(prev=>!prev);
    if(!showNotification){
      markAllAsRead();
    }
  }
  
  return (
    <>
      <div className="dashborad-headder">
        <div className="dashborad-logo" onClick={()=>navigate('/dashboard')}>
          <img src={logoimage} alt="logo image " />
          <span>FinanceFirst</span>
        </div>

        <div className="headder-right">
          {isAuthenticated ? (
            <>
            <div className="headder-bell-icon" onClick={handleNotificationClick}>
              <Notification isOpen={showNotification}/>
            </div>

              <div className="profile-info">
                <Link to="/profile">
                  <img src={profileImage} alt="" />
                </Link>
              </div>
            </>
          ) : (
            <ButtonComponent
              label="Help"
              type='button'
              variant='secondary'
              onClick={() => navigate('/help')}
            ></ButtonComponent>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
