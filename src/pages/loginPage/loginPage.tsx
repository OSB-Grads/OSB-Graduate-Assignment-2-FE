import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginPage.css";
import InputField from "../../components/inputField/inputField";
import axiosInstance from "../../utils/httpClientUtil";
import useAuthStore from "../../store/AuthStore/authStore";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { isAuthenticated, login } = useAuthStore();
  const navigate = useNavigate();
  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call login via Zustand store 
      await login(username, password, rememberMe);

    } catch (error: any) {
      alert(error.message || "Login failed");
    }
  };

  useEffect(() => {
    if(isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <div className="login-container">
      <main className="login-main">
        <form onSubmit={handleLogin} className="login-form">
          <h1 className="form-title">Welcome back</h1>

          {/* Username */}

          <InputField
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // prevent form submission without password
                document.getElementById("password-input")?.focus();
              }
            }}
          />

          {/* Password */}
          <InputField
            id="password-input"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Remember me */}
          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>

          {/* Button */}
          <button type="submit" className="login-button">
            Login
          </button>

          {/* Links */}
          <div className="links">
            <p>
              Don’t have an account? <a href="/register">Register</a>
            </p>
            <p>
              <a href="/forgotPassword">Forgot Password?</a>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
