import React from "react";
import helpIcon from "../assets/help-icon.png";
import type { navItem } from "../data/LeftnavData";
import { LeftnavItems } from "../data/LeftnavData";
import "./Leftnavbar.css";

function NavBarElements() {
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
  );
}

const Leftnavbar = () => {
  return (
    <>
      <div className="left-nav-bar">
        <div className="left-nav-bar-list">
          <div className="left-nav-bar-headding">
            <span>FinanceFirst</span>
          </div>

          <NavBarElements></NavBarElements>
        </div>

        <div className="left-nav-bar-help">
          <div>
            <div className="left-nav-bar-help-logo">
              <div>
                <img src={helpIcon} alt="help and support icon" />
              </div>
            </div>

            <div className="left-nav-bar-help-name">
              <span>Help and Support</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Leftnavbar;
