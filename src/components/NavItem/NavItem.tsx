import React from "react";
import '../NavItem/NavItem.css'

interface INavItemProp{
    label:string;
    icon:string;
    active?: boolean;
    handleClick: () => void;
}

const NavItem = ({label,icon, active=false, handleClick}: INavItemProp) =>{
  
  return (
      <div className="navbar-element" onClick={handleClick} style={{
                      backgroundColor: active ? 'var(--color-secondary)' : 'transparent',
                      paddingLeft: active ? '12px' : '',
                      cursor: 'pointer',
                      transition: '0.1s linear all'
                    }}>
        <div className="navbar-element-logo">
          <div>
            <img src={icon} alt="" />
          </div>
        </div>

        <div className="navbar-element-name">
          <span>{label}</span>
        </div>
      </div>
  );
}

export default NavItem;
