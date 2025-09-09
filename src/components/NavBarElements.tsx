import React from 'react'
import './Leftnavbar.css'
import type { navItem } from "../data/LeftnavData";
import { LeftnavItems } from "../data/LeftnavData";

const NavBarElements=() =>{
  return (
    <div className="left-nav-bar-elements">
          {LeftnavItems.map((Item: navItem) => (
            <div className="navbar-element" key={Item.id}>
              <div className="navbar-element-logo">
                <div>
                  <img src={Item.icon} alt="" />
                </div>
              </div>
    
              <div className="navbar-element-name">
                <span>{Item.label}</span>
              </div>
            </div>
          ))}
        </div>
  )
}

export default NavBarElements
