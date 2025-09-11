import React from "react";
import "./ErrorPages.css";

function Maintenance() {
  return (
    <div className="main-container">
      <div className="heading">
        <h2>We're Under Maintenance</h2>
        <p className="error-message">
          We're currently performing scheduled maintenance to improve your
          banking experience. We'll be back online shortly.
        </p>
      </div>
    </div>
  );
}

export default Maintenance;
