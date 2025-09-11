import React, { Component } from "react";
import logoimage from "../../assets/logo.png";
import bellIcon from "../../assets/bell-icon.png";
import profileImage from "../../assets/profile-image.png";
import "./Header.css";

import ButtonComponent from "../Button/ButtonComponent";
import useAuthStore from "../../store/AuthStore/authStore";




const Header = () => {
  
    const { isAuthenticated } = useAuthStore();
  
  return (
    <>
      <div className="dashborad-headder">
        <div className="dashborad-logo">
          <img src={logoimage} alt="logo image " />
          <span>FinanceFirst</span>
        </div>

        <div className="headder-right">
          {isAuthenticated? (
            <>
              <div className="headder-bell-icon">
                <img src={bellIcon} alt="bell-icon" />
              </div>
              <div className="profile-info">
                <img src={profileImage} alt="" />
              </div>
            </>
          ) : (
             <ButtonComponent
             label="Help"
             type='button'
             variant='secondary'></ButtonComponent>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
