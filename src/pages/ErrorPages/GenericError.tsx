import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/Button/ButtonComponent";


function GenericError() {
  const navigate = useNavigate();
  return (
    <div className="heading">
      <h2>Page Not Found</h2>
      <p>
        The page you are looking for does not exist or has been moved. Please
        check the URL or return to the dashboard.
      </p>

      <ButtonComponent
        label="Go to Dashboard"
        type="button"
        variant="primary"
        onClick={() => navigate("/pagesHome")}
      />
    </div>
  );
}

export default GenericError;
