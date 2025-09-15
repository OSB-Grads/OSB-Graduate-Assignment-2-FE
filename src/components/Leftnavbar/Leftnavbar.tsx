import helpIcon from "../../assets/help-icon.png";
import LogoutIcon from "../../assets/Logout-icon.png"


import "./Leftnavbar.css";

import NavItem from "../NavItem/NavItem";
import type { navItem } from "../../data/LeftnavData";
import { LeftnavItems } from "../../data/LeftnavData";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/AuthStore/authStore";

const Leftnavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthStore();

  return (
      <nav className="left-nav-bar">
        <div className="left-nav-bar-list">

          <div className="left-nav-bar-elements">

            {LeftnavItems.map((item:navItem)=>(
              <Link to={item.path} key={item.id}  >
              <NavItem
              label={item.label}
              icon={item.icon}
              active={item.path === location.pathname}
              handleClick={() => navigate(item.path)}
            /></Link>))}
          </div>
 
          
        </div>
        
        <div className="left-nav-bottom">
          <NavItem
              label={"Logout"}
              icon={LogoutIcon}
              handleClick={logout}
            />
         <NavItem
              label={"Help and Support"}
              icon={helpIcon}
              handleClick={() => navigate('/help')}
            />
        </div>
      </nav>
  );
};

export default Leftnavbar;
