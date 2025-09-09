import React from "react";
import "./Register.css";
import axios from 'axios';
import ButtonComponent from "../components/Button/ButtonComponent.tsx";
import InputField from "../components/inputField/inputField.tsx";
import { Link, useNavigate } from "react-router-dom";
//import { useAuthStore } from "../../Store/authStore";

function Register() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

  if (password != confirmPassword) {
    alert("The password doesnt match");
    return;
  }
 
  try{
    console.log("start")
    const authDetails = await axios.post("http://localhost:8080/api/v1/auth/register", {username,password});
    console.log("post register");
    const token = authDetails.data.token;
    localStorage.setItem("access_token", token); 



    const userDetails = await axios.put("http://localhost:8080/api/v1/users/me", 
    {name, email, phone},
    {headers: {Authorization: `Bearer ${token}`,
},});
    //user created
    console.log(userDetails);
    if (userDetails.status === 200 || userDetails .status === 201){
        
        alert("Successful"); // will be updated with toast
        
        navigate("/")
    }
  }
  catch(error){
    alert("Error");
    // error page
  }};

  return (
    <div className="register-body">
      <div className="register-container">
        <form onSubmit={handleRegister} className="register-form">
          <h2 className="create-heading">Create New User</h2>

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
            //   onClick={() => navigate("/")}
            />

            <div className="login-link">
              <strong>
                Already have an account ?{" "}
                <Link to="/pages/loginPage">Log In</Link>{" "}
              </strong>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Register;
