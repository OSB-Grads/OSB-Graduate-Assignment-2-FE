import React, { useEffect } from "react";
import "./Register.css";
import ButtonComponent from "../../components/Button/ButtonComponent.tsx";
import InputField from "../../components/inputField/inputField.tsx";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/httpClientUtil.ts";

import useAuthStore from "../../store/AuthStore/authStore.ts";
import useUserStore from "../../store/userstore/userstore.ts";

function Register() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");

  const navigate = useNavigate();

  const { isAuthenticated, signup } = useAuthStore();
  const { createUser } = useUserStore();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password != confirmPassword) {
      console.log("The password doesnt match");
      return;
    }

    try {
      await signup(username, password);
      await createUser(name, email, phone);
     
    } catch (error) {
      console.log("Register Error");
      // error page
    }
  };

  useEffect(() => {
    if(isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <div className="register-body">
      <div className="register-container">
        <form onSubmit={handleRegister} className="register-form">
          <div className="create-heading"><h2>Create New User</h2></div>

          <div className="form-fields">
            <InputField
              id="username"
              label="UserName"
              type="text"
              placeholder="Enter your UserName"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const passwordInput =
                    document.getElementById("password-input");
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
              type="submit"
              variant="primary"
            />
          </div>

          <div className="login-link">
            <strong>
              Already have an account ? <Link to="/login">Log In</Link>{" "}
            </strong>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Register;
