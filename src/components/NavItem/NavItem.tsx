import React from "react";
import '../NavItem/NavItem.css'

interface NavItemProp{
    
    label:string;
    icon:string;
}

const  NavItem:React.FC<NavItemProp>=({label,icon}) =>{
  return (
    <>
      <div className="navbar-element" >
        <div className="navbar-element-logo">
          <div>
            <img src={icon} alt="" />
          </div>
        </div>

        <div className="navbar-element-name">
          <span>{label}</span>
        </div>
      </div>
    </>
  );
}

export default NavItem;
