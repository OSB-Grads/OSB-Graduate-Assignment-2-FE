import bellIcon from "../../assets/bell-icon.png";
import logoimage from "../../assets/logo.png";
import profileImage from "../../assets/profile-image.png";
import "./Header.css";

import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/AuthStore/authStore";
import ButtonComponent from "../Button/ButtonComponent";




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
