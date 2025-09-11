import React, { useEffect, useState } from "react";
import helpIcon from "../../assets/help-icon.png";


import "./Leftnavbar.css";

import NavItem from "../NavItem/NavItem";
import type { navItem } from "../../data/LeftnavData";
import { LeftnavItems } from "../../data/LeftnavData";
import { Link, useLocation } from "react-router-dom";

const Leftnavbar = () => {
  const location = useLocation();

  return (
      <nav className="left-nav-bar">
        <div className="left-nav-bar-list">
          <div className="left-nav-bar-headding">
            <span>FinanceFirst</span>
          </div>

          <div className="left-nav-bar-elements">

            {LeftnavItems.map((item:navItem)=>(
              <Link to={item.path} key={item.id} style={{
                backgroundColor: item.path === location.pathname ? 'var(--color-secondary)' : 'transparent',
                paddingLeft: item.path === location.pathname ? '12px' : '',
              }} >
              <NavItem
              label={item.label}
              icon={item.icon}
            ></NavItem></Link>))}
          </div>
 
          
        </div>

        <div className="left-nav-bar-help">
          <Link to=''>
         <NavItem
              label={"Help and Support"}
              icon={helpIcon}
            ></NavItem>
          </Link>
        </div>
      </nav>
  );
};

export default Leftnavbar;
