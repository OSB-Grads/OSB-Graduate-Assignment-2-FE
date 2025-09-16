import React, { Component } from "react";
import logoimage from "../../assets/logo.png";
import bellIcon from "../../assets/bell-icon.png";
import profileImage from "../../assets/profile-image.png";
import "./Header.css";

import ButtonComponent from "../Button/ButtonComponent";
import useAuthStore from "../../store/AuthStore/authStore";
import { Navigate, useNavigate } from "react-router-dom";




const Header = () => {
  
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

  
  return (
    <>
      <div className="dashborad-headder">
        <div className="dashborad-logo">
          <img src={logoimage} alt="logo image " />
          <span>FinanceFirst</span>
        </div>

        <div className="headder-right">
          {isAuthenticated ? (
            <>
              <div className="headder-bell-icon">
                <img src={bellIcon} alt="bell-icon" />
              </div>
              <div className="profile-info">
                <img src={profileImage} alt="profile-image" />
              </div>
            </>
          ) : (
             <ButtonComponent
             label="Help"
             type='button'
             variant='secondary'
             onClick={()=>navigate('/help')}
             ></ButtonComponent>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
