import React from "react";
import "./Register.css";
import ButtonComponent from "../components/ButtonComponent";
import InputField from "../components/InputField.tsx";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");

  const navigate = useNavigate();
  return (
    <div className="register-container">
      <div className="create-heading">
        <h2>Create New User</h2>
      </div>

      <div className="form-fields">
        <InputField
          id="userName"
          label="UserName"
          type="text"
          placeholder="Enter your UserName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const passwordInput = document.getElementById("password-input");
              passwordInput?.focus();
            }
          }}
        />

        <InputField
          id="password-input"
          label="Password"
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const confirmPassword =
                document.getElementById("confirm-password");
              confirmPassword?.focus();
            }
          }}
        />

        <InputField
          id="confirm-password"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const nameInput = document.getElementById("name");
              nameInput?.focus();
            }
          }}
        />

        <InputField
          id="name"
          label="Name"
          type="text"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const emailInput = document.getElementById("email");
              emailInput?.focus();
            }
          }}
        />

        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const phoneNumber = document.getElementById("phone");
              phoneNumber?.focus();
            }
          }}
        />

        <InputField
          id="phone"
          label="Phone"
          type="tel"
          placeholder="Enter your Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const addressInput = document.getElementById("address");
              addressInput?.focus();
            }
          }}
        />

        <InputField
          id="address"
          label="Address"
          type="textarea"
          placeholder=""
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="form-actions">
        <ButtonComponent
          label="Create User"
          type="button"
          variant="primary"
          onClick={() => navigate("/pages/Home")}
        />

        <h4>
          <strong className="login-link">
            Already have an account?{" "}
            <Link to="/pages/loginPage">Log In</Link>{" "}
          </strong>
        </h4>
      </div>
    </div>
  );
}

export default Register;
