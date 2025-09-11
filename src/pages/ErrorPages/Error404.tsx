import React from "react";
import { useNavigate } from "react-router-dom";
import "./ErrorPages.css";
import ButtonComponent from "../../components/Button/ButtonComponent";

function Error404() {
  const navigate = useNavigate();
  return (
    <div className="main-container">
      <div className="heading">
        <h1>Page Not Found</h1>
        <p className="error-message">
          The page you are looking for does not exist or has been moved. Please
          check the URL or return to the dashboard.
        </p>

        <div className="button-element">
          <ButtonComponent
            label="Go to Dashboard"
            type="button"
            variant="primary"
            onClick={() => navigate("/pagesHome")}
          />
        </div>
      </div>
    </div>
  );
}

export default Error404;
